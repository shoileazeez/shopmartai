import Sidebar from "@/src/components/ui/SideBar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-neutral-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 lg:ml-64">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}