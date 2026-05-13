import { FadeUp, StaggerGrid, StaggerItem } from "@/components/Motion";

const features = [
  {
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/></svg>),
    title: "Real-time sync, always",
    body: "The moment an agent records a sale, you see it. No refresh, no delay — every transaction updates live across every portal.",
    borderColor: "border-l-orange-400",
    iconBg: "bg-orange-500/15",
  },
  {
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M1 6s4-2 11-2 11 2 11 2" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/><path d="M23 6l-2 12H3L1 6" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
    title: "Sells even offline",
    body: "No internet? No problem. Agents and shops keep recording sales. Everything syncs the moment connectivity returns.",
    borderColor: "border-l-blue-400",
    iconBg: "bg-blue-500/15",
  },
  {
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke="#10b981" strokeWidth="2"/><path d="M2 10h20" stroke="#10b981" strokeWidth="2"/><path d="M6 15h4M14 15h4" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/></svg>),
    title: "Zero cash disputes",
    body: "Agents submit cash handover requests. You approve. A transparent, timestamped record is created every time.",
    borderColor: "border-l-emerald-400",
    iconBg: "bg-emerald-500/15",
  },
  {
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" stroke="#8b5cf6" strokeWidth="2" strokeLinejoin="round"/></svg>),
    title: "Commissions that motivate",
    body: "Agents see their commissions live. Daily targets and team rankings create natural competition — your team pushes harder without you saying a word.",
    borderColor: "border-l-violet-400",
    iconBg: "bg-violet-500/15",
  },
  {
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke="#f59e0b" strokeWidth="2"/><path d="M7 8h10M7 12h6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/><circle cx="18" cy="16" r="3" fill="#f59e0b"/><path d="M16.5 16l1 1 1.5-1.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>),
    title: "Reports while you sleep",
    body: "Every night at 10 PM, a full business summary lands in your inbox — revenue, top agents, stock alerts, and credit balances.",
    borderColor: "border-l-amber-400",
    iconBg: "bg-amber-500/15",
  },
  {
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="5" y="2" width="14" height="20" rx="3" stroke="#ec4899" strokeWidth="2"/><path d="M9 7h6M9 11h4" stroke="#ec4899" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="17" r="1.5" fill="#ec4899"/></svg>),
    title: "Built for M-Pesa",
    body: "Subscribe and pay directly via M-Pesa — no bank card, no international fees. Built entirely for the Kenyan market.",
    borderColor: "border-l-pink-400",
    iconBg: "bg-pink-500/15",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-28" style={{ background: "#0a1f44" }} aria-labelledby="features-heading">
      <div className="mx-auto max-w-6xl px-5">

        <FadeUp className="mb-12 md:mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-orange-400">
            Why JS Sales Tracker
          </p>
          <h2 id="features-heading" className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Built for how Kenyan<br className="hidden sm:block" /> businesses actually work.
          </h2>
          <p className="mt-4 max-w-lg text-base text-slate-300">
            Not generic SaaS from abroad. Every feature exists because a real business owner in Kenya needed it.
          </p>
        </FadeUp>

        <StaggerGrid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <div className={`group flex h-full flex-col rounded-2xl border-l-4 ${f.borderColor} border-t border-r border-b border-white/8 bg-white/6 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-xl hover:shadow-black/30 md:p-7`}>
                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${f.iconBg}`}>
                  {f.icon}
                </div>
                <h3 className="mb-2 text-base font-bold text-white">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-300">{f.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>

      </div>
    </section>
  );
}
