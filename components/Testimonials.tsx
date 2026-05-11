import { FadeUp, StaggerGrid, StaggerItem } from "@/components/Motion";

const testimonials = [
  {
    quote: "We reduced stock loss by 40% in the first month. I used to visit every shop to know what was happening. Now I open the dashboard from my phone.",
    name: "David Omondi", role: "Electronics Distributor", location: "Nairobi",
    initials: "DO", color: "bg-orange-100 text-orange-700",
  },
  {
    quote: "Managing 3 shops and 8 agents used to mean daily phone calls and guesswork. Now every sale is visible, and cash handovers have eliminated every dispute we used to have.",
    name: "Fatuma Atieno", role: "Retail Shop Owner", location: "Kisumu",
    initials: "FA", color: "bg-blue-100 text-blue-700",
  },
  {
    quote: "My agents can see their own commissions and targets. That alone changed how my team performs — without me having to push anyone.",
    name: "Samuel Kamau", role: "FMCG Distributor", location: "Nakuru",
    initials: "SK", color: "bg-amber-100 text-amber-700",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#f4f4f5] py-20 md:py-28" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-6xl px-5">

        <FadeUp className="mb-12 md:mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">From business owners</p>
          <h2 id="testimonials-heading" className="text-3xl font-bold tracking-tight text-ink md:text-5xl">
            Real results.
          </h2>
        </FadeUp>

        <StaggerGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <div className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div>
                  <div className="mb-4 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#f97316">
                        <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z"/>
                      </svg>
                    ))}
                  </div>
                  <blockquote className="mb-7 text-sm leading-relaxed text-muted">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>
                <div className="flex items-center gap-3 border-t border-border pt-5">
                  <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-transform duration-300 group-hover:scale-110 ${t.color}`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                    <p className="text-xs text-subtle">{t.role} · {t.location}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>

      </div>
    </section>
  );
}
