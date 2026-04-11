import type { ReactNode } from "react";

export function SectionHeading({
  title,
  subtitle,
  action,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="font-[family-name:var(--font-beats-hero)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-[#A1A1AA]">{subtitle}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
