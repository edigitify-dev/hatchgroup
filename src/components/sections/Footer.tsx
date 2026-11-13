"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer
      className="relative z-20 w-full text-foreground pt-24 md:pt-36 pb-10 overflow-hidden luxe-ivory"
    >
      {/* Top gold hairline */}
      <div className="absolute top-0 left-0 right-0 h-px luxe-rule" />
      <div className="absolute inset-0 pointer-events-none luxe-grain" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ── Grand CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          id="contact"
          className="flex flex-col items-center text-center mb-20 md:mb-28"
        >
          <span className="text-[8px] md:text-[10px] tracking-[0.55em] uppercase text-accent font-sans font-medium mb-6 md:mb-8">
            Begin Your Story
          </span>
          <h2
            className="font-display font-light text-foreground leading-[1.08] mb-8 md:mb-10"
            style={{ fontSize: "clamp(2.4rem, 7vw, 6rem)", letterSpacing: "-0.015em" }}
          >
            Let&apos;s craft something
            <br />
            <span className="luxe-gradient-text">extraordinary.</span>
          </h2>
          <Link
            href="/enquire"
            data-cursor-interact
            className="relative overflow-hidden group inline-flex px-10 py-4 md:px-14 md:py-5 uppercase tracking-[0.3em] text-[10px] md:text-[11px] font-medium bg-foreground text-ivory transition-colors duration-500"
          >
            <span className="relative z-10 group-hover:text-foreground transition-colors duration-500">
              Enquire Now
            </span>
            <div
              className="absolute inset-0 transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-in-out"
              style={{ background: "linear-gradient(115deg, #D6BD94 0%, #C2A878 60%, #A98C5F 100%)" }}
            />
          </Link>
        </motion.div>

        {/* ── Divider ── */}
        <div className="w-full h-px bg-foreground/10 mb-14 md:mb-16" />

        {/* Mobile: centred brand block */}
        <div className="flex flex-col items-center text-center mb-12 md:hidden">
          <div className="relative w-36 h-11 mb-5">
            <Image
              src="https://res.cloudinary.com/de4pazo51/image/upload/v1781195359/HATCH_DARK_LOGO-01_1_1_osknv0.png"
              alt="Hatch Group"
              fill
              className="object-contain object-center brightness-0 opacity-85"
              unoptimized
            />
          </div>
          <div className="flex items-center gap-3 w-20 mb-5">
            <div className="flex-1 h-px bg-accent/40" />
            <div className="w-1 h-1 rounded-full bg-accent/60" />
            <div className="flex-1 h-px bg-accent/40" />
          </div>
          <p className="text-foreground/50 font-light text-[0.82rem] leading-[1.8] max-w-[280px]">
            We architect experiences that transcend traditional interior design — cinematic aesthetics, uncompromising quality.
          </p>
        </div>

        {/* Mobile: links in two columns */}
        <div className="grid grid-cols-2 gap-8 mb-12 md:hidden">
          <div>
            <h4 className="uppercase tracking-[0.4em] text-[8px] font-medium mb-5 text-accent">Explore</h4>
            <ul className="space-y-3 font-light text-[0.82rem] text-foreground/60">
              <li><Link href="/" className="hover:text-accent transition-colors duration-300">Home</Link></li>
              <li><Link href="/project" className="hover:text-accent transition-colors duration-300">Projects</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors duration-300">About</Link></li>
              <li><Link href="/career" className="hover:text-accent transition-colors duration-300">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="uppercase tracking-[0.4em] text-[8px] font-medium mb-5 text-accent">Connect</h4>
            <ul className="space-y-3 font-light text-[0.82rem] text-foreground/60">
              <li><a href="https://www.instagram.com/hatchgroup.official?igsh=ZzQ1bmN4NmQ0Y21l&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-300">Instagram</a></li>
              <li><a href="https://www.linkedin.com/company/hatch-group-1/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-300">LinkedIn</a></li>
              <li><a href="mailto:info@hatchgroup.in" className="hover:text-accent transition-colors duration-300 break-all">Email Us</a></li>
            </ul>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:grid grid-cols-12 gap-12 mb-16 border-b border-foreground/10 pb-16">
          {/* Brand */}
          <div className="col-span-5">
            <div className="relative w-44 h-14 mb-5">
              <Image
                src="https://res.cloudinary.com/de4pazo51/image/upload/v1781195359/HATCH_DARK_LOGO-01_1_1_osknv0.png"
                alt="Hatch Group"
                fill
                className="object-contain object-left brightness-0 opacity-85"
                unoptimized
              />
            </div>
            <div className="w-10 h-px bg-accent mb-6" />
            <p className="text-foreground/55 max-w-sm font-light text-sm leading-relaxed">
              We architect experiences that transcend traditional interior design, blending cinematic aesthetics with uncompromising material quality.
            </p>
          </div>

          <div className="col-span-3 col-start-7">
            <h4 className="uppercase tracking-[0.3em] text-[10px] font-medium mb-6 text-accent">Explore</h4>
            <ul className="space-y-3 font-light text-sm text-foreground/60">
              <li><Link href="/" className="hover:text-accent transition-colors duration-300">Home</Link></li>
              <li><Link href="/project" className="hover:text-accent transition-colors duration-300">Projects</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors duration-300">About</Link></li>
              <li><Link href="/career" className="hover:text-accent transition-colors duration-300">Careers</Link></li>
            </ul>
          </div>

          <div className="col-span-3 col-start-10">
            <h4 className="uppercase tracking-[0.3em] text-[10px] font-medium mb-6 text-accent">Connect</h4>
            <ul className="space-y-3 font-light text-sm text-foreground/60">
              <li><a href="https://www.instagram.com/hatchgroup.official?igsh=ZzQ1bmN4NmQ0Y21l&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-300">Instagram</a></li>
              <li><a href="https://www.linkedin.com/company/hatch-group-1/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-300">LinkedIn</a></li>
              <li><a href="mailto:info@hatchgroup.in" className="hover:text-accent transition-colors duration-300">info@hatchgroup.in</a></li>
            </ul>
          </div>
        </div>

        {/* Mobile border */}
        <div className="md:hidden w-full h-px bg-foreground/10 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] md:text-[11px] text-foreground/35 font-light tracking-wider gap-3 md:gap-0">
          <p>&copy; {new Date().getFullYear()} Hatch Group. All rights reserved.</p>
          <div className="flex gap-6 md:gap-8">
            <Link href="#" className="hover:text-accent transition-colors duration-300">Privacy Policy</Link>
            <Link href="#" className="hover:text-accent transition-colors duration-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
