import {
  LegalLayout,
  LegalSection,
  P,
  UL,
  OL,
  B,
  type TocItem,
} from "../../components/LegalLayout";

const TOC: TocItem[] = [
  { id: "section-1",  label: "Acceptance of Terms" },
  { id: "section-2",  label: "Account & Eligibility" },
  { id: "section-3",  label: "Subscriptions & Free Trial" },
  { id: "section-4",  label: "Acceptable Use" },
  { id: "section-5",  label: "Data Ownership" },
  { id: "section-6",  label: "Intellectual Property" },
  { id: "section-7",  label: "Third-Party Services" },
  { id: "section-8",  label: "Availability & Support" },
  { id: "section-9",  label: "Warranties & Liability" },
  { id: "section-10", label: "Termination" },
  { id: "section-11", label: "Governing Law" },
  { id: "section-12", label: "Contact" },
];

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal · Terms"
      title="QASHUP Terms of Service"
      lastUpdated="September 1st, 2026"
      intro="These Terms of Service govern your access to and use of QASHUP (qashup.co.ke), operated by Epic Software Designers. By creating an account, starting a free trial, or using any part of the platform, you agree to be bound by these Terms."
      toc={TOC}
    >
      <LegalSection number={1} title="Acceptance of Terms">
        <P>By registering an account, accessing, or using QASHUP, you confirm that you have read, understood, and agreed to these Terms and our Privacy Policy. If you do not agree, you must not use the platform.</P>
      </LegalSection>

      <LegalSection number={2} title="Eligibility &amp; Account Registration">
        <UL>
          <li>You must be at least 18 years old and legally capable of entering into binding contracts under Kenyan law.</li>
          <li>You agree to provide accurate, current, and complete information during registration and to keep it updated.</li>
          <li>You are responsible for all activity that occurs under your account and for keeping your credentials confidential.</li>
          <li>Business Owners are responsible for the actions of their agents and shop staff within their QASHUP workspace.</li>
        </UL>
      </LegalSection>

      <LegalSection number={3} title="Subscriptions, Billing &amp; Free Trial">
        <P>QASHUP is offered on a subscription basis, billed via M-Pesa.</P>
        <OL>
          <li><B>Free Trial:</B> New accounts receive a free trial beginning at sign-up. No payment is required during the trial.</li>
          <li><B>Billing Cycle:</B> Subscriptions renew automatically at the end of each billing cycle unless cancelled before the renewal date.</li>
          <li><B>Payments:</B> All subscription payments are processed via authorized mobile money channels (M-Pesa APIs). You authorise us to charge your registered M-Pesa number on each cycle.</li>
          <li><B>Non-Refundable:</B> Subscription fees are non-refundable except where required by Kenyan law.</li>
          <li><B>Price Changes:</B> We may adjust pricing with reasonable advance notice posted on this page or via dashboard announcements.</li>
        </OL>
      </LegalSection>

      <LegalSection number={4} title="Acceptable Use">
        <P>You agree not to misuse the platform. Specifically, you must not:</P>
        <UL>
          <li>Use QASHUP for any unlawful, fraudulent, or deceptive purpose.</li>
          <li>Reverse-engineer, decompile, scrape, or attempt to extract source code from the platform.</li>
          <li>Interfere with or disrupt the integrity or performance of QASHUP or its servers.</li>
          <li>Upload malicious code, viruses, or any material designed to harm the platform or other users.</li>
          <li>Impersonate another person, business, or entity.</li>
          <li>Resell, sublicense, or provide access to QASHUP to third parties without written permission.</li>
        </UL>
      </LegalSection>

      <LegalSection number={5} title="Data Ownership &amp; Responsibility">
        <UL>
          <li><B>Your Data:</B> You retain ownership of all business, customer, agent, and inventory data you enter into QASHUP.</li>
          <li><B>Your Responsibility:</B> You are solely responsible for the accuracy and legality of data you upload, and for obtaining any necessary consents from your customers and staff.</li>
          <li><B>Our Role:</B> QASHUP acts as a Data Processor under the Kenya Data Protection Act (2019) — see our Privacy Policy for details.</li>
        </UL>
      </LegalSection>

      <LegalSection number={6} title="Intellectual Property">
        <P>All rights, title, and interest in and to the QASHUP platform — including software, design, logos, trademarks, and documentation — remain the exclusive property of Epic Software Designers. These Terms do not grant you any rights to our intellectual property except the limited right to use the platform as intended.</P>
      </LegalSection>

      <LegalSection number={7} title="Third-Party Services">
        <P>QASHUP integrates with third-party services such as M-Pesa payment APIs and messaging channels. Your use of these services may be subject to their own terms and privacy policies. We are not responsible for the availability, accuracy, or practices of third-party providers.</P>
      </LegalSection>

      <LegalSection number={8} title="Service Availability &amp; Support">
        <P>We aim to provide a reliable service, but we do not guarantee uninterrupted availability. Scheduled maintenance, technical issues, or factors beyond our control may cause temporary downtime. Support is available via WhatsApp and phone during our published support hours.</P>
      </LegalSection>

      <LegalSection number={9} title="Disclaimer of Warranties &amp; Limitation of Liability">
        <P>QASHUP is provided "as is" and "as available" without warranties of any kind, express or implied. To the maximum extent permitted by Kenyan law:</P>
        <UL>
          <li>We are not liable for any indirect, incidental, or consequential damages, including lost profits, lost data, or business interruption.</li>
          <li>Our total liability for any claim arising from your use of QASHUP shall not exceed the amount you paid us in the 3 months preceding the claim.</li>
        </UL>
      </LegalSection>

      <LegalSection number={10} title="Termination">
        <UL>
          <li>You may cancel your subscription at any time from your portal settings.</li>
          <li>We may suspend or terminate your account if you breach these Terms, fail to pay subscription fees, or use the platform unlawfully.</li>
          <li>Upon termination, your right to access QASHUP ends. Data deletion is handled per our Privacy Policy.</li>
        </UL>
      </LegalSection>

      <LegalSection number={11} title="Governing Law">
        <P>These Terms are governed by the laws of the Republic of Kenya. Any dispute shall be subject to the exclusive jurisdiction of the courts of Nairobi, Kenya.</P>
      </LegalSection>

      <LegalSection number={12} title="Changes &amp; Contact">
        <P>We may update these Terms from time to time. Continued use of QASHUP after an update constitutes acceptance of the revised Terms. For questions, contact us at:</P>
        <UL>
          <li><B>Company:</B> Epic Software Designers</li>
          <li><B>Email:</B> epicsoftwaredesigners@gmail.com</li>
          <li><B>Phone:</B> 0768 131 905 / 0791 408 944</li>
          <li><B>Address:</B> Nairobi, Kenya</li>
        </UL>
      </LegalSection>
    </LegalLayout>
  );
}