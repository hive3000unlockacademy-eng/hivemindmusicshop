import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto max-w-lg py-16">
      <h1 className="font-[family-name:var(--font-beats-hero)] text-3xl font-semibold tracking-tight text-white">
        Admin sign-in
      </h1>
      <p className="mt-4 text-[#A1A1AA]">
        Authentication previously used Supabase magic links. There is no
        database configured in this build, so admin login is disabled. Use the
        storefront at{" "}
        <Link href="/" className="text-[#016b28] hover:underline">
          home
        </Link>{" "}
        or wire Supabase back when needed.
      </p>
      <p className="mt-10 text-sm text-[#A1A1AA]">
        <Link href="/admin" className="text-[#016b28] hover:underline">
          Admin placeholder →
        </Link>
      </p>
    </div>
  );
}
