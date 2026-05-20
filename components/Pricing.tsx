import { FadeUp, StaggerGrid, StaggerItem } from "@/components/Motion";

const APP_URL = "https://sales-tracker-lovat.vercel.app/register";
const WA_URL   = "https://wa.me/254783069010?text=" + encodeURIComponent("Hi! I'd like to discuss a custom QASHUP package for my business.");

const plans = [
  {
    name: "STARTER", price: "399", capacity: "3 agents · 3 shops",
    tagline: "Small team, real results.",
    highlight: false, badge: null, custom: false,
    features: ["Full sales tracking","Stock management","Live owner dashboard","Cash handover approvals","Commission tracking"],
    locked: ["PDF & Excel export","Reports & analytics","Daily email reports"],
    btnLabel: "Start free trial",
    btnHref: APP_URL,
    btnClass: "border border-border text-ink hover:bg-bg transition-colors",
  },
  {
    name: "GROWTH", price: "999", capacity: "10 agents · 5 shops",
    tagline: "The plan most businesses need.",
    highlight: true, badge: "Most popular", custom: false,
    features: ["Everything in Starter","PDF & Excel export","Reports & analytics","Daily email reports at 10 PM","Priority support"],
    locked: [],
    btnLabel: "Start free trial",
    btnHref: APP_URL,
    btnClass: "bg-accent text-white hover:opacity-90 transition-opacity shadow-lg shadow-accent/30",
  },
  {
    name: "PRO", price: null, capacity: null,
    tagline: null,
    highlight: false, badge: null, custom: true,
    features: ["Everything in Growth","Agents & shops set to your needs","Dedicated account manager"],
    locked: [],
    btnLabel: "Chat with us on WhatsApp",
    btnHref: WA_URL,
    btnClass: "bg-[#25D366] text-white hover:opacity-90 transition-opacity shadow-lg shadow-[#25D366]/30",
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
              {plan.custom ? (
                /* ── Custom Package card ── */
                <div className="group relative flex flex-col rounded-2xl border border-border bg-surface p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-8">
                  {/* decorative glow */}
                  <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-[#f97316]/20 via-transparent to-[#06b6d4]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="mb-5">
                    <h3 className="text-base font-bold text-ink">{plan.name}</h3>
                    <p className="mt-0.5 text-xs text-muted">Any size · Built around your business</p>
                  </div>

                  {/* price block */}
                  <div className="mb-2">
                    <span className="text-3xl font-black text-ink">Let&apos;s talk</span>
                    <p className="mt-1.5 text-sm text-muted">Built around your exact needs.</p>
                  </div>

                  <div className="my-5 border-t border-white/10" />

                  <ul className="mb-7 flex-1 space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 flex-shrink-0 text-[#25D366]">
                          <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* WhatsApp CTA */}
                  <a
                    href={plan.btnHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-center text-sm font-bold ${plan.btnClass}`}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
                      <span className="relative h-2 w-2 rounded-full bg-white" />
                    </span>
                    {plan.btnLabel}
                  </a>

                  {/* compact contact row */}
                  <div className="mt-4 border-t border-border pt-4 space-y-1.5">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted mb-2">Or reach us directly</p>
                    <a href="tel:+254768131905" className="flex items-center gap-2 text-xs text-muted hover:text-ink transition-colors">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 text-[#06b6d4]"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      0768 131 905
                    </a>
                    <a href="tel:+254791408944" className="flex items-center gap-2 text-xs text-muted hover:text-ink transition-colors">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 text-[#06b6d4]"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      0791 408 944
                    </a>
                    <a href="mailto:epicsoftwaredesigners@gmail.com" className="flex items-center gap-2 text-xs text-muted hover:text-ink transition-colors">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 text-[#f97316]"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                      epicsoftwaredesigners@gmail.com
                    </a>
                  </div>
                </div>
              ) : (
                /* ── Standard plan card ── */
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
                    href={plan.btnHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block rounded-xl px-6 py-3.5 text-center text-sm font-bold ${plan.btnClass}`}
                  >
                    {plan.btnLabel}
                  </a>
                </div>
              )}
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
