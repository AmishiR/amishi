import AdminDashboard from "@/components/code/AdminDashboard";

export default async function ProtectedPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <AdminDashboard />
      </div>
    </div>
  );
}
