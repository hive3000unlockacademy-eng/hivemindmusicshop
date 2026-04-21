import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <h1 className="font-[family-name:var(--font-beats-hero)] text-2xl font-semibold text-white">
        Sign-in link error
      </h1>
      <p className="mt-4 text-[#A1A1AA]">
        The link may have expired or already been used. Request a new sign-in
        link from the admin login page.
      </p>
      <p className="mt-8">
        <Link
          href="/admin/login"
          className="text-[#016b28] underline-offset-2 hover:underline"
        >
          Back to admin login
        </Link>
      </p>
    </div>
  );
}
