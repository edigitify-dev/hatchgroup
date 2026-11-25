"use client";

import React, { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import Footer from "@/components/sections/Footer";
import ProjectImage from "@/components/ProjectImage";
import { groupProjectPhotos, selectProjectPhoto, type ProjectPhoto } from "@/lib/project-image-layout";

interface ProjectDetailContentProps {
  id: string;
  project: {
    title: string;
    category: string;
    year: string;
    description: string;
    details: string;
    location: string;
    siteArea: string;
    projectArea: string;
    projectType: string;
    projectLanguage: string;
    projectScope: string;
    images: string[];
    image2: string;
    imageAlts: Record<string, string>;
    photos: ProjectPhoto[];
  };
  nextProjectId: string;
  nextProject: {
    category: string;
  };
}

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

function GalleryImage({
  src,
  alt,
  sizes,
}: {
  src: string;
  alt: string;
  sizes: string;
}) {
  const tileRef = useRef<HTMLDivElement>(null);

  // Curtain reveal, scrubbed directly off scroll position rather than played
  // as a timed transition: progress 0 → tile's top just entering the bottom
  // of the viewport (closed), 1 → tile centered in the viewport (fully open).
  // Only two points on purpose — useTransform clamps past the last one, so
  // once a tile opens while scrolling down it just stays open (even after it
  // exits above the viewport) instead of shrinking back. Scrolling back up
  // re-enters that same range from the top, so the clip only unwinds then.
  const { scrollYProgress } = useScroll({
    target: tileRef,
    offset: ["start end", "center center"],
  });
  const curtainClipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(50% 50% 50% 50%)", "inset(0% 0% 0% 0%)"]
  );

  return (
    <div ref={tileRef} className="relative aspect-[4/5] min-w-0 sm:aspect-auto sm:flex-1 sm:h-full overflow-hidden rounded-sm bg-background">
      <motion.div style={{ clipPath: curtainClipPath, transformOrigin: "center" }} className="absolute inset-0">
        <ProjectImage src={src} alt={alt} sizes={sizes} />
      </motion.div>
    </div>
  );
}

