"use client";

import { motion } from "framer-motion";

const REGISTER_URL = "https://sales-tracker-lovat.vercel.app/register";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const columns = [
  {
    heading: "Platform",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Features",     href: "#features"     },
      { label: "Pricing",      href: "#pricing"      },
    ],
  },
  {
    heading: "Portals",
    links: [
      { label: "Owner Portal", href: "https://sales-tracker-lovat.vercel.app/register" },
      { label: "Agent Portal", href: "https://agent-app-olive.vercel.app/login"        },
      { label: "Shop Portal",  href: "https://shop-olive-tau.vercel.app/pos"           },
    ],
  },
  {
    heading: "Coverage",
    links: [
      { label: "Kenya",    href: "#" },
      { label: "Tanzania", href: "#" },
      { label: "Uganda",   href: "#" },
      { label: "Rwanda",   href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "#071530" }}>
      {/* subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* top accent glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-5">

        {/* ── top brand strip ── */}
        <div className="border-b border-white/8 py-14 md:py-20">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">

            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent shadow-lg shadow-accent/40">
                  <span className="text-xs font-black tracking-tight text-white">JS</span>
                </div>
                <span className="text-xl font-bold text-white">JS Sales Tracker</span>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-slate-300">
                The all-in-one sales management platform for business owners
                across Kenya and East Africa. Know every sale. Trust every number.
              </p>
            </div>

            <motion.a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease }}
              className="flex-shrink-0 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white shadow-lg shadow-accent/30"
            >
              Start free trial →
            </motion.a>
          </div>
        </div>

        {/* ── nav columns ── */}
        <div className="grid grid-cols-2 gap-10 py-12 sm:grid-cols-3 md:py-14">
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="mb-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {col.heading}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.18, ease }}
                      className="inline-block text-sm text-slate-300 transition-colors hover:text-white"
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── bottom bar ── */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/8 py-7 sm:flex-row">
          <p className="text-xs text-slate-400">
            © 2026 JS Sales Tracker. All rights reserved.
          </p>

          <div className="flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            <span className="text-xs font-medium text-green-300">
              Payments via M-Pesa · Kenya & East Africa
            </span>
          </div>

          <p className="text-xs text-slate-400">Built for Africa 🌍</p>
        </div>

      </div>
    </footer>
  );
}
