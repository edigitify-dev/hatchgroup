"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Footer from "@/components/sections/Footer";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

const CULTURE = [
  {
    number: "01",
    title: "Craft First",
    body: "We work alongside India's finest artisans and ateliers, and expect the same devotion to detail from everyone who joins the studio.",
  },
  {
    number: "02",
    title: "A Collaborative Studio",
    body: "Design, architecture, and project delivery sit in the same room here — every voice shapes the outcome, regardless of title.",
  },
  {
    number: "03",
    title: "Grow With Every Project",
    body: "You'll move across residential, commercial, and hospitality work — building a range most studios take a decade to offer.",
  },
  {
    number: "04",
    title: "Design With Purpose",
    body: "We design for decades, not seasons. Every role here contributes to spaces conceived to age with grace.",
  },
];

const POSITIONS = [
  "Interior Designer",
  "Architect",
  "Project Manager",
  "Site Supervisor",
  "Design Intern",
  "Business Development",
  "Other",
];

const initialFormState = {
  name: "",
  position: "",
  age: "",
  address: "",
  email: "",
  phone: "",
  gradCourse: "",
  postGradCourse: "",
  gradCollege: "",
  postGradCollege: "",
  currentCompany: "",
  reasonForChange: "",
  designation: "",
  noticePeriod: "",
  duration: "",
  lastDrawnSalary: "",
  totalExperience: "",
  salaryExpected: "",
  skillSets: "",
};

type FormField = keyof typeof initialFormState;

// Editorial underline fields — matches the site's brand language (nav
// links, Enquire flow) rather than a generic boxed SaaS form. Contrast
// comes from opaque foreground labels + a small gold tick, not a filled
// card; a gold sweep animates in under the active field on focus.
const labelClass = "flex items-center gap-2.5 text-[11px] tracking-[0.22em] uppercase font-medium text-foreground/80 mb-3";
const inputClass =
  "w-full bg-transparent border-b border-foreground/25 py-3 text-foreground text-[15px] placeholder-foreground/30 outline-none transition-colors";
const sweepClass =
  "pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 ease-out group-focus-within:w-full";

function FieldLabel({ label, required, hint }: { label: string; required?: boolean; hint?: string }) {
  return (
    <span className={labelClass}>
      {label} {required && <span className="text-accent">*</span>}
      {hint && <span className="normal-case font-normal tracking-normal text-foreground/40">{hint}</span>}
    </span>
  );
}

function Field({
  id,
  label,
  required,
  type = "text",
  value,
  onChange,
}: {
  id: FormField;
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="group relative">
      <label htmlFor={id}><FieldLabel label={label} required={required} /></label>
      <input id={id} name={id} type={type} required={required} value={value} onChange={onChange} className={inputClass} />
      <span className={sweepClass} />
    </div>
  );
}

function FileField({
  id,
  label,
  required,
  hint,
  accept,
  file,
  onChange,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  accept: string;
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="group relative">
      <label htmlFor={id}><FieldLabel label={label} required={required} hint={hint} /></label>
      <div className="flex items-center justify-between gap-4 border-b border-foreground/25 py-3">
        <span className="text-foreground/50 text-sm truncate">{file ? file.name : "No file chosen"}</span>
        <label
          htmlFor={id}
          data-cursor-interact
          className="shrink-0 cursor-pointer text-[10px] tracking-[0.25em] uppercase font-medium text-accent hover:text-foreground transition-colors"
        >
          Browse
        </label>
      </div>
      <input id={id} type="file" required={required} accept={accept} onChange={onChange} className="sr-only" />
      <span className={sweepClass} />
    </div>
  );
}

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-5 mb-9 mt-2">
      <span className="text-accent text-[10px] tracking-[0.5em] uppercase font-medium whitespace-nowrap">
        {number} — {title}
      </span>
      <div className="flex-1 h-px luxe-rule" />
    </div>
  );
}

