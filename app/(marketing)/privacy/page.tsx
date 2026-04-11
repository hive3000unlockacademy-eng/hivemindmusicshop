import type { Metadata } from "next";
import {
  LegalDocLayout,
  LegalSection,
} from "@/components/legal/legal-doc-layout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How HiveMind Productions collects and uses information on HiveMindMusic.Shop.",
};

export default function PrivacyPage() {
  return (
    <LegalDocLayout
      title="Privacy Policy"
      description="Last updated: April 2026. This policy describes how HiveMind Productions (“we,” “us”) handles information when you use HiveMindMusic.Shop."
    >
      <LegalSection heading="What this covers">
        <p>
          This policy applies to visitors and customers of our website and related
          services for browsing, purchasing, and licensing instrumental beats. It
          does not cover third-party sites linked from our store.
        </p>
      </LegalSection>

      <LegalSection heading="Information we collect">
        <p>
          <strong className="text-[#E4E4E7]">You provide:</strong> contact or account
          details when you reach out, create an account (if offered), or complete a
          purchase (for example name, email, and billing-related information
          required to fulfill your order).
        </p>
        <p>
          <strong className="text-[#E4E4E7]">Automatically:</strong> basic technical
          data such as device/browser type, general location from IP, and pages
          viewed, to keep the site secure and understand usage.
        </p>
      </LegalSection>

      <LegalSection heading="How we use information">
        <ul className="list-inside list-disc space-y-2">
          <li>Process orders, deliver licensed files, and provide support.</li>
          <li>Send transactional messages (receipts, license details, important notices).</li>
          <li>Prevent fraud, abuse, and technical issues.</li>
          <li>Improve the store experience and comply with legal obligations.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Payments">
        <p>
          Payments may be processed by third-party providers (for example PayPal).
          Those providers collect and process payment information under their own
          privacy policies. We do not store full payment card numbers on our
          servers.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies and similar technologies">
        <p>
          We may use cookies or local storage for essential site function,
          preferences, and analytics. You can control cookies through your browser
          settings; some features may not work if cookies are disabled.
        </p>
      </LegalSection>

      <LegalSection heading="Sharing">
        <p>
          We share information only as needed: with payment and email/delivery
          vendors, professional advisers when required, or when required by law. We
          do not sell your personal information.
        </p>
      </LegalSection>

      <LegalSection heading="Retention">
        <p>
          We keep information as long as needed to provide the service, meet legal
          and tax requirements, and resolve disputes—typically for the life of your
          customer relationship plus a reasonable period afterward.
        </p>
      </LegalSection>

      <LegalSection heading="Your choices">
        <p>
          Depending on where you live, you may have rights to access, correct, delete,
          or export certain data, or to object to some processing. Contact us using
          the details below and we will respond within a reasonable time.
        </p>
      </LegalSection>

      <LegalSection heading="Children">
        <p>
          Our services are not directed at children under 13 (or the age required in
          your region). We do not knowingly collect personal information from
          children.
        </p>
      </LegalSection>

      <LegalSection heading="Changes">
        <p>
          We may update this policy from time to time. The “Last updated” date will
          change when we do; continued use of the site after changes means you accept
          the updated policy.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about this policy: use our{" "}
          <a href="/contact" className="text-[#016b28] underline-offset-2 hover:underline">
            contact form
          </a>
          , or reach us at the business email you provide for HiveMind Productions
          customer inquiries.
        </p>
      </LegalSection>
    </LegalDocLayout>
  );
}
