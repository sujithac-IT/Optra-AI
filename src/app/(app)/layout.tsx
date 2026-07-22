import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import Chatbot from "@/components/Chatbot";

export const metadata: Metadata = {
  title: "Dashboard — Optra",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Sidebar />
      <main className="main-content" style={{ flex: 1, padding: '32px', background: 'var(--bg-primary)' }}>
        {children}
      </main>
      <Chatbot />
    </div>
  );
}
