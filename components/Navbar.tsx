"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const APP_URL = "https://sales-tracker-lovat.vercel.app";

const links = [
  { label: "How it works", href: "#how-it-works", id: "how-it-works" },
  { label: "Features",     href: "#features",     id: "features"     },
  { label: "Pricing",      href: "#pricing",      id: "pricing"      },
];

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  /* ── track scroll depth for shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── highlight active section via IntersectionObserver ── */
  useEffect(() => {
    const ids = links.map((l) => l.id);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b border-border bg-bg/95 backdrop-blur-xl transition-shadow duration-300 ${
        scrolled ? "shadow-sm shadow-black/5" : ""
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">

        {/* logo */}
        <a href="/" className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent">
            <span className="text-xs font-black text-white">S</span>
          </div>
          <span className="text-sm font-semibold tracking-tight text-ink">
            Epic Sales Tracker
          </span>
        </a>

        {/* desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.label}
                href={l.href}
                className="relative px-4 py-2 text-sm font-medium outline-none"
              >
                {/* sliding background pill */}
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-ink/6"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span
                  className={`relative transition-colors duration-200 ${
                    isActive ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {l.label}
                </span>
                {/* active underline dot */}
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-85"
          >
            Get Started
          </a>

          {/* hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border transition-colors hover:bg-surface md:hidden"
          >
            <motion.div
              animate={open ? "open" : "closed"}
              className="flex flex-col gap-1.5"
            >
              <motion.span
                variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 6 } }}
                className="block h-0.5 w-4 rounded-full bg-ink origin-center"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                className="block h-0.5 w-4 rounded-full bg-ink"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -6 } }}
                className="block h-0.5 w-4 rounded-full bg-ink origin-center"
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden border-t border-border bg-bg md:hidden"
          >
            <nav className="flex flex-col px-5 py-3">
              {links.map((l) => {
                const isActive = active === l.id;
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-ink/6 text-ink"
                        : "text-muted hover:bg-surface hover:text-ink"
                    }`}
                  >
                    {l.label}
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    )}
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
