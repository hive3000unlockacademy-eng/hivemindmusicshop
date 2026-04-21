import Link from "next/link";
import { AdminLoginForm } from "@/components/admin/login-form";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-lg py-16">
      <h1 className="font-[family-name:var(--font-beats-hero)] text-3xl font-semibold tracking-tight text-white">
        Admin sign-in
      </h1>
      <p className="mt-4 text-[#A1A1AA]">
        Sign in with the email and password for your Supabase Auth user. That
        account must have admin access (app metadata or{" "}
        <code className="text-[#E4E4E7]">admin_users</code>).
      </p>
      {error === "forbidden" ? (
        <p className="mt-4 rounded-md border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200/90">
          Signed in, but this account is not an admin. In Supabase →
          Authentication → Users, set{" "}
          <strong className="text-white">App metadata</strong> to{" "}
          <code className="text-white">{`{ "admin": true }`}</code>, or add
          your user id to <code className="text-white">admin_users</code>.
        </p>
      ) : null}
      <AdminLoginForm />
      <p className="mt-10 text-center text-sm text-[#A1A1AA]">
        <Link href="/" className="text-[#016b28] hover:underline">
          ← Back to storefront
        </Link>
      </p>
    </div>
  );
}
