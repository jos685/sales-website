"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Table of contents                                                  */
/* ------------------------------------------------------------------ */

const TOC = [
  { id: "section-1",  label: "Acceptance of Terms" },
  { id: "section-2",  label: "Eligibility & Account" },
  { id: "section-3",  label: "Subscriptions & Trial" },
  { id: "section-4",  label: "Acceptable Use" },
  { id: "section-5",  label: "Data Ownership" },
  { id: "section-6",  label: "Intellectual Property" },
  { id: "section-7",  label: "Third-Party Services" },
  { id: "section-8",  label: "Availability & Support" },
  { id: "section-9",  label: "Warranties & Liability" },
  { id: "section-10", label: "Termination" },
  { id: "section-11", label: "Governing Law" },
  { id: "section-12", label: "Changes & Contact" },
];

const ease = [0.21, 0.47, 0.32, 0.98] as const;

/* ------------------------------------------------------------------ */
/*  Typographic primitives                                             */
/* ------------------------------------------------------------------ */

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm leading-relaxed text-slate-300 sm:text-[15px]">
    {children}
  </p>
);

const B = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-semibold text-white">{children}</strong>
);

const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="space-y-2.5 pl-1 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
    {children}
  </ul>
);

const OL = ({ children }: { children: React.ReactNode }) => (
  <ol className="space-y-3 pl-1 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
    {children}
  </ol>
);

const Li = ({ children }: { children: React.ReactNode }) => (
  <li className="relative pl-5">
    <span className="absolute left-0 top-[0.55em] h-1.5 w-1.5 rounded-full bg-accent" />
    {children}
  </li>
);

const LiNum = ({
  n,
  children,
}: {
  n: number;
  children: React.ReactNode;
}) => (
  <li className="relative pl-8">
    <span className="absolute left-0 top-0 flex h-5 w-5 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-[10px] font-bold text-accent">
      {n}
    </span>
    {children}
  </li>
);

/* ------------------------------------------------------------------ */
/*  Section wrapper                                                    */
/* ------------------------------------------------------------------ */

