import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-2 max-w-xl text-[#A1A1AA]">
          Admin sign-in and order/contact lists were backed by Supabase. With no
          database connected, this page is a static placeholder. Re-add Supabase
          (or another backend) when you are ready to manage orders and contacts
          here.
        </p>
      </div>
      <p className="text-sm text-[#A1A1AA]">
        <Link href="/" className="text-[#016b28] hover:underline">
          ← Back to storefront
        </Link>
      </p>
    </div>
  );
}
