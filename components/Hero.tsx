"use client";

import { motion } from "framer-motion";
import DashboardMockup from "@/components/DashboardMockup";

const APP_URL = "https://sales-tracker-lovat.vercel.app/register";

const floatingCards = [
  {
    id: "sale",
    label: "Sale recorded",
    value: "KSh 8,400",
    sub: "Agent: James M. · 2 min ago",
    dot: "bg-emerald-500",
    iconBg: "bg-emerald-100",
    valueColor: "text-emerald-600",
    shadow: "shadow-emerald-500/20",
    pos: "top-6 -left-4 lg:-left-14",
    delay: 0.85,
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l2.5 2.5L10 4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "stock",
    label: "Low stock alert",
    value: "12 units left",
    sub: "Airtime cards · Shop B",
    dot: "bg-amber-500",
    iconBg: "bg-amber-100",
    valueColor: "text-amber-600",
    shadow: "shadow-amber-500/20",
    pos: "top-1/3 -right-4 lg:-right-10",
    delay: 1.1,
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 2L10.5 9.5H1.5L6 2Z" fill="#f59e0b" />
        <path d="M6 5.5V7" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="6" cy="8.2" r="0.5" fill="white" />
      </svg>
    ),
  },
  {
    id: "cash",
    label: "Cash handover approved",
    value: "KSh 42,000",
    sub: "Owner approved · Shop A",
    dot: "bg-blue-500",
    iconBg: "bg-blue-100",
    valueColor: "text-blue-600",
    shadow: "shadow-blue-500/20",
    pos: "bottom-14 -left-4 lg:-left-14",
    delay: 1.35,
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <rect x="1" y="3" width="10" height="7" rx="1.5" stroke="#3b82f6" strokeWidth="1.3" />
        <path d="M1 5.5h10" stroke="#3b82f6" strokeWidth="1.3" />
        <circle cx="4" cy="7.5" r="0.8" fill="#3b82f6" />
      </svg>
    ),
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-10 md:pt-36 md:pb-20">
      {/* subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #09090b 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* warm glow behind headline */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent/8 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">

          {/* ── Left: Copy ── */}
          <div>
            {/* live badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 shadow-sm sm:mb-7 sm:px-3.5"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-muted">
                50+ businesses running live in Kenya
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-[2rem] font-black leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-[58px]"
            >
              Your agents are{" "}
              <span className="relative whitespace-nowrap">
                selling now.
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 w-full"
                  height="5"
                  viewBox="0 0 220 5"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 4 Q55 1 110 3 Q165 5 218 2"
                    stroke="#f97316"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>{" "}
              <span className="text-accent">Are you watching?</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-6 max-w-[480px] text-base leading-relaxed text-muted sm:text-lg"
            >
              QASHUP gives Kenyan business owners{" "}
              <strong className="font-semibold text-ink">
                live visibility
              </strong>{" "}
              into every sale, every agent, and every shop — so cash doesn&apos;t
              walk out the door and stock doesn&apos;t vanish.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-accent px-7 py-4 text-sm font-bold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/35"
              >
                Start free — 30 days on us
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M3 7.5h9M8 3.5l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#how-it-works"
                className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-7 py-4 text-sm font-semibold text-muted transition-colors hover:border-subtle hover:text-ink"
              >
                See how it works
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-subtle"
            >
              {["No setup fees", "Pay via M-Pesa", "Cancel anytime"].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l2.5 2.5L10 4" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Dashboard + floating notification cards (desktop) ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative hidden lg:block"
          >
            <DashboardMockup />

            {floatingCards.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 14, scale: 0.88 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: card.delay,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className={`absolute ${card.pos} z-20 flex items-center gap-3 rounded-2xl border border-border/60 bg-white/97 px-3.5 py-2.5 shadow-2xl ${card.shadow} backdrop-blur-md`}
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${card.iconBg}`}>
                  {card.icon}
                </div>
                <div>
                  <p className="text-[10px] font-medium text-muted">{card.label}</p>
                  <p className={`text-sm font-bold leading-tight ${card.valueColor}`}>{card.value}</p>
                  <p className="text-[10px] text-subtle">{card.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile: dashboard + notification cards strip */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.45 }}
          className="mt-10 lg:hidden"
        >
          {/* Dashboard mockup, slightly smaller on mobile */}
          <div className="mx-auto max-w-sm sm:max-w-md">
            <DashboardMockup />
          </div>

          {/* Horizontal scrolling notification cards strip */}
          <div className="mt-5 -mx-5 px-5">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
              {floatingCards.map((card, i) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 12, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, delay: 0.6 + i * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className={`flex shrink-0 snap-start items-center gap-3 rounded-2xl border border-border/60 bg-white/97 px-3.5 py-2.5 shadow-xl ${card.shadow} backdrop-blur-md`}
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${card.iconBg}`}>
                    {card.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-muted">{card.label}</p>
                    <p className={`text-sm font-bold leading-tight ${card.valueColor}`}>{card.value}</p>
                    <p className="text-[10px] text-subtle">{card.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
