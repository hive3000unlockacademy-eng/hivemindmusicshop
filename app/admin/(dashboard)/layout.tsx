import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: isAdmin, error } = await supabase.rpc("current_is_admin");

  if (error || !isAdmin) {
    redirect("/admin/login?error=forbidden");
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <AdminSidebar email={user.email ?? ""} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
