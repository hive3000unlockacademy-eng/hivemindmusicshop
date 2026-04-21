import Link from "next/link";
import { signOutAction } from "@/app/admin/actions";

const links: { href: string; label: string }[] = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/upload", label: "Upload beat" },
  { href: "/admin/bulk-upload", label: "Bulk upload" },
  { href: "/admin/sales", label: "Sales" },
  { href: "/admin/account", label: "Account" },
];

export function AdminSidebar({ email }: { email: string }) {
  return (
    <aside className="w-52 shrink-0 border-r border-white/10 pr-4">
      <p className="truncate text-xs text-[#A1A1AA]" title={email}>
        {email}
      </p>
      <nav className="mt-6 flex flex-col gap-1 text-sm">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            prefetch={false}
            className="rounded-md px-2 py-1.5 text-[#A1A1AA] hover:bg-white/5 hover:text-white"
          >
            {label}
          </Link>
        ))}
      </nav>
      <form action={signOutAction} className="mt-8">
        <button
          type="submit"
          className="text-sm text-[#A1A1AA] underline-offset-2 hover:text-white hover:underline"
        >
          Sign out
        </button>
      </form>
    </aside>
  );
}
