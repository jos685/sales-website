import { FadeUp, StaggerGrid, StaggerItem } from "@/components/Motion";

const pains = [
  {
    emoji: "💸",
    headline: "Cash goes missing. You find out days later.",
    body: "Your agent collects KSh 50,000 but only KSh 42,000 reaches you. Without a system, you're chasing stories — not facts.",
    borderColor: "border-red-400",
    bg: "bg-red-50",
    iconBg: "bg-red-100",
  },
  {
    emoji: "📦",
    headline: "Stock leaves the shelf. No one knows where.",
    body: "You restock. Then restock again. But you can't tell if it was sold, consumed, or stolen. Every untracked unit is money you'll never see.",
    borderColor: "border-amber-400",
    bg: "bg-amber-50",
    iconBg: "bg-amber-100",
  },
  {
    emoji: "🙈",
    headline: "You don't know which agents are actually performing.",
    body: "Agent leaderboards show sales numbers — not integrity. Without transaction-level visibility, you're rewarding the best storyteller, not the best seller.",
    borderColor: "border-violet-400",
    bg: "bg-violet-50",
    iconBg: "bg-violet-100",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">

        <FadeUp className="mb-12 md:mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
            The problem
          </p>
          <h2 className="max-w-2xl text-3xl font-black leading-tight tracking-tight text-ink md:text-5xl">
            Sound familiar?
          </h2>
          <p className="mt-4 max-w-md text-base text-muted">
            Every business with field agents hits the same wall. Spreadsheets, WhatsApp groups,
            and end-of-day calls are not a system — they&apos;re a prayer.
          </p>
        </FadeUp>

        <StaggerGrid className="grid gap-5 md:grid-cols-3">
          {pains.map((pain) => (
            <StaggerItem key={pain.headline}>
              <div
                className={`group h-full rounded-2xl border border-border border-l-4 ${pain.borderColor} ${pain.bg} p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg`}
              >
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${pain.iconBg}`}>
                  {pain.emoji}
                </div>
                <h3 className="mb-2.5 text-[15px] font-bold leading-snug text-ink">
                  {pain.headline}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{pain.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <FadeUp delay={0.25} className="mt-12 text-center">
          <p className="text-base font-semibold text-ink">
            There&apos;s a better way.{" "}
            <a
              href="#how-it-works"
              className="text-accent underline underline-offset-4 transition-all hover:no-underline"
            >
              See how it works →
            </a>
          </p>
        </FadeUp>

      </div>
    </section>
  );
}
