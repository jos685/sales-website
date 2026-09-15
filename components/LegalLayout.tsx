import Link from "next/link";
import type { ReactNode } from "react";

const css = `
  .legal-page * { box-sizing: border-box; }
  .legal-page {
    min-height: 100svh; background: #080c12; color: #e7ecf3;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .legal-topbar {
    position: sticky; top: 0; z-index: 10;
    backdrop-filter: blur(14px);
    background: rgba(8,12,18,0.85);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding: 14px 24px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .legal-brand {
    display: flex; align-items: center; gap: 10px;
    font-size: 13px; font-weight: 700; letter-spacing: 0.14em;
    color: #22d3ee; text-decoration: none;
  }
  .legal-brand-dot {
    width: 8px; height: 8px; border-radius: 50%; background: #22d3ee;
    box-shadow: 0 0 12px rgba(34,211,238,0.7);
  }
  .legal-back {
    font-size: 12px; color: rgba(255,255,255,0.55);
    text-decoration: none; padding: 7px 14px;
    border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
    transition: all 0.15s; font-family: 'DM Mono', monospace;
  }
  .legal-back:hover {
    color: #22d3ee; border-color: rgba(34,211,238,0.4);
    background: rgba(34,211,238,0.05);
  }
  .legal-hero { max-width: 1120px; margin: 0 auto; padding: 64px 24px 40px; }
  .legal-eyebrow {
    font-size: 11px; font-family: 'DM Mono', monospace;
    letter-spacing: 0.24em; text-transform: uppercase;
    color: #22d3ee; margin-bottom: 14px;
  }
  .legal-h1 {
    font-size: clamp(30px, 5vw, 46px); font-weight: 700;
    letter-spacing: -0.03em; margin: 0 0 18px; color: #fff; line-height: 1.1;
  }
  .legal-meta {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 11.5px; font-family: 'DM Mono', monospace;
    color: rgba(255,255,255,0.5);
    padding: 7px 14px; border-radius: 999px;
    background: rgba(34,211,238,0.06);
    border: 1px solid rgba(34,211,238,0.18);
  }
  .legal-meta-dot {
    width: 6px; height: 6px; border-radius: 50%; background: #22d3ee;
    box-shadow: 0 0 8px rgba(34,211,238,0.8);
  }
  .legal-intro {
    margin-top: 28px; font-size: 15.5px; line-height: 1.8;
    color: rgba(255,255,255,0.6); max-width: 780px;
  }
  .legal-wrap {
    max-width: 1120px; margin: 0 auto;
    padding: 16px 24px 120px;
    display: grid; grid-template-columns: 220px 1fr;
    gap: 56px; align-items: start;
  }
  .legal-toc {
    position: sticky; top: 84px;
    border-left: 1px solid rgba(255,255,255,0.07);
    padding-left: 18px;
  }
  .legal-toc-title {
    font-size: 10px; font-family: 'DM Mono', monospace;
    letter-spacing: 0.24em; text-transform: uppercase;
    color: rgba(255,255,255,0.3); margin-bottom: 14px;
  }
  .legal-toc a {
    display: block; padding: 5px 0;
    color: rgba(255,255,255,0.45); text-decoration: none;
    font-size: 12.5px; line-height: 1.5; transition: color 0.15s;
  }
  .legal-toc a:hover { color: #22d3ee; }
  .legal-content { min-width: 0; }
  .legal-section {
    scroll-margin-top: 96px;
    padding-bottom: 44px; margin-bottom: 44px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .legal-section:last-child { border-bottom: none; }
  .legal-section-head {
    display: flex; align-items: center; gap: 14px; margin-bottom: 22px;
  }
  .legal-section-num {
    font-family: 'DM Mono', monospace;
    font-size: 12px; font-weight: 700; color: #22d3ee;
    padding: 5px 11px; line-height: 1;
    background: rgba(34,211,238,0.08);
    border: 1px solid rgba(34,211,238,0.22);
    border-radius: 7px; flex-shrink: 0;
  }
  .legal-section-title {
    font-size: 21px; font-weight: 600; color: #fff;
    margin: 0; letter-spacing: -0.015em; line-height: 1.3;
  }
  .legal-sub {
    font-size: 11.5px; font-weight: 700; color: #22d3ee;
    margin: 26px 0 10px; letter-spacing: 0.1em;
    text-transform: uppercase; font-family: 'DM Mono', monospace;
  }
  .legal-p {
    font-size: 14.5px; line-height: 1.8;
    color: rgba(255,255,255,0.65); margin: 0 0 14px;
  }
  .legal-ul { list-style: none; padding: 0; margin: 0 0 14px; }
  .legal-ul li {
    position: relative; padding-left: 22px; margin-bottom: 10px;
    font-size: 14.5px; line-height: 1.75; color: rgba(255,255,255,0.65);
  }
  .legal-ul li::before {
    content: ''; position: absolute; left: 4px; top: 11px;
    width: 5px; height: 5px; border-radius: 50%;
    background: rgba(34,211,238,0.55);
  }
  .legal-ol {
    list-style: none; padding: 0; margin: 0 0 14px;
    counter-reset: legal-ol;
  }
  .legal-ol li {
    counter-increment: legal-ol;
    position: relative; padding-left: 40px; margin-bottom: 12px;
    font-size: 14.5px; line-height: 1.75; color: rgba(255,255,255,0.65);
  }
  .legal-ol li::before {
    content: counter(legal-ol, decimal-leading-zero);
    position: absolute; left: 0; top: 1px;
    width: 28px; height: 24px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Mono', monospace;
    font-size: 10.5px; font-weight: 600;
    color: #22d3ee; line-height: 1;
    background: rgba(34,211,238,0.08);
    border: 1px solid rgba(34,211,238,0.18);
    border-radius: 5px;
  }
  .legal-strong { color: #fff; font-weight: 600; }
  .legal-link {
    color: #22d3ee; text-decoration: none;
    border-bottom: 1px dashed rgba(34,211,238,0.4);
  }
  .legal-link:hover { border-bottom-style: solid; }
  .legal-footer {
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 40px 24px; text-align: center;
    font-size: 12px; color: rgba(255,255,255,0.3);
    font-family: 'DM Mono', monospace;
  }
  .legal-footer-links {
    display: flex; gap: 24px; justify-content: center; margin-top: 12px;
  }
  .legal-footer-links a {
    color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.15s;
  }
  .legal-footer-links a:hover { color: #22d3ee; }

  @media (max-width: 900px) {
    .legal-wrap {
      grid-template-columns: 1fr; gap: 0;
      padding: 8px 20px 80px;
    }
    .legal-toc { display: none; }
    .legal-hero { padding: 44px 20px 24px; }
    .legal-section-title { font-size: 18px; }
  }
`;

