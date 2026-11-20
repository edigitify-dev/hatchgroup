"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

import type { Project } from "@/data/projects";

export interface ShowcaseSliderProps {
  projects: Project[];
}

const INTERVAL = 4500;

export default function ShowcaseSlider({ projects }: ShowcaseSliderProps) {
  const ACTIVE_SLIDES = projects.slice(0, 8).map((p) => ({
    src: p.image,
    title: p.title,
    description: p.description,
    href: p.href,
  }));

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % ACTIVE_SLIDES.length);
  }, [ACTIVE_SLIDES.length]);

  useEffect(() => {
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  const goTo = (i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  if (ACTIVE_SLIDES.length === 0) return null;

  return (
    <section className="relative z-20 luxe-ivory overflow-hidden">
      <div className="absolute inset-0 pointer-events-none luxe-grain" />

      <div className="relative w-full" style={{ height: "clamp(58vh, 78vw, 90vh)" }}>
        <Link
          href={ACTIVE_SLIDES[current].href}
          aria-label={`View ${ACTIVE_SLIDES[current].title} project details`}
          className="absolute inset-0 cursor-pointer"
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-[#0a2119]"
            >
              <Image
                src={ACTIVE_SLIDES[current].src}
                alt={ACTIVE_SLIDES[current].title}
                fill
                className="object-fill"
                sizes="100vw"
                priority={current === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Dark gradient for text legibility */}
          <div
            className="absolute inset-x-0 bottom-0 z-1 pointer-events-none h-[62%] md:h-[52%]"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.38) 55%, transparent 100%)",
            }}
          />

          {/* Text content */}
          <div className="absolute bottom-0 inset-x-0 z-10 px-5 sm:px-6 md:px-12 pb-16 md:pb-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="block text-white/55 text-[10px] md:text-xs tracking-[0.3em] uppercase font-light mb-2 md:mb-3">
                  {String(current + 1).padStart(2, "0")} / {String(ACTIVE_SLIDES.length).padStart(2, "0")}
                </span>
                <h3 className="font-display text-white text-[1.6rem] leading-[1.15] sm:text-3xl md:text-4xl lg:text-5xl tracking-wide mb-2 md:mb-3">
                  {ACTIVE_SLIDES[current].title}
                </h3>
                <p className="text-white/75 text-[13px] sm:text-sm md:text-base font-light leading-relaxed max-w-xl line-clamp-2 md:line-clamp-none">
                  {ACTIVE_SLIDES[current].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Link>

        {/* Controls row — pagination + view more */}
        <div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-between gap-4 px-5 sm:px-6 md:px-12 pb-6 md:pb-10 pointer-events-none">
          {/* Pagination */}
          <div className="flex items-center gap-1.5 md:gap-2.5 pointer-events-auto">
            {ACTIVE_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-0.75 rounded-full transition-all duration-500 ${
                  i === current
                    ? "w-6 md:w-9 bg-white shadow-[0_0_6px_rgba(255,255,255,0.5)]"
                    : "w-2.5 md:w-4 bg-white/30 hover:bg-white/55"
                }`}
              />
            ))}
          </div>

          {/* View More Projects */}
          <Link
            href="/project"
            aria-label="View more projects"
            className="pointer-events-auto flex items-center gap-2 shrink-0 text-white hover:text-accent transition-colors duration-300"
          >
            <span className="hidden sm:inline text-[10px] md:text-[12px] tracking-[0.2em] uppercase font-medium">
              View More Projects
            </span>
            <span className="flex items-center justify-center w-8 h-8 sm:w-auto sm:h-auto rounded-full border border-white/40 sm:border-0">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
