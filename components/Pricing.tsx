import { FadeUp, StaggerGrid, StaggerItem } from "@/components/Motion";

const APP_URL = "https://owner.qashup.co.ke/register";
const WA_URL  = "https://wa.me/254783069010?text=" + encodeURIComponent("Hi! I'd like to discuss a custom QASHUP package for my business.");

const Check = ({ accent }: { accent?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`mt-0.5 flex-shrink-0 ${accent ? "text-accent" : "text-emerald-500"}`}>
    <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Cross = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 flex-shrink-0 text-subtle">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const allFeatures = [
  "Full sales tracking",
  "Stock management",
  "Live owner dashboard",
  "Cash handover approvals",
  "Commission tracking",
  "Customer messaging",
  "Camera scan (QR / SKU)",
  "PDF & Excel export",
  "Reports & analytics",
  "Daily email reports at 10 PM",
  "Priority support",
];

const starterIncluded = new Set([
  "Full sales tracking",
  "Stock management",
  "Live owner dashboard",
  "Cash handover approvals",
  "Commission tracking",
  "Customer messaging",
]);

const growthIncluded = new Set(allFeatures);

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
            Every plan includes a 21-day free trial. No card required. Pay via M-Pesa.
          </p>
        </FadeUp>

        <StaggerGrid className="grid gap-4 md:grid-cols-3 md:items-start">

          {/* ── Starter ── */}
          <StaggerItem>
            <div className="relative flex flex-col rounded-2xl border border-border bg-surface p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:p-8">

              <div className="mb-4">
                <h3 className="text-base font-bold text-ink">Mkulima Mdogo</h3>
                <p className="mt-0.5 text-xs text-muted">Up to 3 agents · Up to 2 shops</p>
              </div>

              {/* primary price */}
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-ink">KSh 499</span>
                <span className="text-sm text-muted">/mo</span>
              </div>
              <p className="mt-1.5 text-sm text-muted">Small team, real results.</p>

              {/* daily / weekly pills */}
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4" stroke="#16a34a" strokeWidth="1.4"/><path d="M5 3v2.5l1.5 1" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  KSh 25 / day
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4" stroke="#2563eb" strokeWidth="1.4"/><path d="M5 3v2.5l1.5 1" stroke="#2563eb" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  KSh 165 / week
                </span>
              </div>
              <p className="mt-1.5 text-[10px] text-muted">Flexible billing — daily &amp; weekly available on this plan only.</p>

              <div className="my-5 border-t border-border" />

              <ul className="mb-7 flex-1 space-y-2.5">
                {allFeatures.map((f) => {
                  const included = starterIncluded.has(f);
                  return (
                    <li key={f} className={`flex items-start gap-2.5 text-sm ${included ? "text-ink" : "text-subtle line-through"}`}>
                      {included ? <Check /> : <Cross />}
                      {f}
                    </li>
                  );
                })}
              </ul>

              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-border px-6 py-3.5 text-center text-sm font-bold text-ink transition-colors hover:bg-bg"
              >
                Start free trial
              </a>
            </div>
          </StaggerItem>

          {/* ── Growth ── */}
          <StaggerItem>
            <div className="relative flex flex-col rounded-2xl border border-accent bg-white p-7 shadow-sm ring-2 ring-accent/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:scale-[1.03] md:p-8 md:shadow-xl md:shadow-accent/10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-accent px-4 py-1 text-xs font-bold text-white shadow-md">Most popular</span>
              </div>

              <div className="mb-4">
                <h3 className="text-base font-bold text-ink">Bossy</h3>
                <p className="mt-0.5 text-xs text-muted">Up to 10 agents · Up to 5 shops</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-accent">KSh 1049</span>
                <span className="text-sm text-muted">/mo</span>
              </div>
              <p className="mt-1.5 text-sm text-muted">The plan most businesses need.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4" stroke="#2563eb" strokeWidth="1.4"/><path d="M5 3v2.5l1.5 1" stroke="#2563eb" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  KSh 300 / week
                </span>
              </div>

              <div className="my-5 border-t border-border" />

              <ul className="mb-7 flex-1 space-y-2.5">
                {allFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                    <Check accent />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl bg-accent px-6 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-accent/30 transition-opacity hover:opacity-90"
              >
                Start free trial
              </a>
            </div>
          </StaggerItem>

          {/* ── Pro ── */}
          <StaggerItem>
            <div className="group relative flex flex-col rounded-2xl border border-border bg-surface p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-8">
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-[#f97316]/20 via-transparent to-[#06b6d4]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="mb-4">
                <h3 className="text-base font-bold text-ink">Custom</h3>
                <p className="mt-0.5 text-xs text-muted">Agents &amp; shops defined per agreement</p>
              </div>

              <div className="mb-2">
                <span className="text-3xl font-black text-ink">Let&apos;s talk</span>
                <p className="mt-1.5 text-sm text-muted">A package built around your exact needs.</p>
              </div>

              <div className="my-5 border-t border-border" />

              <ul className="mb-7 flex-1 space-y-2.5">
                {allFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                    <Check />
                    {f}
                  </li>
                ))}
                <li className="flex items-start gap-2.5 text-sm text-ink">
                  <Check />
                  Dedicated account manager
                </li>
              </ul>

              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-[#25D366]/30 transition-opacity hover:opacity-90"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
                  <span className="relative h-2 w-2 rounded-full bg-white" />
                </span>
                Chat with us on WhatsApp
              </a>

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
          </StaggerItem>

        </StaggerGrid>

        <FadeUp delay={0.3}>
          <p className="mt-6 text-center text-xs text-subtle">
            All prices in KES · M-Pesa accepted · No card required · Daily &amp; weekly billing on Starter
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
