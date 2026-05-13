import { ScalePop } from "@/components/Motion";

const APP_URL = "https://sales-tracker-lovat.vercel.app/register";

export default function CallToAction() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-6xl px-5">
        <ScalePop>
          <div className="relative overflow-hidden rounded-3xl bg-accent px-6 py-16 text-center sm:px-10 md:px-20 md:py-24">

            {/* dot pattern */}
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            {/* glow */}
            <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-white/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 right-1/4 h-48 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/70">
                Join 50+ businesses in Kenya
              </p>

              <h2
                id="cta-heading"
                className="mx-auto max-w-2xl text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl"
              >
                Right now, someone is selling on your behalf.{" "}
                <span className="text-white/80">Do you know the number?</span>
              </h2>

              <p className="mx-auto mt-6 max-w-lg text-base text-white/80 md:text-lg">
                Your first 30 days are completely free. Setup takes minutes.
                Pay only when you&apos;re convinced — via M-Pesa.
              </p>

              <div className="mt-10">
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-white px-8 py-4 text-sm font-bold text-accent shadow-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl md:px-10 md:text-base"
                >
                  Start your free 30-day trial
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-4 text-sm text-white/60">
                <span>No setup fees</span>
                <span className="hidden sm:block">·</span>
                <span>Pay via M-Pesa</span>
                <span className="hidden sm:block">·</span>
                <span>Cancel anytime</span>
              </div>
            </div>

          </div>
        </ScalePop>
      </div>
    </section>
  );
}
