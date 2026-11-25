import { open } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { unstable_cache } from "next/cache";
import type { ProjectPhoto } from "./project-image-layout";

const HEADER_BYTES = 65536;
let activeReads = 0;
const waitingReads: Array<() => void> = [];

async function withMetadataSlot<T>(read: () => Promise<T>): Promise<T> {
  if (activeReads >= 6) await new Promise<void>((resolve) => waitingReads.push(resolve));
  else activeReads += 1;
  try {
    return await read();
  } finally {
    const next = waitingReads.shift();
    if (next) next();
    else activeReads -= 1;
  }
}

// Follow the repository's existing cache model. Only dimensions are retained;
// gallery originals are never downloaded in full just to choose a card photo.
const getPhotoDimensions = unstable_cache((src: string) => withMetadataSlot(async () => {
    let header: Buffer;
    if (src.startsWith("/")) {
      const root = path.join(process.cwd(), "public");
      const filePath = path.resolve(root, `.${decodeURIComponent(src)}`);
      if (!filePath.startsWith(`${root}${path.sep}`)) return { width: 0, height: 0 };
      const file = await open(filePath, "r");
      try {
        header = Buffer.alloc(HEADER_BYTES);
        const { bytesRead } = await file.read(header, 0, HEADER_BYTES, 0);
        header = header.subarray(0, bytesRead);
      } finally {
        await file.close();
      }
    } else {
      const url = new URL(src);
      if (url.protocol !== "https:" || url.hostname !== "res.cloudinary.com") {
        return { width: 0, height: 0 };
      }
      const response = await fetch(url, {
        headers: { Range: `bytes=0-${HEADER_BYTES - 1}` },
        cache: "no-store",
        signal: AbortSignal.timeout(12000),
      });
      if (!response.ok || !response.body) throw new Error("Image metadata unavailable");
      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      let length = 0;
      try {
        while (length < HEADER_BYTES) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = value.subarray(0, HEADER_BYTES - length);
          chunks.push(chunk);
          length += chunk.length;
        }
      } finally {
        await reader.cancel();
      }
      header = Buffer.concat(chunks);
    }
    const metadata = await sharp(header).metadata();
    const rotated = (metadata.orientation ?? 1) >= 5;
    return {
      width: (rotated ? metadata.height : metadata.width) ?? 0,
      height: (rotated ? metadata.width : metadata.height) ?? 0,
    };
}), ["project-photo-dimensions:v2"], { revalidate: 86400 });

export async function getProjectPhotos(project: { heroImage: string; images: string[] }): Promise<ProjectPhoto[]> {
  const sources = [...new Set([project.heroImage, ...project.images].filter(Boolean))];
  return Promise.all(sources.map(async (src) => ({
    src,
    // Cache successes only, so a transient outage can recover on the next render.
    ...await getPhotoDimensions(src).catch(() => ({ width: 0, height: 0 })),
  })));
}
