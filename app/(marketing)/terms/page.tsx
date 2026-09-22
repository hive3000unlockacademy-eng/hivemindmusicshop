import {
  LegalDocLayout,
  LegalSection,
} from "@/components/legal/legal-doc-layout";
import { marketingMetadata } from "@/lib/seo/marketing-metadata";

export const metadata = marketingMetadata({
  title: "Terms of Service",
  description:
    "Terms for booking recording studio services with HiveMind Productions.",
  path: "/terms",
  keywords: [
    "terms of service",
    "recording studio terms",
    "HiveMind Productions",
    "HiveMindMusic.Shop",
  ],
});

export default function TermsPage() {
  return (
    <LegalDocLayout
      title="Terms of Service"
      description="Last updated: September 2026. By using HiveMindMusic.Shop and booking studio services, you agree to these terms. If you do not agree, do not use the site."
    >
      <LegalSection heading="Who we are">
        <p>
          HiveMindMusic.Shop is operated by HiveMind Productions (“we,” “us”). These
          terms govern your use of the website and any booking or inquiry for
          recording, mixing, mastering, full production, or related studio services.
        </p>
      </LegalSection>

      <LegalSection heading="Eligibility">
        <p>
          You must be at least the age of majority in your jurisdiction to book a
          session. By submitting a booking inquiry, you represent that you have
          authority to enter this agreement.
        </p>
      </LegalSection>

      <LegalSection heading="Bookings and quotes">
        <p>
          Service descriptions on the site are informational. Pricing, schedule,
          deliverables, and scope are confirmed when we reply to your inquiry or in a
          separate written agreement. Submitting the contact form does not guarantee
          availability or create a binding booking until we confirm.
        </p>
      </LegalSection>

      <LegalSection heading="Payment">
        <p>
          Payment terms are agreed for each session. We may use third-party payment
          processors. Completing payment authorizes us to charge the agreed amount.
          You are responsible for providing accurate information.
        </p>
      </LegalSection>

      <LegalSection heading="Session deliverables">
        <p>
          Deliverables (for example session files, mixes, or masters) depend on the
          service you book and any written confirmation. Timelines and revision
          rounds will be stated when we confirm your session.
        </p>
      </LegalSection>

      <LegalSection heading="Cancellations and refunds">
        <p>
          Cancellation and refund policies are set when we confirm your booking.
          Contact us as early as possible if you need to reschedule. Digital work
          already delivered may be non-refundable except where required by law or
          where we agree otherwise in writing.
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual property">
        <p>
          Rights in your original performances and compositions remain yours, subject
          to any separate agreement. Rights in our production work, mixes, masters,
          branding, and site content remain with HiveMind Productions and licensors
          unless we transfer them in writing. Trademarks and logos may not be used
          without permission.
        </p>
      </LegalSection>

      <LegalSection heading="Prohibited conduct">
        <p>
          You may not use the site to violate law, infringe others’ rights, scrape or
          overload our systems, or misrepresent your affiliation with us.
        </p>
      </LegalSection>

      <LegalSection heading="Disclaimer">
        <p>
          The website and studio services are provided “as is.” To the fullest extent
          permitted by law, we disclaim warranties of merchantability, fitness for a
          particular purpose, and non-infringement. You are responsible for clearing
          third-party rights in material you bring to a session.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of liability">
        <p>
          To the maximum extent permitted by law, our total liability for any claim
          arising from these terms or a confirmed booking is limited to the amount you
          paid us for that booking. We are not liable for indirect, incidental,
          special, or consequential damages.
        </p>
      </LegalSection>

      <LegalSection heading="Indemnity">
        <p>
          You will defend and indemnify us against claims arising from content you
          bring to a session or from use of deliverables outside the scope we agreed.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law and disputes">
        <p>
          These terms are governed by the laws of the United States and the State of
          Delaware, excluding conflict-of-law rules, unless your jurisdiction requires
          otherwise. Courts in that jurisdiction have exclusive venue, subject to
          mandatory consumer protections where applicable.
        </p>
      </LegalSection>

      <LegalSection heading="Changes">
        <p>
          We may update these terms; the “Last updated” date will reflect changes.
          Continued use after posting constitutes acceptance of the revised terms for
          new bookings.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          For booking questions:{" "}
          <a
            href="/studio#book"
            className="text-[#016b28] underline-offset-2 hover:underline"
          >
            Contact
          </a>
          .
        </p>
      </LegalSection>
    </LegalDocLayout>
  );
}
