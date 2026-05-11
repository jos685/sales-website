import { FadeUp, Counter } from "@/components/Motion";

const stats = [
  { to: 50,    suffix: "+",  label: "Businesses in Kenya",  color: "text-orange-500" },
  { to: 200,   suffix: "+",  label: "Agents tracked",       color: "text-blue-500"   },
  { to: 10000, suffix: "+",  label: "Transactions recorded",color: "text-emerald-500"},
  { to: 99.9,  suffix: "%",  label: "Platform uptime",      color: "text-violet-500" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-14">
        <FadeUp>
          <p className="mb-10 text-center text-xs font-semibold uppercase tracking-widest text-muted">
            Trusted by businesses across Kenya
          </p>
        </FadeUp>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.1}>
              <div className="text-center">
                <p className={`text-3xl font-black md:text-4xl ${s.color}`}>
                  <Counter to={s.to} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xs text-muted md:text-sm">{s.label}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.4}>
          <p className="mt-10 text-center text-xs text-subtle">
            Subscription payments via M-Pesa — no bank card required
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