export default function ProjectDetailContent({ id, project, nextProjectId, nextProject }: ProjectDetailContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSlideMode = searchParams.get("slide") === "true";
  const [isExiting, setIsExiting] = useState(false);

  React.useEffect(() => {
    // Reset exiting state when the route changes so the exit curtain snaps back down
    setIsExiting(false);
  }, [id]);

  const handleNextClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExiting(true);
    // Wait for exit animation to finish before routing
    setTimeout(() => {
      router.push(`/project/${nextProjectId}?slide=true`);
    }, 1000);
  };

  const heroImage = selectProjectPhoto(project.photos, 8 / 5).src;
  const mobileHeroImage = selectProjectPhoto(project.photos, 4 / 5).src;
  const galleryPhotos = project.photos.filter((photo) => photo.src !== heroImage);
  const galleryRows = groupProjectPhotos(galleryPhotos.length ? galleryPhotos : project.photos);

  const infoRows: Array<[string, string]> = [
    ["Location", project.location],
    ["Site Area", project.siteArea],
    ["Project Area", project.projectArea],
    ["Project Type", project.projectType],
    ["Project Language", project.projectLanguage],
    ["Project Scope", project.projectScope],
  ];

  return (
    <>
      <motion.main
        className="min-h-screen luxe-ivory font-sans"
        initial={{ opacity: isSlideMode ? 1 : 0 }}
        animate={{ opacity: isExiting ? 0.5 : 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* ── 1. HERO — responsive, edge-to-edge photograph, no scroll animation ── */}
        <div className="relative w-full h-svh overflow-hidden bg-[#0a2119]">
          <ProjectImage
            src={heroImage}
            mobileSrc={mobileHeroImage}
            alt={project.title}
            sizes="100vw"
            preload
          />
        </div>

        {/* ── 2. PROJECT INFORMATION ── */}
        <section className="relative w-full py-24 md:py-32 px-6 md:px-16 lg:px-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-14 gap-x-16">
            <motion.div {...fadeUp} className="lg:col-span-7">
              <span className="block text-accent text-[10px] tracking-[0.5em] uppercase font-medium mb-5">
                {project.category} · {project.year}
              </span>
              <h1
                className="font-display font-light text-accent leading-[1.05] mb-10 uppercase"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)", letterSpacing: "-0.01em" }}
              >
                {project.title}
              </h1>
              <p className="text-foreground/70 font-light leading-[1.95] text-[0.95rem] md:text-[1.05rem] max-w-xl mb-6">
                {project.description}
              </p>
              <p className="text-foreground/70 font-light leading-[1.95] text-[0.95rem] md:text-[1.05rem] max-w-xl">
                {project.details}
              </p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="lg:col-span-5 lg:pt-2">
              <h2 className="text-[11px] tracking-[0.35em] uppercase font-medium text-foreground mb-8">
                Project Information
              </h2>
              <dl className="flex flex-col gap-5">
                {infoRows.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-2 gap-4 pb-5 border-b border-foreground/10">
                    <dt className="text-foreground/50 text-sm">{label}</dt>
                    <dd className="text-foreground text-sm">{value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </section>

        {/* ── 3. GALLERY — image only, same alternating full/split rows as /project ── */}
        <div className="relative w-full flex flex-col gap-1 md:gap-1.5 px-4 md:px-8 lg:px-12 py-4 md:py-6">
          {galleryRows.map((row, ri) => (
            <div key={ri} className="flex flex-col sm:flex-row w-full gap-1 md:gap-1.5 sm:aspect-[8/5]">
              {row.map(({ src }, ii) => (
                <GalleryImage
                  key={src}
                  src={src}
                  alt={project.imageAlts[src] || `${project.title} — photo ${ri * 2 + ii + 1}`}
                  sizes={row.length === 1 ? "100vw" : "(min-width: 640px) 50vw, 100vw"}
                />
              ))}
            </div>
          ))}
        </div>

        {/* ── Next project — compact link strip, not a full-bleed banner ── */}
        <motion.div {...fadeUp} className="relative w-full border-t border-foreground/10">
          <a
            href={`/project/${nextProjectId}`}
            onClick={handleNextClick}
            data-cursor-interact
            className="group flex items-center justify-between gap-8 max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-14 md:py-20"
          >
            <div>
              <span className="block text-accent text-[10px] tracking-[0.5em] uppercase font-medium mb-3">
                Next Project · 0{nextProjectId}
              </span>
              <h2
                className="font-display font-light text-accent uppercase leading-none transition-transform duration-500 ease-out group-hover:translate-x-2"
                style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.75rem)", letterSpacing: "-0.01em" }}
              >
                {nextProject.category}
              </h2>
            </div>
            <span className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full border border-foreground/20 text-foreground text-xl shrink-0 transition-all duration-500 ease-out group-hover:border-accent group-hover:bg-accent group-hover:text-white group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>

        <Footer />
      </motion.main>

      {/* --- CINEMATIC CURTAIN WIPE EFFECTS --- */}

      {/* Exit Curtain (Sweeps up from bottom when clicking Next) */}
      <motion.div
        className="fixed inset-0 z-[100] bg-foreground pointer-events-none flex items-center justify-center"
        initial={{ y: "100%" }}
        animate={{ y: isExiting ? "0%" : "100%" }}
        transition={{ duration: isExiting ? 1 : 0, ease: [0.76, 0, 0.24, 1] }}
      >
        <span className="text-background font-display text-2xl md:text-4xl uppercase tracking-[0.5em]">Hatch Group</span>
      </motion.div>

      {/* Enter Curtain (Sweeps up to top when page loads) */}
      <motion.div
        key={`enter-${id}`}
        className="fixed inset-0 z-[100] bg-foreground pointer-events-none flex items-center justify-center"
        initial={{ y: isSlideMode ? "0%" : "-100%" }}
        animate={{ y: "-100%" }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      >
        <span className="text-background font-display text-2xl md:text-4xl uppercase tracking-[0.5em]">Hatch Group</span>
      </motion.div>
    </>
  );
}
