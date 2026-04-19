"use client";

import { useEffect, useId, useRef } from "react";
import {
  getLicenseCopyForSlug,
  type LicenseModalContent,
} from "@/lib/legal/license-tier-copy";

type Props = {
  open: boolean;
  onClose: () => void;
  tierName: string;
  licenseSlug: string;
};

export function LicenseTierModal({
  open,
  onClose,
  tierName,
  licenseSlug,
}: Props) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const content = getLicenseCopyForSlug(licenseSlug);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  if (!content) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
        <button
          type="button"
          className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"
          onClick={onClose}
          aria-label="Close"
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-xl"
        >
          <h2 id={titleId} className="text-lg font-semibold text-white">
            {tierName}
          </h2>
          <p className="mt-3 text-sm text-[#A1A1AA]">
            Full license copy for this tier is not available yet. Contact HiveMind
            for terms.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full rounded-md bg-[#016b28] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(1,107,40,0.28)] transition-shadow duration-200 hover:shadow-[0_0_40px_rgba(1,107,40,0.55),0_0_72px_rgba(1,107,40,0.2)]"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close license dialog"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(85vh,720px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#016b28]/25 bg-[#0A0A0A] shadow-[0_0_60px_rgba(0,0,0,0.65)]"
      >
        <div className="border-b border-white/10 bg-[#050505]/80 px-5 py-4 sm:px-6 sm:py-5">
          <p className="font-[family-name:var(--font-beats-hero)] text-xs font-semibold uppercase tracking-[0.2em] text-[#016b28]">
            HiveMindMusic.Shop
          </p>
          <h2
            id={titleId}
            className="mt-1 font-[family-name:var(--font-beats-hero)] text-xl font-semibold tracking-tight text-white sm:text-2xl"
          >
            {tierName}
          </h2>
          <p className="mt-1 text-sm text-[#A1A1AA]">{content.shortTitle}</p>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-6 sm:py-5">
          <LicenseBody content={content} />
          <p className="mt-6 border-t border-white/10 pt-4 text-xs leading-relaxed text-[#71717A]">
            {content.footnote}
          </p>
        </div>

        <div className="border-t border-white/10 bg-[#050505]/80 px-5 py-3 sm:px-6">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="w-full rounded-md bg-[#016b28] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(1,107,40,0.28)] transition-shadow duration-200 hover:shadow-[0_0_40px_rgba(1,107,40,0.55),0_0_72px_rgba(1,107,40,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#016b28] sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function LicenseBody({ content }: { content: LicenseModalContent }) {
  return (
    <div className="space-y-6 text-sm leading-relaxed text-[#C8C8C8]">
      {content.sections.map((section) => (
        <section key={section.heading}>
          <h3 className="font-[family-name:var(--font-beats-hero)] text-sm font-semibold tracking-wide text-white">
            {section.heading}
          </h3>
          {section.paragraphs.map((p, i) => (
            <p key={`${section.heading}-${i}`} className="mt-2">
              {p}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}
