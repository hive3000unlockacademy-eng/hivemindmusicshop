import type { Metadata } from "next";
import {
  LegalDocLayout,
  LegalSection,
} from "@/components/legal/legal-doc-layout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms for purchasing and licensing beats on HiveMindMusic.Shop — HiveMind Productions.",
};

export default function TermsPage() {
  return (
    <LegalDocLayout
      title="Terms of Service"
      description="Last updated: April 2026. By using HiveMindMusic.Shop and purchasing licenses, you agree to these terms. If you do not agree, do not use the store."
    >
      <LegalSection heading="Who we are">
        <p>
          HiveMindMusic.Shop is operated by HiveMind Productions (“we,” “us”). These
          terms govern your use of the website and any purchase of non-exclusive or
          exclusive licenses to instrumental beats and related digital files
          (“Licensed Content”).
        </p>
      </LegalSection>

      <LegalSection heading="Eligibility">
        <p>
          You must be at least the age of majority in your jurisdiction to make a
          purchase. By ordering, you represent that you have authority to enter this
          agreement.
        </p>
      </LegalSection>

      <LegalSection heading="Orders and payment">
        <p>
          Prices, license tiers (for example Basic, Premium, Premium + Trackouts,
          Exclusive), and taxes/fees are shown at checkout. We use third-party
          payment processors; completing payment authorizes us to charge the
          applicable amount. You are responsible for providing accurate information.
        </p>
      </LegalSection>

      <LegalSection heading="License grant (important)">
        <p>
          Your rights are limited to the scope of the license tier you purchase, as
          described on the product and checkout pages and in any license summary
          provided with your order. Unless you purchase an exclusive license that
          expressly transfers exclusive rights, purchases are{" "}
          <strong className="text-[#E4E4E7]">non-exclusive</strong>: we retain
          ownership of the underlying composition and recording; you receive the
          rights stated for your tier (such as distribution limits, file formats, and
          use in new recordings).
        </p>
        <p>
          You may not resell, redistribute, or sublicense the Licensed Content as
          standalone files to others, or use it in a way that exceeds your tier. You
          may not register our work as your own sole authorship where that would be
          misleading. Specific caps (streams, copies, etc.) are defined in your tier
          and product description.
        </p>
      </LegalSection>

      <LegalSection heading="Delivery">
        <p>
          Licensed files and access instructions are delivered digitally, typically
          after payment confirmation. Delivery may be by download link, email, or your
          account area. You are responsible for storing your files; we may not retain
          download links indefinitely.
        </p>
      </LegalSection>

      <LegalSection heading="Refunds and chargebacks">
        <p>
          Because Licensed Content is digital and delivered instantly or shortly after
          purchase, <strong className="text-[#E4E4E7]">all sales are final</strong>{" "}
          except where required by law or where we expressly agree otherwise in
          writing (for example if files are defective and we cannot provide a
          replacement). Contact us first for any issue before initiating a chargeback;
          unjustified chargebacks may result in loss of access and account closure.
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual property">
        <p>
          Except for the license granted to you for your tier, all rights in beats,
          artwork, branding, and site content remain with HiveMind Productions and
          licensors. Trademarks and logos may not be used without permission except as
          needed to credit under your license.
        </p>
      </LegalSection>

      <LegalSection heading="Prohibited conduct">
        <p>
          You may not use the store to violate law, infringe others’ rights, scrape or
          overload our systems, reverse-engineer delivery mechanisms to obtain files
          without paying, or misrepresent your affiliation with us.
        </p>
      </LegalSection>

      <LegalSection heading="Disclaimer">
        <p>
          Licensed Content is provided “as is.” To the fullest extent permitted by law,
          we disclaim warranties of merchantability, fitness for a particular purpose,
          and non-infringement. You are responsible for how you use beats in your
          projects and for clearing any third-party rights outside the scope of your
          license (for example featured artists or samples you add).
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of liability">
        <p>
          To the maximum extent permitted by law, our total liability for any claim
          arising from these terms or your purchase is limited to the amount you paid
          us for the specific order in dispute. We are not liable for indirect,
          incidental, special, or consequential damages.
        </p>
      </LegalSection>

      <LegalSection heading="Indemnity">
        <p>
          You will defend and indemnify us against claims arising from your use of
          Licensed Content outside the scope of your license or from content you
          combine with our beats.
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
          new purchases.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          For licensing and order questions:{" "}
          <a href="/contact" className="text-[#016b28] underline-offset-2 hover:underline">
            Contact
          </a>
          .
        </p>
      </LegalSection>
    </LegalDocLayout>
  );
}
