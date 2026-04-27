"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Download,
  Globe,
  Link2,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import {
  experiences,
  profile,
  projects,
  services,
  skills,
  testimonials,
} from "@/data/portfolio-content";

type SectionProps = {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  viewport: { once: true, amount: 0.25 },
};

function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <motion.section id={id} className="content-container w-full py-18 md:py-20" {...reveal}>
      <div className="mb-10 flex flex-col gap-4">
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">{title}</h2>
        {subtitle ? <p className="max-w-3xl text-zinc-400">{subtitle}</p> : null}
      </div>
      {children}
    </motion.section>
  );
}

export default function PortfolioPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);

  const year = new Date().getFullYear();

  const heroWords = ["Full Stack Engineering", "AI Integration", "Conversion-first Delivery"];
  const fallbackInitials = profile.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = encodeURIComponent(`Project Inquiry from ${name || "Portfolio"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    setIsSubmitting(true);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setIsSubmitting(false);
    }, 800);

    event.currentTarget.reset();
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-obsidian text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-45" />
      <div className="pointer-events-none absolute inset-0 bg-radial-veil" />
      <div className="pointer-events-none absolute inset-0 bg-wave-lines opacity-70" />

      <header className="glass-nav sticky top-0 z-50 border-b border-white/10">
        <div className="content-container flex items-center justify-between py-4">
          <a href="#home" className="text-2xl font-semibold tracking-[0.2em] text-white">
            MQ
          </a>
          <nav className="hidden items-center gap-7 text-base text-zinc-400 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-zinc-100">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#projects"
              className="btn-urvo-primary rounded-2xl px-5 py-2.5 text-sm font-medium transition"
            >
              Book a Demo
            </a>
            <a
              href="#contact"
              className="btn-urvo-ghost rounded-2xl px-5 py-2.5 text-sm font-medium transition"
            >
              Start Free
            </a>
          </div>
        </div>
      </header>

      <main id="home" className="relative">
        <section className="content-container relative flex w-full flex-col items-center overflow-hidden pt-16 pb-24 text-center md:pt-24">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative mb-10 h-px w-full max-w-3xl bg-linear-to-r from-transparent via-white/90 to-transparent opacity-70"
          />

          <div className="hero-shell relative w-full max-w-5xl px-6 py-10 md:px-14 md:py-14">
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6"
            >
              <div className="hero-avatar-shell mx-auto">
                {profile.profileImage && !avatarFailed ? (
                  <Image
                    src={profile.profileImage}
                    alt={profile.profileImageAlt || `${profile.name} profile photo`}
                    width={136}
                    height={136}
                    priority
                    className="hero-avatar-image h-[8.5rem] w-[8.5rem]"
                    onError={() => setAvatarFailed(true)}
                  />
                ) : (
                  <div className="hero-avatar-fallback" aria-label={`${profile.name} initials`}>
                    {fallbackInitials}
                  </div>
                )}
              </div>
            </motion.div>

            <motion.p
              className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/3 px-4 py-1 text-[0.62rem] tracking-[0.24em] text-zinc-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              FULL STACK + AI DEVELOPER
            </motion.p>

            <div className="relative mx-auto mb-3 w-fit px-4 py-3">
              <motion.div
                aria-hidden="true"
                className="hero-name-spotlight pointer-events-none absolute left-1/2 top-1/2 h-20 w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                initial={{ opacity: 0, scale: 0.92, y: 8 }}
                animate={{
                  opacity: [0, 1, 0.92, 1],
                  scale: [0.92, 1, 1.01, 1],
                  y: [8, 0, -2, 0],
                }}
                transition={{
                  duration: 3.2,
                  ease: [0.22, 1, 0.36, 1],
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "mirror",
                }}
              />
              <motion.div
                aria-hidden="true"
                className="hero-name-shine pointer-events-none absolute left-1/2 top-1/2 h-7 w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: [0, 0.75, 0], x: [-45, 0, 45] }}
                transition={{
                  duration: 3.6,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
              <h1 className="relative mx-auto text-3xl font-semibold leading-[1.04] tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
                Muhammad Qasim
              </h1>
            </div>

            <p className="mx-auto mb-9 max-w-3xl text-lg leading-relaxed text-zinc-400 md:text-2xl">
              I design and ship conversion-focused digital experiences that combine modern engineering with practical AI systems.
            </p>

            <div className="mb-8 flex flex-wrap justify-center gap-3">
              {heroWords.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.4 }}
                  className="rounded-full border border-white/12 bg-black px-4 py-1.5 text-sm text-zinc-300"
                >
                  {word}
                </motion.span>
              ))}
            </div>

            <div className="mb-10 flex flex-wrap justify-center gap-3">
              <a href="#projects" className="btn-urvo-primary group inline-flex items-center gap-2 rounded-2xl px-7 py-3 text-base font-semibold transition">
                Book a Free Demo
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </a>
              <a href="#contact" className="btn-urvo-ghost inline-flex items-center gap-2 rounded-2xl px-7 py-3 text-base font-semibold transition">
                Hear It Live
                <BriefcaseBusiness size={16} />
              </a>
              <a href="/resume-muhammad-qasim.pdf" download className="btn-urvo-ghost inline-flex items-center gap-2 rounded-2xl px-7 py-3 text-base font-semibold transition">
                Download Resume
                <Download size={16} />
              </a>
            </div>

            <p className="text-sm text-zinc-500">Trusted by hiring teams, founders, and growth-focused clients.</p>
          </div>
        </section>

        <div className="section-divider mx-auto w-full max-w-6xl" />

        <Section id="about" title="About" subtitle="Current CS student focused on real-world product engineering and practical AI implementation.">
          <div className="urvo-card grid gap-6 rounded-3xl p-8 md:grid-cols-2">
            <p className="leading-relaxed text-zinc-400">{profile.about}</p>
            <div className="space-y-3 text-zinc-400">
              <p className="rounded-xl border border-zinc-800 bg-black px-4 py-3">
                <span className="font-semibold text-white">Current Focus:</span> Backend systems, scalable frontend architecture, AI-enhanced UX.
              </p>
              <p className="rounded-xl border border-zinc-800 bg-black px-4 py-3">
                <span className="font-semibold text-white">Internship Edge:</span> Production API development, debugging, and integration workflows.
              </p>
              <p className="rounded-xl border border-zinc-800 bg-black px-4 py-3">
                <span className="font-semibold text-white">AI Path:</span> Prompt workflows, retrieval fundamentals, and automation features.
              </p>
            </div>
          </div>
        </Section>

        <div className="section-divider mx-auto w-full max-w-6xl" />

        <Section id="skills" title="Skills" subtitle="A balanced stack across product UI, backend systems, and applied AI tooling.">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {skills.map((group) => (
              <motion.article
                key={group.title}
                whileHover={{ y: -6 }}
                className="urvo-card rounded-2xl p-6"
              >
                <h3 className="mb-4 text-lg font-semibold text-white">{group.title}</h3>
                <ul className="space-y-2 text-sm text-zinc-400">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Code2 size={14} className="text-zinc-200" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </Section>

        <div className="section-divider mx-auto w-full max-w-6xl" />

        <Section id="projects" title="Projects" subtitle="Five featured builds designed for product quality, conversion, and real client value.">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <motion.article
                key={project.title}
                whileHover={{ y: -8 }}
                className="urvo-card group rounded-2xl p-5"
              >
                <div className="mb-4 rounded-xl border border-white/10 bg-linear-to-br from-zinc-100/20 via-zinc-500/5 to-zinc-100/10 p-6 text-sm font-medium tracking-wide text-zinc-200">
                  {project.thumbnailLabel}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">{project.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-zinc-400">{project.summary}</p>
                <div className="mb-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-400">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 text-sm">
                  <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn-urvo-primary inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold transition">
                    Live Demo
                    <ArrowRight size={14} />
                  </a>
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-urvo-ghost inline-flex items-center gap-2 rounded-lg px-4 py-2 text-zinc-100 transition">
                    GitHub
                    <Link2 size={14} />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </Section>

        <div className="section-divider mx-auto w-full max-w-6xl" />

        <Section id="experience" title="Experience" subtitle="Internship, freelance delivery, and academic growth built on practical execution.">
          <div className="space-y-4">
            {experiences.map((item) => (
              <motion.article
                key={item.role}
                whileHover={{ y: -4 }}
                className="urvo-card rounded-2xl p-6"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-semibold text-white">{item.role}</h3>
                  <span className="rounded-full border border-zinc-500/35 px-3 py-1 text-xs text-zinc-300">{item.period}</span>
                </div>
                <p className="mb-4 text-sm uppercase tracking-widest text-zinc-400">{item.organization}</p>
                <ul className="space-y-2 text-zinc-400">
                  {item.highlights.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-300" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </Section>

        <div className="section-divider mx-auto w-full max-w-6xl" />

        <Section id="services" title="Services" subtitle="Clear, reliable delivery for businesses, founders, and professionals.">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <motion.article
                key={service.title}
                whileHover={{ y: -6 }}
                className="urvo-card rounded-2xl p-6"
              >
                <h3 className="mb-3 text-lg font-semibold text-white">{service.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{service.description}</p>
              </motion.article>
            ))}
          </div>
        </Section>

        <div className="section-divider mx-auto w-full max-w-6xl" />

        <Section id="testimonials" title="Testimonials" subtitle="Feedback from collaborators who trusted delivery quality and speed.">
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <motion.article
                key={testimonial.name}
                whileHover={{ y: -6 }}
                className="urvo-card rounded-2xl p-6"
              >
                <p className="mb-4 text-zinc-400">&quot;{testimonial.quote}&quot;</p>
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-zinc-400">{testimonial.role}</p>
              </motion.article>
            ))}
          </div>
        </Section>

        <div className="section-divider mx-auto w-full max-w-6xl" />

        <Section id="contact" title="Contact" subtitle="Available for internships, freelance projects, and product collaborations.">
          <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
            <aside className="urvo-card rounded-2xl p-6">
              <h3 className="mb-4 text-xl font-semibold text-white">Reach Out</h3>
              <div className="space-y-3 text-sm text-zinc-400">
                <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-zinc-800 px-4 py-3 transition hover:border-zinc-600">
                  <MessageCircle size={16} className="text-zinc-300" />
                  WhatsApp
                </a>
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 rounded-xl border border-zinc-800 px-4 py-3 transition hover:border-zinc-600">
                  <Mail size={16} className="text-zinc-300" />
                  {profile.email}
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-zinc-800 px-4 py-3 transition hover:border-zinc-600">
                  <Globe size={16} className="text-zinc-300" />
                  LinkedIn
                </a>
                <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-zinc-800 px-4 py-3 transition hover:border-zinc-600">
                  <Link2 size={16} className="text-zinc-300" />
                  GitHub
                </a>
              </div>
            </aside>

            <form onSubmit={handleContactSubmit} className="urvo-card rounded-2xl p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm text-zinc-400">
                  Name
                  <input
                    required
                    name="name"
                    className="mt-2 w-full rounded-lg border border-zinc-700 bg-black px-3 py-2 text-white outline-none transition focus:border-zinc-500"
                    placeholder="Your name"
                  />
                </label>
                <label className="text-sm text-zinc-400">
                  Email
                  <input
                    required
                    name="email"
                    type="email"
                    className="mt-2 w-full rounded-lg border border-zinc-700 bg-black px-3 py-2 text-white outline-none transition focus:border-zinc-500"
                    placeholder="you@example.com"
                  />
                </label>
              </div>
              <label className="mt-4 block text-sm text-zinc-400">
                Message
                <textarea
                  required
                  name="message"
                  rows={5}
                  className="mt-2 w-full rounded-lg border border-zinc-700 bg-black px-3 py-2 text-white outline-none transition focus:border-zinc-500"
                  placeholder="Tell me about your project goals..."
                />
              </label>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="btn-urvo-primary mt-5 inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Opening Mail Client..." : "Send Message"}
                <Send size={14} />
              </motion.button>
            </form>
          </div>
        </Section>
      </main>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-zinc-600">
        © {year} {profile.name}. Built with Next.js, Tailwind CSS, and Framer Motion.
      </footer>
    </div>
  );
}
