import { AccountPasswordForm } from "@/components/admin/account-password-form";

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-beats-hero)] text-2xl font-semibold text-white">
          Account
        </h1>
        <p className="mt-2 max-w-xl text-[#A1A1AA]">
          Update the password for your admin account.
        </p>
      </div>
      <AccountPasswordForm />
    </div>
  );
}
