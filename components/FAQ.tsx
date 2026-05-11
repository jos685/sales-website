"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/components/Motion";

const faqs = [
  {
    q: "How do I know agents won't cheat the system?",
    a: "Every transaction is logged with a timestamp, the agent's name, and the exact amount — and only the owner can approve cash handovers. Agents cannot edit or delete records. If the numbers don't match, the system flags it before cash ever leaves the shop.",
  },
  {
    q: "What happens if there's no internet?",
    a: "Agents can continue recording sales in offline mode. All transactions are stored locally and automatically sync the moment connectivity is restored. No sale is ever lost.",
  },
  {
    q: "How does the 30-day free trial work?",
    a: "Sign up, add your agents and shops, and use every feature — completely free for 30 days. No credit card required. At the end of the trial, choose the plan that fits your business size and pay via M-Pesa.",
  },
  {
    q: "Can I manage multiple shops from one account?",
    a: "Yes. The Owner portal gives you a single dashboard for all your shops. You see each shop's sales, stock levels, and agent performance side by side. The Growth plan supports up to 5 shops; Pro supports unlimited.",
  },
  {
    q: "How are agent commissions calculated?",
    a: "You set your own commission rates — per product or as a flat percentage. The system calculates commissions automatically based on verified sales. No manual math, no disputes at the end of the month.",
  },
  {
    q: "Is my business data safe?",
    a: "Your data is encrypted in transit and at rest using industry-standard security. We run regular backups and your data is yours — we never sell it or share it with third parties.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-5">

        <FadeUp className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">FAQ</p>
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-[44px]">
            Questions you&apos;re probably thinking
          </h2>
          <p className="mt-4 text-base text-muted">Clear answers, no fluff.</p>
        </FadeUp>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.42, delay: i * 0.055 }}
                className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${
                  isOpen ? "border-accent/30 bg-white shadow-sm" : "border-border bg-surface"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4 text-sm font-semibold text-ink sm:text-[15px]">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.22 }}
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen ? "bg-accent text-white" : "bg-accent/10 text-accent"
                    }`}
                  >
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M6.5 1.5v10M1.5 6.5h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
                    >
                      <div className="border-t border-border/60 px-6 pb-5 pt-4">
                        <p className="text-sm leading-relaxed text-muted">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
