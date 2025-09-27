import AdminDashboard from "@/components/code/AdminDashboard";
import { DashboardSidebar } from "@/components/ui/dashboard-sidebar";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  return (
    <div className="min-h-screen bg-gray-50 flex -m-6">
      {/* Sidebar */}
      <DashboardSidebar userEmail={data?.claims?.email} />
      
      {/* Main Dashboard Content */}
      <main className="flex-1 p-6">
        <AdminDashboard />
      </main>
    </div>
  );
}
