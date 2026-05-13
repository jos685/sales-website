import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const BASE_URL = "https://sales-tracker-lovat.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "JS Sales Tracker — Manage Agents, Shops & Sales in Real Time",
    template: "%s | JS Sales Tracker",
  },
  description:
    "JS Sales Tracker is a powerful SaaS platform for business owners in Kenya and East Africa to manage agents, shops, stock, commissions, and sales — all in one place.",
  keywords: [
    "sales tracker Kenya",
    "agent management system Kenya",
    "shop POS system Kenya",
    "stock management Kenya",
    "sales tracking software East Africa",
    "M-Pesa business software",
    "sales commission tracker",
    "business management Kenya",
    "POS terminal Kenya",
    "real-time sales dashboard",
  ],
  authors: [{ name: "JS Sales Tracker", url: BASE_URL }],
  creator: "JS Sales Tracker",
  publisher: "JS Sales Tracker",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "JS Sales Tracker — Manage Agents, Shops & Sales in Real Time",
    description:
      "Give every owner full visibility. Every agent a target. Every shop a terminal. One platform built for Kenya.",
    url: BASE_URL,
    siteName: "JS Sales Tracker",
    type: "website",
    locale: "en_KE",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "JS Sales Tracker — Sales Management for Kenyan Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JS Sales Tracker — Real-Time Sales Management",
    description:
      "Real-time sales tracking for Kenyan businesses. Manage agents, shops, stock & commissions.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Business Software",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "JS Sales Tracker",
      description: "Sales management SaaS for Kenyan and East African businesses",
      inLanguage: "en-KE",
    },
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "JS Sales Tracker",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/opengraph-image`,
      },
      description:
        "SaaS platform for business owners in Kenya and East Africa to manage agents, shops, stock, commissions, and real-time sales.",
      areaServed: ["KE", "TZ", "UG", "RW", "ET"],
      knowsAbout: [
        "Sales tracking",
        "Agent management",
        "Stock management",
        "M-Pesa payments",
        "Business analytics",
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${BASE_URL}/#software`,
      name: "JS Sales Tracker",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android, iOS",
      description:
        "Real-time sales tracking, agent management, stock control, and commission tracking for Kenyan businesses.",
      offers: [
        {
          "@type": "Offer",
          name: "Starter",
          price: "999",
          priceCurrency: "KES",
          description: "3 agents · 3 shops · Full sales tracking · Stock management",
        },
        {
          "@type": "Offer",
          name: "Growth",
          price: "1999",
          priceCurrency: "KES",
          description: "10 agents · 5 shops · Reports · Daily email summaries",
        },
        {
          "@type": "Offer",
          name: "Pro",
          price: "4999",
          priceCurrency: "KES",
          description: "Unlimited agents & shops · Advanced analytics · Dedicated support",
        },
      ],
      url: `${BASE_URL}/register`,
      areaServed: ["KE", "TZ", "UG", "RW", "ET"],
      publisher: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${BASE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I know agents won't cheat the system?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Every transaction is logged with a timestamp, the agent's name, and the exact amount — and only the owner can approve cash handovers. Agents cannot edit or delete records. If the numbers don't match, the system flags it before cash ever leaves the shop.",
          },
        },
        {
          "@type": "Question",
          name: "What happens if there's no internet?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Agents can continue recording sales in offline mode. All transactions are stored locally and automatically sync the moment connectivity is restored. No sale is ever lost.",
          },
        },
        {
          "@type": "Question",
          name: "How does the 30-day free trial work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sign up, add your agents and shops, and use every feature — completely free for 30 days. No credit card required. At the end of the trial, choose the plan that fits your business size and pay via M-Pesa.",
          },
        },
        {
          "@type": "Question",
          name: "Can I manage multiple shops from one account?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The Owner portal gives you a single dashboard for all your shops. You see each shop's sales, stock levels, and agent performance side by side. The Growth plan supports up to 5 shops; Pro supports unlimited.",
          },
        },
        {
          "@type": "Question",
          name: "How are agent commissions calculated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You set your own commission rates — per product or as a flat percentage. The system calculates commissions automatically based on verified sales. No manual math, no disputes at the end of the month.",
          },
        },
        {
          "@type": "Question",
          name: "Is my business data safe?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your data is encrypted in transit and at rest using industry-standard security. We run regular backups and your data is yours — we never sell it or share it with third parties.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-KE" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
