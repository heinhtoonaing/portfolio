"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { profile, navLinks } from "@/lib/portfolio-data";
import {
  About,
  Skills,
  Projects,
  Education,
  Contact,
  Footer,
} from "@/components/portfolio/sections";

// ---------- navbar ----------
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || open
          ? "border-b border-stone-200 bg-[#FAFAF9]/95 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6" aria-label="Main">
        <a
          href="#top"
          className="font-mono text-sm font-semibold tracking-tight text-stone-900"
          aria-label="Back to top"
        >
          heinhtoonaing<span className="text-orange-700">.dev</span>
        </a>

        {/* desktop */}
        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-stone-600 transition-colors hover:text-stone-900"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-1 text-sm font-medium text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-orange-700 hover:decoration-orange-700 md:inline-flex"
        >
          GitHub <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>

        {/* mobile toggle */}
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-stone-200 bg-white text-stone-700 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* mobile menu */}
      {open && (
        <div className="border-t border-stone-200 bg-[#FAFAF9] md:hidden">
          <ul className="space-y-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-sm text-stone-700 transition-colors hover:bg-stone-100 hover:text-stone-900"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-md px-3 py-2.5 text-sm font-medium text-stone-900"
              >
                GitHub — {profile.githubHandle}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

// ---------- hero ----------
function Hero() {
  return (
    <section id="top" className="pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div className="mx-auto max-w-5xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-orange-700">
          {profile.roleLine}
        </p>

        <h1 className="mt-5 max-w-3xl font-serif text-4xl font-bold leading-[1.1] tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
          {profile.name}
        </h1>

        <div className="mt-7 max-w-2xl space-y-4 text-[15px] leading-[1.8] text-stone-700 sm:text-base">
          <p>{profile.heroP1}</p>
          <p>{profile.heroP2}</p>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Button asChild className="h-11 bg-stone-900 px-6 text-stone-50 hover:bg-stone-700">
            <a href="#projects">View Projects</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 border-stone-300 bg-transparent px-6 text-stone-900 hover:bg-stone-100 hover:text-stone-900"
          >
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
          <a
            href="#contact"
            className="text-sm font-medium text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-orange-700 hover:decoration-orange-700"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- page ----------
export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF9] text-stone-900 antialiased selection:bg-orange-100 selection:text-stone-900">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-stone-900 focus:px-4 focus:py-2 focus:text-sm focus:text-stone-50"
      >
        Skip to content
      </a>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="mx-auto max-w-5xl px-6">
          <About />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
