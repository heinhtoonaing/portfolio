"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ExternalLink, MapPin, GraduationCap } from "lucide-react";
import {
  profile,
  featuredProjects,
  additionalProjects,
  skillGroups,
  education,
  statusDotColor,
  type FeaturedProject,
  type CaseImage,
} from "@/lib/portfolio-data";

// ---------- shared ----------
function StatusPill({ status }: { status: keyof typeof statusDotColor }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-stone-600">
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${statusDotColor[status]}`} />
      {status}
    </span>
  );
}

export function SectionHeading({
  number,
  title,
  lead,
}: {
  number: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="mb-12 border-t border-stone-200 pt-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-orange-700">
        {number} — {title}
      </p>
      {lead && (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-600">{lead}</p>
      )}
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-mono text-[11px] uppercase tracking-[0.15em] text-stone-400">
      {children}
    </h4>
  );
}

// ---------- about ----------
export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-20">
      <SectionHeading number="01" title="About" />
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="space-y-5 lg:col-span-8">
          {profile.about.map((paragraph, i) => (
            <p key={i} className="leading-[1.75] text-stone-700">
              {paragraph}
            </p>
          ))}
        </div>

        <aside className="lg:col-span-4" aria-label="Quick facts">
          <dl className="space-y-5 border-l border-stone-200 pl-6">
            {profile.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-stone-400">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-stone-800">
                  {fact.href ? (
                    <a
                      href={fact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-stone-300 underline-offset-4 transition-colors hover:text-orange-700 hover:decoration-orange-700"
                    >
                      {fact.value}
                    </a>
                  ) : (
                    fact.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}

// ---------- case study figures ----------
function CaseFigure({ image }: { image: CaseImage }) {
  return (
    <figure className="space-y-3">
      <div className="overflow-hidden rounded-lg border border-stone-200 bg-white">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="h-auto w-full"
          sizes="(max-width: 1024px) 100vw, 600px"
        />
      </div>
      <figcaption className="font-mono text-xs leading-relaxed text-stone-500">
        {image.caption}
      </figcaption>
    </figure>
  );
}

// ---------- featured project case study ----------
function CaseStudy({ project, index }: { project: FeaturedProject; index: number }) {
  const [firstImage, secondImage] = project.images ?? [];
  const contentBlock = (
    <div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <StatusPill status={project.status} />
        <span className="font-mono text-[11px] text-stone-400">0{index + 1}</span>
      </div>
      <h3 className="mt-3 font-serif text-2xl font-bold tracking-tight text-stone-900">
        {project.title}
      </h3>
      <p className="mt-1 text-sm font-medium leading-relaxed text-stone-500">
        {project.tagline}
      </p>

      <div className="mt-5">
        <SubHeading>The problem</SubHeading>
        <p className="mt-2 text-[15px] leading-[1.75] text-stone-700">{project.problem}</p>
      </div>

      <div className="mt-6">
        <SubHeading>What I built</SubHeading>
        <ul className="mt-3 space-y-2.5">
          {project.contributions.map((c, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-stone-700">
              <span aria-hidden="true" className="mt-[9px] h-1 w-3 shrink-0 bg-stone-300" />
              {c}
            </li>
          ))}
        </ul>
      </div>

      {project.results && project.results.length > 0 && (
        <div className="mt-6">
          <SubHeading>Results</SubHeading>
          <ul className="mt-3 space-y-2.5">
            {project.results.map((r, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-stone-700">
                <span aria-hidden="true" className="mt-[9px] h-1 w-3 shrink-0 bg-emerald-600/60" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.limitations && project.limitations.length > 0 && (
        <div className="mt-6">
          <SubHeading>Limitations</SubHeading>
          <ul className="mt-3 space-y-2.5">
            {project.limitations.map((l, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-stone-600">
                <span aria-hidden="true" className="mt-[9px] h-1 w-3 shrink-0 bg-stone-300" />
                {l}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <SubHeading>Technologies</SubHeading>
        <p className="mt-2 font-mono text-xs leading-relaxed text-stone-500">
          {project.tech.join(" · ")}
        </p>
      </div>

      {project.note && (
        <p className="mt-4 border-l-2 border-stone-300 pl-4 text-sm leading-relaxed text-stone-500">
          {project.note}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-5 pt-6">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-orange-700 hover:decoration-orange-700"
          >
            Source Code <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-orange-700 hover:decoration-orange-700"
          >
            Live Demo <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );

  return (
    <article
      className="border-t border-stone-200 py-12"
      aria-label={`Project: ${project.title}`}
    >
      <div className="max-w-3xl">{contentBlock}</div>
      {firstImage && (
        <div className="mt-10 space-y-8">
          <CaseFigure image={firstImage} />
          {secondImage && <CaseFigure image={secondImage} />}
        </div>
      )}
    </article>
  );
}

// ---------- projects ----------
export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-16 sm:py-20">
      <SectionHeading
        number="02"
        title="Projects"
        lead="Three projects documented in depth — the problem, what was actually built, what works today, and current limitations."
      />

      <div className="-mt-4">
        {featuredProjects.map((project, i) => (
          <CaseStudy key={project.title} project={project} index={i} />
        ))}
      </div>

      {/* additional projects */}
      <div className="mt-4">
        <h3 className="mb-2 font-serif text-xl font-bold tracking-tight text-stone-900">
          Additional projects
        </h3>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-stone-500">
          Smaller builds, each included for a specific skill it demonstrates. Links point to the
          repositories.
        </p>
        <ul className="border-t border-stone-200">
          {additionalProjects.map((p) => (
            <li
              key={p.title}
              className="grid gap-2 border-b border-stone-200 py-5 sm:grid-cols-12 sm:gap-6"
            >
              <div className="sm:col-span-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h4 className="font-semibold text-stone-900">{p.title}</h4>
                  <StatusPill status={p.status} />
                </div>
                <p className="mt-1 font-mono text-xs text-stone-500">{p.tech}</p>
              </div>
              <p className="text-sm leading-relaxed text-stone-600 sm:col-span-6">{p.what}</p>
              <div className="flex items-center gap-4 sm:col-span-2 sm:justify-end">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-orange-700 hover:decoration-orange-700"
                    aria-label={`${p.title} GitHub repository`}
                  >
                    GitHub <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-orange-700 hover:decoration-orange-700"
                    aria-label={`${p.title} live demo`}
                  >
                    Live <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---------- skills ----------
export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-16 sm:py-20">
      <SectionHeading
        number="03"
        title="Technical Skills"
        lead="Technologies I have used in the projects above — grouped by category, no proficiency theatrics."
      />
      <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group) => (
          <div key={group.title} className="border-t border-stone-300 pt-4">
            <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-orange-700">
              {group.title}
            </dt>
            <dd className="mt-3 leading-[1.9] text-stone-700">{group.skills.join(" · ")}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

// ---------- education ----------
export function Education() {
  return (
    <section id="education" className="scroll-mt-24 py-16 sm:py-20">
      <SectionHeading number="04" title="Education" />
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <div className="flex items-start gap-3">
            <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-stone-400" aria-hidden="true" />
            <div>
              <h3 className="font-serif text-xl font-bold tracking-tight text-stone-900">
                {education.university}
              </h3>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-stone-500">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {education.location}
              </p>
              <p className="mt-4 font-medium text-stone-800">{education.degree}</p>
              <p className="mt-1 font-mono text-sm text-orange-700">{education.concentration}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SubHeading>Key coursework</SubHeading>
          <ul className="mt-3 flex flex-wrap gap-2">
            {education.coursework.map((course) => (
              <li
                key={course}
                className="rounded-md border border-stone-200 bg-white px-3 py-1.5 text-sm text-stone-700"
              >
                {course}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ---------- contact ----------
export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-20">
      <SectionHeading number="05" title="Contact" />
      <div className="max-w-2xl">
        <h3 className="font-serif text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
          Have a project or internship opportunity?
        </h3>
        <p className="mt-4 leading-[1.75] text-stone-600">
          I&apos;m open to connecting with teams working on software engineering, full-stack
          development, and data-driven applications.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          {profile.email ? (
            <Button asChild className="h-11 bg-stone-900 px-6 text-stone-50 hover:bg-stone-700">
              <a href={`mailto:${profile.email}`}>Email me</a>
            </Button>
          ) : (
            <p className="text-sm leading-relaxed text-stone-500">
              The fastest way to reach me is{" "}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-orange-700 hover:decoration-orange-700"
              >
                GitHub
              </a>{" "}
              — a direct email address will be listed here soon.
            </p>
          )}
          <Button
            asChild
            variant="outline"
            className="h-11 border-stone-300 bg-transparent px-6 text-stone-900 hover:bg-stone-100 hover:text-stone-900"
          >
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub — {profile.githubHandle}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

// ---------- footer ----------
export function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-7 pb-[max(1.75rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-stone-600">
          <span className="font-medium text-stone-900">{profile.name}</span>
          <span className="text-stone-400"> · </span>Computer Science Graduate
        </p>
        <p className="text-xs text-stone-500">Built with Next.js, TypeScript, and Tailwind CSS.</p>
        <p className="font-mono text-xs text-stone-500">© {new Date().getFullYear()} {profile.name}</p>
      </div>
    </footer>
  );
}
