"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import BrandName from "@/components/BrandName";

const APP_URL = "http://owner.qashup.co.ke/register";
const PHONE_NUMBER = "+254791408944";
const PHONE_DISPLAY = "+254 791 408 944";

const links = [
  { label: "How it works", href: "#how-it-works", id: "how-it-works" },
  { label: "Features",     href: "#features",     id: "features"     },
  { label: "Pricing",      href: "#pricing",      id: "pricing"      },
  { label: "Merchandise",  href: "#merchandise",  id: "merchandise"  },
];


function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Scroll state (run once on mount so it's correct on reload-mid-page)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    links.forEach(({ id }) => {
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

  // Escape closes drawer
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // After drawer closes, scroll to the requested section with a header offset
useEffect(() => {
  if (open || !pendingScroll) return;

  // Wait for the overflow-lock cleanup + a paint
  const raf = requestAnimationFrame(() => {
    const el = document.getElementById(pendingScroll);
    if (el) {
      const HEADER_OFFSET = 88; // approx header height, tune if needed
      const top =
        el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setPendingScroll(null);
  });

  return () => cancelAnimationFrame(raf);
}, [open, pendingScroll]);

  // Auto-close drawer when resizing up to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => { if (mq.matches) setOpen(false); };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      style={{ background: "#0a1f44" }}
      className={`fixed left-0 right-0 top-0 z-50 border-b border-white/10 transition-shadow duration-300 ${
        scrolled ? "shadow-lg shadow-black/30" : ""
      }`}
    >
      {/* Thin orange accent line at the very top */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />

      {/* Navbar content (wrapped so the progress bar is scoped to just this block) */}
      <div className="relative">
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
            {/* Sign in — desktop only */}
            <a
              href="https://owner.qashup.co.ke/login"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-sm font-medium text-slate-300 transition-colors hover:text-white md:block"
            >
              Sign in
            </a>

            {/* Call us — desktop only, attention-grabbing */}
            <a
              href={`tel:${PHONE_NUMBER}`}
              aria-label={`Call us at ${PHONE_DISPLAY}`}
              className="group relative hidden h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-slate-300 transition-colors hover:border-accent/60 hover:bg-white/10 hover:text-white md:flex"
            >
              {/* Periodic attention ripple */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-lg"
                animate={{
                  boxShadow: [
                    "0 0 0 0px rgba(249,115,22,0.45)",
                    "0 0 0 10px rgba(249,115,22,0)",
                  ],
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
              {/* Ringing handset */}
              <motion.span
                aria-hidden
                className="relative"
                animate={{ rotate: [0, -16, 16, -12, 12, -6, 6, 0] }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  repeatDelay: 3.2,
                  ease: "easeInOut",
                }}
              >
                <PhoneIcon className="h-[18px] w-[18px]" />
              </motion.span>
              {/* Hover tooltip */}
              <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#071530] px-2 py-1 text-[11px] font-medium text-slate-200 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                Call us
              </span>
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
              aria-expanded={open}
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

        {/* Scroll progress bar — sits under the navbar, above the drawer */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-accent"
        />
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
                  onClick={(e) => {
                    e.preventDefault();
                    setPendingScroll(l.id);
                    setOpen(false);
                  }}
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
                {/* Call us — mobile, attention-grabbing */}
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent/20"
                >
                  <motion.span
                    aria-hidden
                    animate={{ rotate: [0, -16, 16, -12, 12, -6, 6, 0] }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      repeatDelay: 3.2,
                      ease: "easeInOut",
                    }}
                  >
                    <PhoneIcon className="h-4 w-4" />
                  </motion.span>
                  Call us — {PHONE_DISPLAY}
                </a>

                <a
                  href="https://owner.qashup.co.ke/login"
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
                  Get Started — Free 14 days
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}