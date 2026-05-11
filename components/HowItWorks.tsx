import { FadeUp, StaggerGrid, StaggerItem } from "@/components/Motion";

const steps = [
  {
    n: "01",
    icon: (<svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M11 2C6.03 2 2 6.03 2 11s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9Z" stroke="#f97316" strokeWidth="1.6"/><path d="M11 7v4l3 3" stroke="#f97316" strokeWidth="1.6" strokeLinecap="round"/></svg>),
    title: "Get started in minutes",
    body: "Create your account and start tracking immediately. No setup, no IT team, no tech skills required.",
    chip: "Free 30-day trial",
  },
  {
    n: "02",
    icon: (<svg width="20" height="20" viewBox="0 0 22 22" fill="none"><circle cx="8" cy="8" r="3.5" stroke="#f97316" strokeWidth="1.6"/><circle cx="15" cy="14" r="3.5" stroke="#f97316" strokeWidth="1.6"/><path d="M11 8h3M8 14h-3" stroke="#f97316" strokeWidth="1.6" strokeLinecap="round"/></svg>),
    title: "Add agents & shops",
    body: "Create your team in seconds. Assign stock to each agent and shop. Stay in control of every unit.",
    chip: "Agents & shops",
  },
  {
    n: "03",
    icon: (<svg width="20" height="20" viewBox="0 0 22 22" fill="none"><rect x="5" y="3" width="12" height="16" rx="2" stroke="#f97316" strokeWidth="1.6"/><path d="M8 7h6M8 11h4" stroke="#f97316" strokeWidth="1.6" strokeLinecap="round"/><circle cx="15" cy="15" r="3" fill="#f97316"/><path d="M13.5 15l1 1 2-1.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
    title: "Record sales instantly",
    body: "Agents scan and sell in seconds — online or offline. Every transaction syncs to your dashboard live.",
    chip: "Works offline",
  },
  {
    n: "04",
    icon: (<svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M3 16l5-5 4 4 7-8" stroke="#f97316" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><circle cx="19" cy="6" r="2" fill="#f97316"/></svg>),
    title: "See everything clearly",
    body: "Revenue, stock, commissions, agent performance — one dashboard. A full report lands in your inbox every night.",
    chip: "Daily email reports",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28" style={{ background: "#0a1f44" }} aria-labelledby="hiw-heading">
      <div className="mx-auto max-w-6xl px-5">

        <FadeUp className="mb-12 md:mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-orange-400">How it works</p>
          <h2 id="hiw-heading" className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Up and running today.
          </h2>
          <p className="mt-4 max-w-lg text-base text-slate-300">
            Start tracking every sale — even if you have zero tech experience. Your first 30 days are free.
          </p>
        </FadeUp>

        <StaggerGrid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <StaggerItem key={s.n}>
              <div className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/6 p-6 transition-all duration-300 hover:border-orange-500/40 hover:bg-white/10 md:p-7">
                {i < steps.length - 1 && (
                  <div className="absolute -right-3 top-9 hidden text-blue-300/30 lg:block">→</div>
                )}
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-500/25 bg-orange-500/12 transition-transform duration-300 group-hover:scale-110">
                    {s.icon}
                  </div>
                  <span className="text-3xl font-black text-white/10">{s.n}</span>
                </div>
                <h3 className="mb-2 text-base font-semibold text-white">{s.title}</h3>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-300">{s.body}</p>
                <span className="inline-block self-start rounded-full border border-orange-500/30 bg-orange-500/12 px-3 py-1 text-xs font-medium text-orange-300">
                  {s.chip}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>

      </div>
    </section>
  );
}
