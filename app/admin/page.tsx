import type { Metadata } from "next";
import AdminOrderList from "@/components/admin/AdminOrderList";

export const metadata: Metadata = {
  title: "Admin — Orders | Swach South Indian Cafe",
};

export default function AdminPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-brand-900">Admin — Live Orders</h1>
        <span className="bg-leaf-100 text-leaf-700 text-xs font-semibold px-3 py-1 rounded-full">
          Real-time
        </span>
      </div>
      <AdminOrderList />
    </main>
  );
}
