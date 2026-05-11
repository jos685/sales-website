import Image from "next/image";
import { FadeUp, SlideIn, ScalePop } from "@/components/Motion";

const portals = [
  {
    key: "owner", label: "Owner Portal",
    tagline: "You're the boss. Act like it.",
    description: "Every sale, every agent, every shilling — visible from your phone the moment it happens. No more guessing. No more end-of-day surprises.",
    file: "/screenshots/owner.png", alt: "Epic Sales Tracker owner portal dashboard",
    lightBg: "bg-blue-50", borderColor: "border-blue-100", tagStyle: "bg-blue-600 text-white",
    checkColor: "text-blue-600", chipStyle: "bg-blue-50 text-blue-700 border-blue-200", circleBg: "bg-blue-400",
    features: ["Real-time revenue & sales dashboard","Manage all agents and shops from one place","Approve cash handovers — no more disputes","Daily business summary to your email at 10 PM","Low stock alerts before you run out"],
    metric: { value: "100%", label: "Visibility over your business" },
  },
  {
    key: "shop", label: "Shop Portal",
    tagline: "Your shop, running like a machine.",
    description: "A full POS terminal purpose-built for physical shops. Multiple agents, live stock, and every transaction synced to the owner the second it happens.",
    file: "/screenshots/shop.png", alt: "Epic Shop Tracker POS terminal",
    lightBg: "bg-orange-50", borderColor: "border-orange-100", tagStyle: "bg-orange-500 text-white",
    checkColor: "text-orange-500", chipStyle: "bg-orange-50 text-orange-700 border-orange-200", circleBg: "bg-orange-400",
    features: ["Barcode scanner — scan, sell, done","Multiple agents assigned to one shop","Live stock levels at a glance","Request stock from the owner in one tap","Works offline — syncs when back online"],
    metric: { value: "0 sec", label: "Delay between sale & owner visibility" },
  },
  {
    key: "agent", label: "Agent Portal",
    tagline: "Sell more. Know exactly where you stand.",
    description: "Agents see their daily target, their rank, and their commissions live. That alone changes performance — no manager needed to push them.",
    file: "/screenshots/agent.png", alt: "Epic Agent Tracker field agent portal",
    lightBg: "bg-amber-50", borderColor: "border-amber-100", tagStyle: "bg-amber-500 text-white",
    checkColor: "text-amber-500", chipStyle: "bg-amber-50 text-amber-700 border-amber-200", circleBg: "bg-amber-400",
    features: ["Scan & sell — record a sale in seconds","See daily target and team ranking live","Commission tracker — always know your earnings","Submit cash handovers with one request","Works offline in the field"],
    metric: { value: "↑ 40%", label: "Average agent sales increase" },
  },
];

export default function LoginScreenshots() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="portals-heading">
      <div className="mx-auto max-w-6xl px-5">

        <FadeUp className="mb-12 md:mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">The platform</p>
          <h2 id="portals-heading" className="text-3xl font-bold tracking-tight text-ink md:text-5xl">
            One platform. Three portals.
          </h2>
          <p className="mt-4 max-w-lg text-base text-muted">
            Every user gets a purpose-built experience. Owners command. Shops sell. Agents hustle.
          </p>
        </FadeUp>

        <div className="space-y-5">
          {portals.map((p, i) => (
            <article
              key={p.key}
              className={`overflow-hidden rounded-2xl border ${p.borderColor} bg-surface shadow-sm transition-shadow duration-300 hover:shadow-md`}
            >
              <div className="flex flex-col lg:grid lg:grid-cols-2">

                {/* content */}
                <SlideIn from={i % 2 === 0 ? "left" : "right"} delay={0.1} className={`flex flex-col justify-between p-7 md:p-10 ${i % 2 !== 0 ? "lg:order-2" : ""}`}>
                  <div>
                    <span className={`mb-5 inline-block rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-widest ${p.tagStyle}`}>
                      {p.label}
                    </span>
                    <h3 className="mb-3 text-xl font-bold leading-snug text-ink md:text-2xl lg:text-3xl">
                      {p.tagline}
                    </h3>
                    <p className="mb-6 text-sm leading-relaxed text-muted md:text-base">{p.description}</p>
                    <ul className="mb-7 space-y-2.5">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-ink">
                          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" className={`mt-0.5 flex-shrink-0 ${p.checkColor}`}>
                            <path d="M3 9l4.5 4.5L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`inline-flex w-fit flex-col rounded-xl border px-5 py-3 ${p.chipStyle}`}>
                    <span className="text-xl font-black md:text-2xl">{p.metric.value}</span>
                    <span className="text-xs font-medium opacity-80">{p.metric.label}</span>
                  </div>
                </SlideIn>

                {/* screenshot */}
                <ScalePop delay={0.2} className={`relative flex items-center justify-center overflow-hidden p-4 sm:p-6 md:p-8 min-h-64 sm:min-h-80 md:min-h-96 lg:min-h-[440px] ${p.lightBg} ${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                  <div className={`pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full ${p.circleBg} opacity-10`} />
                  <div className={`pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full ${p.circleBg} opacity-10`} />
                  <div className="relative w-full overflow-hidden rounded-xl border border-white/60 shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                    <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
                      <Image src={p.file} alt={p.alt} fill className="object-cover object-top" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw" />
                    </div>
                  </div>
                </ScalePop>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
