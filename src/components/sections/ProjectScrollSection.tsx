"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import type { Project } from "@/data/projects";

// Alternating rows: one full-bleed image, then a row of two side by side —
// repeating for the length of the portfolio. Cards keep a consistent height
// and images stretch to fill each card.
function groupProjects(projects: Project[]): Project[][] {
  const groups: Project[][] = [];
  let i = 0;
  let wide = true;
  while (i < projects.length) {
    const size = wide ? 1 : 2;
    groups.push(projects.slice(i, i + size));
    i += size;
    wide = !wide;
  }
  return groups;
}

function ProjectTile({ project, index, total }: { project: Project; index: number; total: number }) {
  const num = String(index + 1).padStart(2, "0");

  const tileRef = useRef<HTMLDivElement>(null);

  // Curtain reveal, scrubbed directly off scroll position — same effect as
  // the project detail page's gallery: closed while the tile is below the
  // viewport, fully open once it reaches center. Only two points on purpose —
  // useTransform clamps past the last one, so once a tile opens while
  // scrolling down it stays open; it only unwinds if the user scrolls back
  // up past that point.
  const { scrollYProgress: curtainProgress } = useScroll({
    target: tileRef,
    offset: ["start end", "start 0.15"],
  });
  const curtainClipPath = useTransform(
    curtainProgress,
    [0, 1],
    ["inset(50% 50% 50% 50%)", "inset(0% 0% 0% 0%)"]
  );

  return (
    <div ref={tileRef} className="relative sm:flex-1 sm:h-full">
      <motion.div style={{ clipPath: curtainClipPath, transformOrigin: "center" }} className="sm:h-full">
        <Link
          href={project.href}
          data-cursor-interact
          className="group relative flex w-full sm:h-full overflow-hidden bg-[#0a2119]"
        >
          {/* Mobile uses the image's natural ratio; desktop fits it inside a fixed card. */}
          <Image
            src={project.image}
            alt={project.title}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="block sm:hidden"
            priority={index < 3}
          />
          <div className="hidden sm:block absolute inset-0">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-fill"
              sizes="(max-width: 1024px) 50vw, 33vw"
              priority={index < 3}
            />
          </div>
          <div
            className="hidden sm:block absolute inset-0 bg-[#000f0b]/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          {/* Category + counter — hidden until hover, desktop only */}
          <div className="hidden sm:flex absolute top-5 left-6 right-6 items-center justify-between opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
            <span className="text-[9px] tracking-[0.5em] uppercase font-medium text-accent">
              {project.category}
            </span>
            <span className="font-display text-accent text-sm tracking-[0.35em]">
              {num}/{String(total).padStart(2, "0")}
            </span>
          </div>
          <div className="hidden sm:block absolute top-5 left-6 w-8 h-8 border-t border-l border-accent/50 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
          <div className="hidden sm:block absolute bottom-5 right-6 w-8 h-8 border-b border-r border-accent/50 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />

          {/* Hover state — title and CTA slide in from the bottom-left, desktop only */}
          <div className="hidden sm:flex absolute inset-x-0 bottom-0 flex-col items-start text-left p-6 md:p-8 opacity-0 translate-y-4 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none">
            <h3 className="font-display font-light text-2xl lg:text-4xl text-foreground mb-4">
              {project.title}
            </h3>
            <div
              className="h-px w-14 mb-4"
              style={{ background: "linear-gradient(to right, rgba(169,140,95,0.9), transparent)" }}
            />
            <div className="flex items-center gap-6">
              <span className="inline-flex items-center gap-2 text-accent text-xs tracking-[0.3em] uppercase">
                Explore
                <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
              </span>
              <span className="text-foreground/60 text-xs tracking-[0.2em]">
                {project.year}
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

export default function ProjectScrollSection({ projects }: { projects: Project[] }) {
  const total = projects.length;
  const rows = groupProjects(projects);
  let runningIndex = 0;

  return (
    <section className="relative w-full py-24 md:py-32">
      <div className="absolute inset-0 pointer-events-none luxe-grain" />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-15%", left: "50%", transform: "translateX(-50%)",
          width: "70vw", height: "45vh",
          background: "radial-gradient(ellipse at center, rgba(0,90,65,0.35) 0%, transparent 60%)",
        }}
      />

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 text-center mb-14 md:mb-20">
        <span className="block text-accent text-[10px] tracking-[0.5em] uppercase font-medium mb-4">
          Our Portfolio
        </span>
        <h2
          className="font-display font-light text-foreground leading-[1.05] mx-auto"
          style={{ fontSize: "clamp(2rem, 3.8vw, 3.6rem)", letterSpacing: "-0.015em" }}
        >
          Our <span className="luxe-gradient-text">Projects</span>
        </h2>
      </div>

      {/* Alternating full-bleed / split rows — each row uses the full
          viewport-scaled height, whether it holds one image or two. */}
      <div className="relative z-10 w-full flex flex-col gap-1 px-4 md:px-8 lg:px-12">
        {rows.map((row, ri) => {
          const tiles = row.map((project) => {
            const tile = (
              <ProjectTile key={project.id} project={project} index={runningIndex} total={total} />
            );
            runningIndex += 1;
            return tile;
          });
          return (
            <div key={ri} className="flex flex-col sm:flex-row w-full gap-1 sm:h-[70vh] md:h-[88vh]">
              {tiles}
            </div>
          );
        })}
      </div>
    </section>
  );
}
