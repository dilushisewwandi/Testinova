import React from "react";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children, role }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role={role} />

      <main className="flex-1 overflow-y-auto p-10">
        {children}
      </main>
    </div>
  );
}