"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import RevenueChart from "@/components/RevenueChart";

function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return value;
}

const agents = [
  { name: "Joseph O.", id: "AGT-0001", sales: "KSh 124,500", rank: 1, online: true,  color: "bg-orange-500", initials: "J" },
  { name: "Amina K.",  id: "AGT-0002", sales: "KSh 98,200",  rank: 2, online: true,  color: "bg-violet-500", initials: "A" },
  { name: "Salah M.",  id: "AGT-0003", sales: "KSh 76,400",  rank: 3, online: false, color: "bg-blue-500",   initials: "B" },
];

const activityFeed = [
  { label: "Kiprono K.", action: "sold KSh 3,200",    time: "2 min ago", dot: "bg-emerald-400" },
  { label: "Amina K.",  action: "cash handover sent", time: "5 min ago", dot: "bg-blue-400"    },
  { label: "Shop B",    action: "low stock flagged",  time: "8 min ago", dot: "bg-amber-400"   },
];

export default function DashboardMockup() {
  const revenue     = useCountUp(460, 1400);
  const salesCount  = useCountUp(24,  1200);
  const receivables = useCountUp(8900, 1600);

  return (
    <div className="relative mx-auto max-w-5xl">
      {/* ambient glow behind the card */}
      <div className="pointer-events-none absolute -inset-8 rounded-3xl bg-orange-500/8 blur-3xl" />
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-white/5 to-transparent" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl shadow-black/60">

        {/* ── Browser chrome ── */}
        <div className="flex items-center justify-between border-b border-white/6 bg-[#09090b] px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
          </div>
          <span className="hidden font-mono text-[10px] text-zinc-500 sm:block">
            EpicSalesTracker · Owner Dashboard
          </span>
          <div className="rounded border border-white/8 px-2 py-0.5 text-[10px] font-semibold text-zinc-500">
            Code: <span className="text-zinc-300">945911</span>
          </div>
        </div>

        <div className="p-4 md:p-5">

          {/* ── Greeting ── */}
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-zinc-400">Good morning, Joseph</p>
              <p className="text-sm font-semibold text-white md:text-base">
                Live overview of your business
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-medium text-emerald-400">3 online</span>
            </div>
          </div>

          {/* ── AI Insight banner ── */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="mb-3 flex items-center gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 px-3 py-2"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-amber-500/20">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 1L9 8.5H1L5 1Z" fill="#f59e0b" />
                <path d="M5 4.5V6" stroke="#0d1117" strokeWidth="1.3" strokeLinecap="round" />
                <circle cx="5" cy="7.2" r="0.55" fill="#0d1117" />
              </svg>
            </span>
            <p className="text-[10px] leading-relaxed text-amber-300/90">
              <span className="font-semibold">AI Insight:</span> Cash variance of KSh&nbsp;4,200 flagged at Shop&nbsp;B — review recommended
            </p>
            <span className="ml-auto shrink-0 cursor-pointer rounded-md bg-amber-500/20 px-2 py-0.5 text-[9px] font-semibold text-amber-400 hover:bg-amber-500/30">
              Review
            </span>
          </motion.div>

          {/* ── KPI cards ── */}
          <div className="mb-3 grid grid-cols-3 gap-2 sm:grid-cols-5">

            {/* Revenue — glowing accent card */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="relative col-span-1 overflow-hidden rounded-xl border border-orange-500/30 bg-gradient-to-br from-orange-500/14 to-orange-500/4 p-2.5 md:p-3"
              style={{ boxShadow: "0 0 22px rgba(249,115,22,0.14), inset 0 1px 0 rgba(249,115,22,0.12)" }}
            >
              <p className="mb-1 text-[9px] font-medium uppercase tracking-wider text-orange-400/70 md:text-[10px]">Revenue</p>
              <p className="text-xs font-bold leading-tight text-orange-400 md:text-sm">
                KSh {revenue}k
              </p>
              <p className="mt-0.5 hidden text-[9px] text-orange-400/55 sm:block">+12% this week</p>
            </motion.div>

            {/* Sales Today */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.4 }}
              className="rounded-xl border border-white/6 bg-white/3 p-2.5 md:p-3"
            >
              <p className="mb-1 text-[9px] font-medium uppercase tracking-wider text-zinc-400 md:text-[10px]">Sales Today</p>
              <p className="text-xs font-bold leading-tight text-white md:text-sm">{salesCount}</p>
              <p className="mt-0.5 hidden text-[9px] text-zinc-400 sm:block">transactions</p>
            </motion.div>

            {/* Live Agents */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.54, duration: 0.4 }}
              className="rounded-xl border border-white/6 bg-white/3 p-2.5 md:p-3"
            >
              <p className="mb-1 text-[9px] font-medium uppercase tracking-wider text-zinc-400 md:text-[10px]">Live Agents</p>
              <p className="text-xs font-bold leading-tight text-white md:text-sm">3 / 10</p>
              <p className="mt-0.5 hidden text-[9px] text-zinc-400 sm:block">online now</p>
            </motion.div>

            {/* Receivables */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.66, duration: 0.4 }}
              className="rounded-xl border border-white/6 bg-white/3 p-2.5 md:p-3"
            >
              <p className="mb-1 text-[9px] font-medium uppercase tracking-wider text-zinc-400 md:text-[10px]">Receivables</p>
              <p className="text-xs font-bold leading-tight text-white md:text-sm">
                KSh {(receivables / 1000).toFixed(1)}k
              </p>
              <p className="mt-0.5 hidden text-[9px] text-zinc-400 sm:block">outstanding</p>
            </motion.div>

            {/* Stock — amber warning tint */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.78, duration: 0.4 }}
              className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-2.5 md:p-3"
            >
              <p className="mb-1 text-[9px] font-medium uppercase tracking-wider text-amber-400/60 md:text-[10px]">Stock</p>
              <p className="text-xs font-bold leading-tight text-amber-400 md:text-sm">14 items</p>
              <p className="mt-0.5 hidden text-[9px] text-amber-400/55 sm:block">2 low stock</p>
            </motion.div>
          </div>

          {/* ── Chart + Agents ── */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

            {/* Revenue chart */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              className="rounded-xl border border-white/6 bg-[#09090b] p-3 md:p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold text-white">Weekly Revenue</p>
                <span className="text-[10px] text-zinc-400">This week</span>
              </div>
              <RevenueChart />
            </motion.div>

            {/* Top agents + activity feed */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.5 }}
              className="rounded-xl border border-white/6 bg-[#09090b] p-3 md:p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold text-white">Top Agents</p>
                <span className="cursor-pointer text-[10px] text-zinc-400 hover:text-zinc-200">view all</span>
              </div>

              <ul className="space-y-2.5">
                {agents.map((a) => (
                  <li key={a.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 text-center text-[10px] text-zinc-500">{a.rank}</span>
                      <div className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${a.color} text-[10px] font-bold text-white`}>
                        {a.initials}
                        {a.online && (
                          <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-[#09090b] bg-emerald-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-medium leading-none text-white">{a.name}</p>
                        <p className="hidden text-[10px] text-zinc-400 sm:block">{a.id}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-white">{a.sales}</span>
                  </li>
                ))}
              </ul>

              {/* Activity feed */}
              <div className="mt-3 border-t border-white/5 pt-2.5">
                <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-wider text-zinc-500">
                  Recent Activity
                </p>
                <div className="space-y-1.5">
                  {activityFeed.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + i * 0.15, duration: 0.35 }}
                      className="flex items-center gap-1.5"
                    >
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${item.dot}`} />
                      <span className="text-[9px] text-zinc-400">
                        <span className="font-medium text-zinc-200">{item.label}</span> {item.action}
                      </span>
                      <span className="ml-auto shrink-0 text-[9px] text-zinc-500">{item.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