function Section({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={`section-${number}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35, ease }}
      className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20 sm:p-8"
    >
      <div className="mb-4 flex items-start gap-3 sm:gap-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/40 bg-accent/10 text-xs font-black text-accent sm:h-9 sm:w-9 sm:text-sm">
          {String(number).padStart(2, "0")}
        </span>
        <h2 className="pt-1 text-lg font-black leading-tight text-white sm:text-xl">
          {title}
        </h2>
      </div>
      <div className="space-y-4">{children}</div>
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function TermsPage() {
  const [activeId, setActiveId] = useState<string>(TOC[0].id);

  // Highlight the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: 0 },
    );

    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ background: "#071530" }}
    >
      {/* subtle grid pattern (matches footer) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* top accent glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

      {/* radial glow behind hero */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-20 md:py-24">

        {/* ── Hero ── */}
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="mb-12 max-w-3xl sm:mb-16"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Legal · Terms
          </p>

          <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
            Terms of{" "}
            <span className="bg-gradient-to-r from-accent via-orange-400 to-amber-300 bg-clip-text text-transparent">
              Service
            </span>
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-300">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              Last updated September 1st, 2026
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300">
              Operated by Epic Software Designers
            </span>
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            These Terms of Service govern your access to and use of QASHUP
            (qashup.co.ke), operated by Epic Software Designers. By creating an
            account, starting a free trial, or using any part of the platform,
            you agree to be bound by these Terms.
          </p>
        </motion.header>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr] lg:gap-12">

          {/* ── Sidebar TOC ── */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              On this page
            </p>
            <nav className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {TOC.map((item) => {
                const active = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`group relative flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs transition-colors ${
                      active
                        ? "bg-white/5 text-white"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span
                      className={`hidden h-1 w-1 shrink-0 rounded-full transition-all lg:block ${
                        active ? "w-3 bg-accent" : "bg-slate-600 group-hover:bg-slate-400"
                      }`}
                    />
                    <span className="whitespace-nowrap lg:whitespace-normal">
                      {item.label}
                    </span>
                  </a>
                );
              })}
            </nav>
          </aside>

          {/* ── Main content ── */}
          <div className="space-y-5 sm:space-y-6">

            <Section number={1} title="Acceptance of Terms">
              <P>
                By registering an account, accessing, or using QASHUP, you
                confirm that you have read, understood, and agreed to these
                Terms and our Privacy Policy. If you do not agree, you must not
                use the platform.
              </P>
            </Section>

            <Section number={2} title="Eligibility & Account Registration">
              <UL>
                <Li>
                  You must be at least 18 years old and legally capable of
                  entering into binding contracts under Kenyan law.
                </Li>
                <Li>
                  You agree to provide accurate, current, and complete
                  information during registration and to keep it updated.
                </Li>
                <Li>
                  You are responsible for all activity that occurs under your
                  account and for keeping your credentials confidential.
                </Li>
                <Li>
                  Business Owners are responsible for the actions of their
                  agents and shop staff within their QASHUP workspace.
                </Li>
              </UL>
            </Section>

            <Section number={3} title="Subscriptions, Billing & Free Trial">
              <P>QASHUP is offered on a subscription basis, billed via M-Pesa.</P>
              <OL>
                <LiNum n={1}>
                  <B>Free Trial.</B> New accounts receive a free trial beginning
                  at sign-up. No payment is required during the trial.
                </LiNum>
                <LiNum n={2}>
                  <B>Billing Cycle.</B> Subscriptions renew automatically at the
                  end of each billing cycle unless cancelled before the renewal
                  date.
                </LiNum>
                <LiNum n={3}>
                  <B>Payments.</B> All subscription payments are processed via
                  authorized mobile money channels (M-Pesa APIs). You authorise
                  us to charge your registered M-Pesa number on each cycle.
                </LiNum>
                <LiNum n={4}>
                  <B>Non-Refundable.</B> Subscription fees are non-refundable
                  except where required by Kenyan law.
                </LiNum>
                <LiNum n={5}>
                  <B>Price Changes.</B> We may adjust pricing with reasonable
                  advance notice posted on this page or via dashboard
                  announcements.
                </LiNum>
              </OL>
            </Section>

            <Section number={4} title="Acceptable Use">
              <P>
                You agree not to misuse the platform. Specifically, you must
                not:
              </P>
              <UL>
                <Li>Use QASHUP for any unlawful, fraudulent, or deceptive purpose.</Li>
                <Li>
                  Reverse-engineer, decompile, scrape, or attempt to extract
                  source code from the platform.
                </Li>
                <Li>
                  Interfere with or disrupt the integrity or performance of
                  QASHUP or its servers.
                </Li>
                <Li>
                  Upload malicious code, viruses, or any material designed to
                  harm the platform or other users.
                </Li>
                <Li>Impersonate another person, business, or entity.</Li>
                <Li>
                  Resell, sublicense, or provide access to QASHUP to third
                  parties without written permission.
                </Li>
              </UL>
            </Section>

            <Section number={5} title="Data Ownership & Responsibility">
              <UL>
                <Li>
                  <B>Your Data.</B> You retain ownership of all business,
                  customer, agent, and inventory data you enter into QASHUP.
                </Li>
                <Li>
                  <B>Your Responsibility.</B> You are solely responsible for the
                  accuracy and legality of data you upload, and for obtaining
                  any necessary consents from your customers and staff.
                </Li>
                <Li>
                  <B>Our Role.</B> QASHUP acts as a Data Processor under the
                  Kenya Data Protection Act (2019) — see our Privacy Policy for
                  details.
                </Li>
              </UL>
            </Section>

            <Section number={6} title="Intellectual Property">
              <P>
                All rights, title, and interest in and to the QASHUP platform —
                including software, design, logos, trademarks, and documentation
                — remain the exclusive property of Epic Software Designers.
                These Terms do not grant you any rights to our intellectual
                property except the limited right to use the platform as
                intended.
              </P>
            </Section>

            <Section number={7} title="Third-Party Services">
              <P>
                QASHUP integrates with third-party services such as M-Pesa
                payment APIs and messaging channels. Your use of these services
                may be subject to their own terms and privacy policies. We are
                not responsible for the availability, accuracy, or practices of
                third-party providers.
              </P>
            </Section>

            <Section number={8} title="Service Availability & Support">
              <P>
                We aim to provide a reliable service, but we do not guarantee
                uninterrupted availability. Scheduled maintenance, technical
                issues, or factors beyond our control may cause temporary
                downtime. Support is available via WhatsApp and phone during our
                published support hours.
              </P>
            </Section>

            <Section number={9} title="Disclaimer of Warranties & Limitation of Liability">
              <P>
                QASHUP is provided &quot;as is&quot; and &quot;as
                available&quot; without warranties of any kind, express or
                implied. To the maximum extent permitted by Kenyan law:
              </P>
              <UL>
                <Li>
                  We are not liable for any indirect, incidental, or
                  consequential damages, including lost profits, lost data, or
                  business interruption.
                </Li>
                <Li>
                  Our total liability for any claim arising from your use of
                  QASHUP shall not exceed the amount you paid us in the 3 months
                  preceding the claim.
                </Li>
              </UL>
            </Section>

            <Section number={10} title="Termination">
              <UL>
                <Li>
                  You may cancel your subscription at any time from your portal
                  settings.
                </Li>
                <Li>
                  We may suspend or terminate your account if you breach these
                  Terms, fail to pay subscription fees, or use the platform
                  unlawfully.
                </Li>
                <Li>
                  Upon termination, your right to access QASHUP ends. Data
                  deletion is handled per our Privacy Policy.
                </Li>
              </UL>
            </Section>

            <Section number={11} title="Governing Law">
              <P>
                These Terms are governed by the laws of the Republic of Kenya.
                Any dispute shall be subject to the exclusive jurisdiction of
                the courts of Nairobi, Kenya.
              </P>
            </Section>

            <Section number={12} title="Changes & Contact">
              <P>
                We may update these Terms from time to time. Continued use of
                QASHUP after an update constitutes acceptance of the revised
                Terms. For questions, contact us at:
              </P>

              <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { label: "Company", value: "Epic Software Designers" },
                  { label: "Email",   value: "epicsoftwaredesigners@gmail.com" },
                  { label: "Phone",   value: "0768 131 905 / 0791 408 944" },
                  { label: "Address", value: "Nairobi, Kenya" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      {row.label}
                    </p>
                    <p className="mt-1 text-sm font-medium text-white">
                      {row.value}
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </div>

        {/* ── Footer note ── */}
        <div className="mt-14 flex flex-col items-center gap-3 border-t border-white/8 pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs text-slate-400">
            © 2026 QASHUP · Epic Software Designers. All rights reserved.
          </p>
          <a
            href="/privacy"
            className="text-xs font-semibold text-accent transition-colors hover:text-orange-300"
          >
            Read our Privacy Policy →
          </a>
        </div>
      </div>
    </main>
  );
}