export default function CareerPageContent() {
  const [formData, setFormData] = useState(initialFormState);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: FormField) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleFile = (setFile: (f: File | null) => void, maxLabel: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file && file.size > 5 * 1024 * 1024) {
      setSubmitError(`${maxLabel} must be under 5MB.`);
      e.target.value = "";
      setFile(null);
      return;
    }
    setSubmitError("");
    setFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const body = new FormData();
      Object.entries(formData).forEach(([key, value]) => body.append(key, value));
      if (resumeFile) body.append("resume", resumeFile);
      if (portfolioFile) body.append("portfolio", portfolioFile);

      const res = await fetch("/api/career", { method: "POST", body });
      if (!res.ok) throw new Error("Failed to submit application");

      setSubmitted(true);
      setFormData(initialFormState);
      setResumeFile(null);
      setPortfolioFile(null);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative bg-background w-full min-h-screen">
      {/* ── HERO ── */}
      <div className="relative w-full h-[80vh] md:h-screen overflow-hidden">
        <Image
          src="/images/hero.png"
          alt="Life at Hatch Group"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-accent text-[10px] md:text-[11px] tracking-[0.55em] uppercase font-medium mb-6"
          >
            Join The Studio
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light text-white leading-[1.05]"
            style={{ fontSize: "clamp(2.4rem, 7vw, 6rem)", letterSpacing: "-0.015em" }}
          >
            Careers at <span className="">Hatch Group</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-8 text-white font-light text-sm md:text-base tracking-wide max-w-lg leading-relaxed"
          >
            We&apos;re always looking for people who treat design as a craft, not a job. See where you fit in.
          </motion.p>
        </div>
      </div>

      {/* ── CULTURE ── */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 luxe-ivory overflow-hidden">
        <div className="absolute inset-0 pointer-events-none luxe-grain opacity-40" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="flex flex-col items-center text-center mb-16 md:mb-24">
            <span className="text-accent text-[10px] tracking-[0.5em] uppercase font-medium mb-4">
              Why Hatch Group
            </span>
            <h2
              className="font-display font-light text-foreground leading-[1.05] mx-auto"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3.6rem)", letterSpacing: "-0.015em" }}
            >
              Life at the <span className="luxe-gradient-text">Studio</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
            {CULTURE.map((item, i) => (
              <motion.div
                key={item.number}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="flex gap-6"
              >
                <span
                  className="font-display font-light select-none leading-none shrink-0"
                  style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", color: "rgba(28,36,32,0.08)" }}
                >
                  {item.number}
                </span>
                <div className="pt-2">
                  <h3 className="text-foreground text-lg md:text-xl font-display font-light mb-3">
                    {item.title}
                  </h3>
                  <p className="text-foreground/60 font-light text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section id="apply" className="relative py-24 md:py-32 px-6 md:px-12 luxe-ivory overflow-hidden">
        <div className="absolute inset-0 pointer-events-none luxe-grain opacity-40" />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "10%", left: "50%", transform: "translateX(-50%)",
            width: "60vw", height: "40vh",
            background: "radial-gradient(ellipse at center, rgba(169,140,95,0.10) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="flex flex-col items-center text-center mb-16 md:mb-20">
            <span className="text-accent text-[10px] tracking-[0.5em] uppercase font-medium mb-4">
              Open Doors
            </span>
            <h2
              className="font-display font-light text-foreground leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)", letterSpacing: "-0.015em" }}
            >
              Apply <span className="luxe-gradient-text">Now</span>
            </h2>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center py-16"
            >
              <h3 className="font-display font-light text-2xl md:text-3xl text-foreground mb-4">
                Thank you for applying.
              </h3>
              <p className="text-foreground/60 font-light text-sm leading-relaxed max-w-md mx-auto">
                We&apos;ve received your application and will be in touch if there&apos;s a fit.
              </p>
            </motion.div>
          ) : (
            <div className="relative">
              {/* Gold corner brackets — premium framing, echoes the /project tile hover accents */}
              <div className="absolute -top-2 -left-2 w-6 h-6 md:-top-3 md:-left-3 md:w-10 md:h-10 border-t border-l border-accent/50 pointer-events-none" />
              <div className="absolute -top-2 -right-2 w-6 h-6 md:-top-3 md:-right-3 md:w-10 md:h-10 border-t border-r border-accent/50 pointer-events-none" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 md:-bottom-3 md:-left-3 md:w-10 md:h-10 border-b border-l border-accent/50 pointer-events-none" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 md:-bottom-3 md:-right-3 md:w-10 md:h-10 border-b border-r border-accent/50 pointer-events-none" />

              <motion.form
                {...fadeUp}
                viewport={{ once: true, amount: 0.05 }}
                onSubmit={handleSubmit}
                className="relative bg-white/40 backdrop-blur-sm border border-foreground/10 shadow-[0_40px_80px_-40px_rgba(28,36,32,0.25)] px-5 py-10 sm:px-10 sm:py-12 md:px-16 md:py-16 flex flex-col gap-9 md:gap-12"
              >
                <div>
                  <SectionHeading number="01" title="Personal Details" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 md:gap-y-10">
                    <Field id="name" label="Applicant Name" required value={formData.name} onChange={handleChange("name")} />
                    <div className="group relative">
                      <label htmlFor="position"><FieldLabel label="Position Applied For" /></label>
                      <select
                        id="position"
                        value={formData.position}
                        onChange={handleChange("position")}
                        className={`w-full bg-transparent border-b border-foreground/25 py-3 text-[15px] pr-6 outline-none transition-colors appearance-none cursor-pointer ${formData.position ? "text-foreground" : "text-foreground/30"}`}
                      >
                        <option value="">Select a position</option>
                        {POSITIONS.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                      <svg
                        viewBox="0 0 10 6"
                        aria-hidden="true"
                        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 stroke-accent"
                        fill="none"
                      >
                        <path d="M1 1L5 5L9 1" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className={sweepClass} />
                    </div>
                    <Field id="age" label="Age" type="number" value={formData.age} onChange={handleChange("age")} />
                    <Field id="email" label="Email Address" required type="email" value={formData.email} onChange={handleChange("email")} />
                    <Field id="phone" label="Phone Number" type="tel" value={formData.phone} onChange={handleChange("phone")} />
                    <div className="group relative">
                      <label htmlFor="address"><FieldLabel label="Residence Address" /></label>
                      <textarea
                        id="address"
                        rows={1}
                        value={formData.address}
                        onChange={handleChange("address")}
                        className={`${inputClass} resize-none`}
                      />
                      <span className={sweepClass} />
                    </div>
                  </div>
                </div>

                <div>
                  <SectionHeading number="02" title="Qualification" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 md:gap-y-10">
                    <Field id="gradCourse" label="Graduation Course" value={formData.gradCourse} onChange={handleChange("gradCourse")} />
                    <Field id="postGradCourse" label="Post Graduation Course" value={formData.postGradCourse} onChange={handleChange("postGradCourse")} />
                    <Field id="gradCollege" label="Graduation College / University" value={formData.gradCollege} onChange={handleChange("gradCollege")} />
                    <Field id="postGradCollege" label="Post Graduation College / University" value={formData.postGradCollege} onChange={handleChange("postGradCollege")} />
                  </div>
                </div>

                <div>
                  <SectionHeading number="03" title="Current Position" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 md:gap-y-10 mb-8 md:mb-10">
                    <Field id="currentCompany" label="Current Company Name" value={formData.currentCompany} onChange={handleChange("currentCompany")} />
                    <Field id="reasonForChange" label="Reason for Change" value={formData.reasonForChange} onChange={handleChange("reasonForChange")} />
                    <Field id="designation" label="Designation" value={formData.designation} onChange={handleChange("designation")} />
                    <Field id="noticePeriod" label="Notice Period (if any)" value={formData.noticePeriod} onChange={handleChange("noticePeriod")} />
                    <Field id="duration" label="Duration (from ... till)" value={formData.duration} onChange={handleChange("duration")} />
                    <Field id="lastDrawnSalary" label="Last Drawn Salary (Annual CTC)" value={formData.lastDrawnSalary} onChange={handleChange("lastDrawnSalary")} />
                    <Field id="totalExperience" label="Total Work Experience" value={formData.totalExperience} onChange={handleChange("totalExperience")} />
                    <Field id="salaryExpected" label="Salary Expected (Annual CTC)" value={formData.salaryExpected} onChange={handleChange("salaryExpected")} />
                  </div>
                  <div className="group relative">
                    <label htmlFor="skillSets"><FieldLabel label="SkillSets / Software Knowledge" /></label>
                    <textarea
                      id="skillSets"
                      rows={2}
                      value={formData.skillSets}
                      onChange={handleChange("skillSets")}
                      className={`${inputClass} resize-none`}
                    />
                    <span className={sweepClass} />
                  </div>
                </div>

                <div>
                  <SectionHeading number="04" title="Resume & Portfolio" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 md:gap-y-10">
                    <FileField
                      id="resume"
                      label="Resume Attachment"
                      required
                      hint="(PDF or Word, max 5MB)"
                      accept=".pdf,.doc,.docx"
                      file={resumeFile}
                      onChange={handleFile(setResumeFile, "Resume")}
                    />
                    <FileField
                      id="portfolio"
                      label="Portfolio Attachment"
                      hint="(optional, max 5MB)"
                      accept=".pdf,.doc,.docx,.zip"
                      file={portfolioFile}
                      onChange={handleFile(setPortfolioFile, "Portfolio")}
                    />
                  </div>
                </div>

                {submitError && <p className="text-sm text-red-500">{submitError}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-cursor-interact
                  className="relative overflow-hidden group/btn flex items-center justify-center self-stretch sm:self-start sm:inline-flex px-10 py-4 md:px-14 md:py-5 uppercase tracking-[0.3em] text-[10px] md:text-[11px] font-medium bg-foreground text-ivory transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 group-hover/btn:text-foreground transition-colors duration-500">
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </span>
                  <div
                    className="absolute inset-0 transform scale-y-0 origin-bottom group-hover/btn:scale-y-100 transition-transform duration-500 ease-in-out"
                    style={{ background: "linear-gradient(115deg, #D6BD94 0%, #C2A878 60%, #A98C5F 100%)" }}
                  />
                </button>
              </motion.form>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
