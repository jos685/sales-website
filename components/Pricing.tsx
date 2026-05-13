import { FadeUp, StaggerGrid, StaggerItem } from "@/components/Motion";

const APP_URL = "https://sales-tracker-lovat.vercel.app/register";

const plans = [
  {
    name: "Starter", price: "999", capacity: "3 agents · 3 shops", tagline: "Small team, real results.",
    highlight: false, badge: null,
    features: ["Full sales tracking","Stock management","Live owner dashboard","Cash handover approvals","Commission tracking"],
    locked: ["PDF & Excel export","Reports & analytics","Daily email reports"],
    btnClass: "border border-border text-ink hover:bg-bg transition-colors",
  },
  {
    name: "Growth", price: "1,999", capacity: "10 agents · 5 shops", tagline: "The plan most businesses need.",
    highlight: true, badge: "Most popular",
    features: ["Everything in Starter","PDF & Excel export","Reports & analytics","Daily email reports at 10 PM","Priority support"],
    locked: [],
    btnClass: "bg-accent text-white hover:opacity-90 transition-opacity shadow-lg shadow-accent/30",
  },
  {
    name: "Pro", price: "4,999", capacity: "Unlimited agents & shops", tagline: "No limits. Full scale.",
    highlight: false, badge: null,
    features: ["Everything in Growth","Unlimited agents","Unlimited shops","Advanced analytics","Dedicated support"],
    locked: [],
    btnClass: "border border-border text-ink hover:bg-bg transition-colors",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-6xl px-5">

        <FadeUp className="mb-12 md:mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">Pricing</p>
          <h2 id="pricing-heading" className="text-3xl font-bold tracking-tight text-ink md:text-5xl">
            Start free. Scale as you grow.
          </h2>
          <p className="mt-4 max-w-md text-base text-muted">
            Every plan includes a 30-day free trial. No card required. Pay monthly via M-Pesa.
          </p>
        </FadeUp>

        <StaggerGrid className="grid gap-4 md:grid-cols-3 md:items-start">
          {plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <div
                className={`group relative flex flex-col rounded-2xl border p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:p-8 ${
                  plan.highlight
                    ? "border-accent bg-white ring-2 ring-accent/20 md:scale-[1.03] md:shadow-xl md:shadow-accent/10"
                    : "border-border bg-surface"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-accent px-4 py-1 text-xs font-bold text-white shadow-md">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-5">
                  <h3 className="text-base font-bold text-ink">{plan.name}</h3>
                  <p className="mt-0.5 text-xs text-muted">{plan.capacity}</p>
                </div>

                <div className="mb-2">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-black ${plan.highlight ? "text-accent" : "text-ink"}`}>
                      KSh {plan.price}
                    </span>
                    <span className="text-sm text-muted">/mo</span>
                  </div>
                  <p className="mt-1.5 text-sm text-muted">{plan.tagline}</p>
                </div>

                <div className="my-5 border-t border-border" />

                <ul className="mb-7 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`mt-0.5 flex-shrink-0 ${plan.highlight ? "text-accent" : "text-emerald-500"}`}>
                        <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                  {plan.locked.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-subtle line-through">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 flex-shrink-0 text-subtle">
                        <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block rounded-xl px-6 py-3.5 text-center text-sm font-bold ${plan.btnClass}`}
                >
                  Start free trial
                </a>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <FadeUp delay={0.3}>
          <p className="mt-6 text-center text-xs text-subtle">
            All prices in KES · Monthly billing · M-Pesa accepted · No card required
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
