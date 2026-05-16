"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import BrandName from "@/components/BrandName";

const APP_URL = "https://sales-tracker-lovat.vercel.app/register";

const links = [
  { label: "How it works", href: "#how-it-works", id: "how-it-works" },
  { label: "Features",     href: "#features",     id: "features"     },
  { label: "Pricing",      href: "#pricing",      id: "pricing"      },
];

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.id);
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header
      style={{ background: "#0a1f44" }}
      className={`fixed left-0 right-0 top-0 z-50 border-b border-white/10 transition-all duration-300 ${
        scrolled ? "shadow-lg shadow-black/30" : ""
      }`}
    >
      {/* thin orange accent line at the very top */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:py-6">

        {/* Logo */}
        <a href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/screenshots/Qc.png"
            alt="QASHUP logo"
            width={56}
            height={56}
            className="rounded-lg w-9 h-9 md:w-12 md:h-12 lg:w-14 lg:h-14"
            priority
          />
          <div className="flex flex-col leading-none">
            <BrandName className="text-base" />
            <span className="hidden text-[10px] font-medium text-slate-400 sm:block">
              Kenya & East Africa
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.label}
                href={l.href}
                className="relative px-5 py-2.5 text-[15px] font-medium outline-none"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className={`relative transition-colors duration-200 ${
                  isActive ? "text-white" : "text-slate-300 hover:text-white"
                }`}>
                  {l.label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Sign in link — desktop only */}
          <a
            href="https://sales-tracker-lovat.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm font-medium text-slate-300 transition-colors hover:text-white md:block"
          >
            Sign in
          </a>

          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-accent/30 transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-accent/40"
          >
            Get Started
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 transition-colors hover:bg-white/10 md:hidden"
          >
            <motion.div animate={open ? "open" : "closed"} className="flex flex-col gap-1.5">
              <motion.span
                variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 6 } }}
                className="block h-0.5 w-5 rounded-full bg-white origin-center"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                className="block h-0.5 w-5 rounded-full bg-white"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -6 } }}
                className="block h-0.5 w-5 rounded-full bg-white origin-center"
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden border-t border-white/10 md:hidden"
            style={{ background: "#071530" }}
          >
            <nav className="flex flex-col px-5 py-4 gap-1">
              {links.map((l) => {
                const isActive = active === l.id;
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-slate-300 hover:bg-white/6 hover:text-white"
                    }`}
                  >
                    {l.label}
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  </a>
                );
              })}

              <div className="mt-3 border-t border-white/10 pt-3 flex flex-col gap-2">
                <a
                  href="https://sales-tracker-lovat.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-medium text-slate-300 transition-colors hover:bg-white/6 hover:text-white"
                >
                  Sign in
                </a>
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-accent px-4 py-3 text-center text-sm font-bold text-white"
                >
                  Get Started — Free 30 days
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
