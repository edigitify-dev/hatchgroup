import Image from "next/image";

interface ProjectImageProps {
  src: string;
  mobileSrc?: string;
  alt: string;
  sizes: string;
  preload?: boolean;
}

// Art direction keeps mobile portraits and desktop landscapes in the same card.
// Cover preserves proportions; a small zoom finishes the edge-to-edge crop.
export default function ProjectImage({ src, mobileSrc, alt, sizes, preload = false }: ProjectImageProps) {
  return (
    <picture className="absolute inset-0 isolate block overflow-hidden bg-[#081e17]">
      {mobileSrc && mobileSrc !== src && (
        <source media="(max-width: 639px)" srcSet={mobileSrc} />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className="scale-[1.015] object-cover object-center"
        sizes={sizes}
        loading={preload ? "eager" : "lazy"}
        fetchPriority={preload ? "high" : undefined}
      />
    </picture>
  );
}
