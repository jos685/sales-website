"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Table of contents                                                  */
/* ------------------------------------------------------------------ */

const TOC = [
  { id: "section-1", label: "Information We Collect" },
  { id: "section-2", label: "How We Use Your Data" },
  { id: "section-3", label: "Data Ownership" },
  { id: "section-4", label: "Security Measures" },
  { id: "section-5", label: "Third-Party Sharing" },
  { id: "section-6", label: "Your Rights (DPA)" },
  { id: "section-7", label: "Cookies & Local Storage" },
  { id: "section-8", label: "Changes to Policy" },
  { id: "section-9", label: "Contact" },
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

const Sub = ({ children }: { children: React.ReactNode }) => (
  <p className="pt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
    {children}
  </p>
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

export default function PrivacyPage() {
  const [activeId, setActiveId] = useState<string>(TOC[0].id);

  /* ── Active-section tracking via IntersectionObserver ── */
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
            Legal · Privacy
          </p>

          <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
            Privacy{" "}
            <span className="bg-gradient-to-r from-accent via-orange-400 to-amber-300 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-300">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              Last updated September 1st, 2026
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300">
              Kenya DPA 2019 compliant
            </span>
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            At QASHUP (qashup.co.ke), operated by Epic Software Designers, we are
            committed to safeguarding the privacy and personal data of our users,
            business owners, shop operators, and field agents. This Privacy
            Policy outlines how we collect, use, store, and protect your data in
            compliance with the Kenya Data Protection Act, 2019 (DPA).
          </p>
        </motion.header>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr] lg:gap-12">

          {/* ── Sidebar TOC (sticky on lg+) ── */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 lg:p-5">
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
                        className={`hidden h-1 shrink-0 rounded-full transition-all lg:block ${
                          active
                            ? "w-3 bg-accent"
                            : "w-1 bg-slate-600 group-hover:bg-slate-400"
                        }`}
                      />
                      <span className="whitespace-nowrap lg:whitespace-normal">
                        {item.label}
                      </span>
                    </a>
                  );
                })}
              </nav>

              {/* small progress bar */}
              <div className="mt-5 hidden lg:block">
                <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent to-orange-400"
                    initial={false}
                    animate={{
                      width: `${
                        ((TOC.findIndex((t) => t.id === activeId) + 1) /
                          TOC.length) *
                        100
                      }%`,
                    }}
                    transition={{ duration: 0.3, ease }}
                  />
                </div>
                <p className="mt-2 text-[10px] font-medium text-slate-500">
                  Section{" "}
                  <span className="text-slate-300">
                    {TOC.findIndex((t) => t.id === activeId) + 1}
                  </span>{" "}
                  of {TOC.length}
                </p>
              </div>
            </div>
          </aside>

          {/* ── Main content ── */}
          <div className="space-y-5 sm:space-y-6">

            <Section number={1} title="Information We Collect">
              <P>
                We collect information necessary to deliver, maintain, and
                optimize our sales tracking and POS services:
              </P>

              <Sub>A · Business Owner &amp; Account Data</Sub>
              <UL>
                <Li>
                  Full name, business name, phone number, email address, and
                  physical/city location.
                </Li>
                <Li>
                  Payment details (such as M-Pesa phone numbers and transaction
                  reference IDs for subscription billing).
                </Li>
              </UL>

              <Sub>B · Shop &amp; Agent Information</Sub>
              <UL>
                <Li>
                  Agent names, assigned identification codes (e.g., AGT-0001),
                  shop locations, contact details, and commission structures set
                  by the Business Owner.
                </Li>
              </UL>

              <Sub>C · Operational &amp; Transactional Data</Sub>
              <UL>
                <Li>
                  Sales logs, product catalog/inventory descriptions, item
                  pricing, transaction timestamps, payment methods
                  (cash/M-Pesa/credit), cash handover records, and stock
                  movement logs.
                </Li>
              </UL>

              <Sub>D · Technical &amp; Device Data</Sub>
              <UL>
                <Li>
                  IP addresses, browser types, device information, local
                  storage/cached data (used for offline transaction syncing),
                  and system activity logs.
                </Li>
              </UL>
            </Section>

            <Section number={2} title="How We Use Your Data">
              <P>We use collected information for the following lawful purposes:</P>
              <OL>
                <LiNum n={1}>
                  <B>Service Delivery.</B> Providing access to the Owner, Shop,
                  and Agent Portals, processing POS transactions, and
                  maintaining live sales dashboards.
                </LiNum>
                <LiNum n={2}>
                  <B>Offline Data Syncing.</B> Temporarily storing transaction
                  records locally on user devices to ensure seamless operation
                  when offline, and syncing data to secure servers once online.
                </LiNum>
                <LiNum n={3}>
                  <B>Automated Reporting.</B> Sending scheduled daily business
                  summary emails (e.g., 10 PM daily digests) and low stock alerts
                  to registered Business Owners.
                </LiNum>
                <LiNum n={4}>
                  <B>Subscription Processing.</B> Validating M-Pesa subscription
                  payments and managing trial/account statuses.
                </LiNum>
                <LiNum n={5}>
                  <B>Customer Support.</B> Resolving technical queries, handling
                  WhatsApp/phone support, and preventing platform abuse.
                </LiNum>
              </OL>
            </Section>

            <Section number={3} title="Data Ownership & Processing Role">
              <UL>
                <Li>
                  <B>Business Data.</B> The Business Owner retains ownership of
                  all customer, agent, sales, and inventory data entered into
                  QASHUP.
                </Li>
                <Li>
                  <B>Data Processor Status.</B> Under the Kenya Data Protection
                  Act (2019), QASHUP acts as a Data Processor regarding customer
                  and sales data logged by Business Owners, processing it
                  strictly according to the owner&apos;s instructions to run the
                  software platform.
                </Li>
              </UL>
            </Section>

            <Section number={4} title="Data Protection & Security Measures">
              <P>
                We enforce robust administrative and technical safeguards to
                keep your financial and business data secure:
              </P>
              <UL>
                <Li>
                  <B>Encryption.</B> Data transmitted between your device and
                  QASHUP servers is encrypted using standard SSL/TLS encryption.
                </Li>
                <Li>
                  <B>Access Control.</B> Owner data is isolated. Agents and shop
                  staff can only access information and workflows granted by the
                  Business Owner&apos;s permissions.
                </Li>
                <Li>
                  <B>Server Security.</B> Data is stored in secure,
                  password-protected database environments with regular backup
                  protocols.
                </Li>
              </UL>
            </Section>

            <Section number={5} title="Third-Party Sharing">
              <P>
                We do not sell or rent your personal or business data to
                third-party advertisers. We only share necessary data under the
                following circumstances:
              </P>
              <UL>
                <Li>
                  <B>Payment Service Providers.</B> Sharing transaction phone
                  numbers with authorized mobile money channels (e.g., M-Pesa
                  APIs) strictly to process subscription billing.
                </Li>
                <Li>
                  <B>Legal Compliance.</B> Disclosing information if mandated by
                  Kenyan courts, law enforcement, or regulatory bodies under a
                  lawful court order or statutory obligation.
                </Li>
              </UL>
            </Section>

            <Section
              number={6}
              title="Your Rights Under the Kenya Data Protection Act (2019)"
            >
              <P>
                Subject to verified account ownership, you have the following
                rights:
              </P>
              <UL>
                <Li>
                  <B>Right to Access.</B> Request a summary or copy of your
                  personal data stored on QASHUP.
                </Li>
                <Li>
                  <B>Right to Rectification.</B> Correct incomplete or
                  inaccurate business, agent, or account information via your
                  portal settings.
                </Li>
                <Li>
                  <B>Right to Erasure (Data Deletion).</B> Request deletion of
                  your personal or business account data upon winding up your
                  subscription, subject to statutory record-keeping
                  requirements.
                </Li>
                <Li>
                  <B>Right to Export.</B> Export sales logs, inventory lists,
                  and agent performance reports in standard formats (e.g.,
                  PDF/Excel).
                </Li>
              </UL>
            </Section>

            <Section number={7} title="Cookies and Local Storage">
              <P>
                QASHUP utilizes browser Local Storage and cookies to maintain
                authenticated user sessions, retain portal access preferences,
                and enable offline POS transaction logging. You can manage or
                disable cookies in your browser, though doing so may impact
                offline syncing capabilities.
              </P>
            </Section>

            <Section number={8} title="Changes to This Privacy Policy">
              <P>
                We may update this Privacy Policy periodically to reflect
                technological updates or regulatory changes in Kenya. We will
                notify users of significant changes by posting the updated date
                on this page or via dashboard announcements.
              </P>
            </Section>

            <Section number={9} title="Data Protection Contact">
              <P>
                For privacy queries, data requests, or compliance inquiries,
                reach out to our team at:
              </P>

              <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { label: "Data Controller", value: "Epic Software Designers" },
                  { label: "Email", value: "epicsoftwaredesigners@gmail.com" },
                  { label: "Phone", value: "0768 131 905 / 0791 408 944" },
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
            href="/terms"
            className="text-xs font-semibold text-accent transition-colors hover:text-orange-300"
          >
            Read our Terms of Service →
          </a>
        </div>
      </div>
    </main>
  );
}