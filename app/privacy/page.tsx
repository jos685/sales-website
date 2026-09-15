import {
  LegalLayout,
  LegalSection,
  P,
  Sub,
  UL,
  OL,
  B,
  type TocItem,
} from "../../components/LegalLayout";

const TOC: TocItem[] = [
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

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Legal · Privacy"
      title="QASHUP Privacy Policy"
      lastUpdated="September 1st, 2026"
      intro="At QASHUP (qashup.co.ke), operated by Epic Software Designers, we are committed to safeguarding the privacy and personal data of our users, business owners, shop operators, and field agents. This Privacy Policy outlines how we collect, use, store, and protect your data in compliance with the Kenya Data Protection Act, 2019 (DPA)."
      toc={TOC}
    >
      <LegalSection number={1} title="Information We Collect">
        <P>We collect information necessary to deliver, maintain, and optimize our sales tracking and POS services:</P>
        <Sub>A · Business Owner &amp; Account Data</Sub>
        <UL>
          <li>Full name, business name, phone number, email address, and physical/city location.</li>
          <li>Payment details (such as M-Pesa phone numbers and transaction reference IDs for subscription billing).</li>
        </UL>
        <Sub>B · Shop &amp; Agent Information</Sub>
        <UL>
          <li>Agent names, assigned identification codes (e.g., AGT-0001), shop locations, contact details, and commission structures set by the Business Owner.</li>
        </UL>
        <Sub>C · Operational &amp; Transactional Data</Sub>
        <UL>
          <li>Sales logs, product catalog/inventory descriptions, item pricing, transaction timestamps, payment methods (cash/M-Pesa/credit), cash handover records, and stock movement logs.</li>
        </UL>
        <Sub>D · Technical &amp; Device Data</Sub>
        <UL>
          <li>IP addresses, browser types, device information, local storage/cached data (used for offline transaction syncing), and system activity logs.</li>
        </UL>
      </LegalSection>

      <LegalSection number={2} title="How We Use Your Data">
        <P>We use collected information for the following lawful purposes:</P>
        <OL>
          <li><B>Service Delivery:</B> Providing access to the Owner, Shop, and Agent Portals, processing POS transactions, and maintaining live sales dashboards.</li>
          <li><B>Offline Data Syncing:</B> Temporarily storing transaction records locally on user devices to ensure seamless operation when offline, and syncing data to secure servers once online.</li>
          <li><B>Automated Reporting:</B> Sending scheduled daily business summary emails (e.g., 10 PM daily digests) and low stock alerts to registered Business Owners.</li>
          <li><B>Subscription Processing:</B> Validating M-Pesa subscription payments and managing trial/account statuses.</li>
          <li><B>Customer Support:</B> Resolving technical queries, handling WhatsApp/phone support, and preventing platform abuse.</li>
        </OL>
      </LegalSection>

      <LegalSection number={3} title="Data Ownership &amp; Processing Role">
        <UL>
          <li><B>Business Data:</B> The Business Owner retains ownership of all customer, agent, sales, and inventory data entered into QASHUP.</li>
          <li><B>Data Processor Status:</B> Under the Kenya Data Protection Act (2019), QASHUP acts as a Data Processor regarding customer and sales data logged by Business Owners, processing it strictly according to the owner's instructions to run the software platform.</li>
        </UL>
      </LegalSection>

      <LegalSection number={4} title="Data Protection &amp; Security Measures">
        <P>We enforce robust administrative and technical safeguards to keep your financial and business data secure:</P>
        <UL>
          <li><B>Encryption:</B> Data transmitted between your device and QASHUP servers is encrypted using standard SSL/TLS encryption.</li>
          <li><B>Access Control:</B> Owner data is isolated. Agents and shop staff can only access information and workflows granted by the Business Owner's permissions.</li>
          <li><B>Server Security:</B> Data is stored in secure, password-protected database environments with regular backup protocols.</li>
        </UL>
      </LegalSection>

      <LegalSection number={5} title="Third-Party Sharing">
        <P>We do not sell or rent your personal or business data to third-party advertisers. We only share necessary data under the following circumstances:</P>
        <UL>
          <li><B>Payment Service Providers:</B> Sharing transaction phone numbers with authorized mobile money channels (e.g., M-Pesa APIs) strictly to process subscription billing.</li>
          <li><B>Legal Compliance:</B> Disclosing information if mandated by Kenyan courts, law enforcement, or regulatory bodies under a lawful court order or statutory obligation.</li>
        </UL>
      </LegalSection>

      <LegalSection number={6} title="Your Rights Under the Kenya Data Protection Act (2019)">
        <P>Subject to verified account ownership, you have the following rights:</P>
        <UL>
          <li><B>Right to Access:</B> Request a summary or copy of your personal data stored on QASHUP.</li>
          <li><B>Right to Rectification:</B> Correct incomplete or inaccurate business, agent, or account information via your portal settings.</li>
          <li><B>Right to Erasure (Data Deletion):</B> Request deletion of your personal or business account data upon winding up your subscription, subject to statutory record-keeping requirements.</li>
          <li><B>Right to Export:</B> Export sales logs, inventory lists, and agent performance reports in standard formats (e.g., PDF/Excel).</li>
        </UL>
      </LegalSection>

      <LegalSection number={7} title="Cookies and Local Storage">
        <P>QASHUP utilizes browser Local Storage and cookies to maintain authenticated user sessions, retain portal access preferences, and enable offline POS transaction logging. You can manage or disable cookies in your browser, though doing so may impact offline syncing capabilities.</P>
      </LegalSection>

      <LegalSection number={8} title="Changes to This Privacy Policy">
        <P>We may update this Privacy Policy periodically to reflect technological updates or regulatory changes in Kenya. We will notify users of significant changes by posting the updated date on this page or via dashboard announcements.</P>
      </LegalSection>

      <LegalSection number={9} title="Data Protection Contact">
        <P>For privacy queries, data requests, or compliance inquiries, reach out to our team at:</P>
        <UL>
          <li><B>Data Controller / Provider:</B> Epic Software Designers</li>
          <li><B>Email:</B> epicsoftwaredesigners@gmail.com</li>
          <li><B>Phone:</B> 0768 131 905 / 0791 408 944</li>
          <li><B>Address:</B> Nairobi, Kenya</li>
        </UL>
      </LegalSection>
    </LegalLayout>
  );
}