export interface TocItem {
  id: string;
  label: string;
}

export interface LegalLayoutProps {
  eyebrow?: string;
  title: string;
  lastUpdated?: string;
  intro?: ReactNode;
  toc?: TocItem[];
  backTo?: string;
  backLabel?: string;
  children: ReactNode;
}

export function LegalLayout({
  eyebrow = "Legal",
  title,
  lastUpdated,
  intro,
  toc = [],
  backTo = "/#",
  backLabel = "Back",
  children,
}: LegalLayoutProps) {
  return (
    <div className="legal-page">
      <style>{css}</style>

      <header className="legal-topbar">
        <Link href="/" className="legal-brand">
          <span className="legal-brand-dot" />
          QASHUP
        </Link>
        <Link href={backTo} className="legal-back">← {backLabel}</Link>
      </header>

      <div className="legal-hero">
        <div className="legal-eyebrow">{eyebrow}</div>
        <h1 className="legal-h1">{title}</h1>
        {lastUpdated && (
          <div className="legal-meta">
            <span className="legal-meta-dot" />
            Last updated · {lastUpdated}
          </div>
        )}
        {intro && <p className="legal-intro">{intro}</p>}
      </div>

      <div className="legal-wrap">
        {toc.length > 0 && (
          <nav className="legal-toc">
            <div className="legal-toc-title">Contents</div>
            {toc.map(({ id, label }) => (
              <a key={id} href={`#${id}`}>{label}</a>
            ))}
          </nav>
        )}
        <div className="legal-content">{children}</div>
      </div>

      <footer className="legal-footer">
        <div>© {new Date().getFullYear()} QASHUP · Epic Software Designers</div>
        <div className="legal-footer-links">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}

export interface LegalSectionProps {
  number: number;
  title: ReactNode;
  id?: string;
  children: ReactNode;
}

export function LegalSection({ number, title, id, children }: LegalSectionProps) {
  return (
    <section id={id ?? `section-${number}`} className="legal-section">
      <div className="legal-section-head">
        <span className="legal-section-num">{String(number).padStart(2, "0")}</span>
        <h2 className="legal-section-title">{title}</h2>
      </div>
      {children}
    </section>
  );
}

interface ChildrenProps {
  children: ReactNode;
}

export const P  = ({ children }: ChildrenProps) => <p className="legal-p">{children}</p>;
export const Sub = ({ children }: ChildrenProps) => <h3 className="legal-sub">{children}</h3>;
export const UL = ({ children }: ChildrenProps) => <ul className="legal-ul">{children}</ul>;
export const OL = ({ children }: ChildrenProps) => <ol className="legal-ol">{children}</ol>;
export const B  = ({ children }: ChildrenProps) => <strong className="legal-strong">{children}</strong>;