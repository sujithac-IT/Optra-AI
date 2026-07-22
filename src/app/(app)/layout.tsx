import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Dashboard — Optra",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0A0F' }}>
      <Sidebar />
      <main className="main-content" style={{ flex: 1, padding: '32px', background: '#0A0A0F' }}>
        {children}
      </main>
    </div>
  );
}
