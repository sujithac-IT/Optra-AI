import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Optra — Autonomous Career OS for Indian Tech Talent",
  description: "Optra is the dual-engine agentic career copilot that scouts niche opportunities, builds dynamic roadmaps, auto-tailors applications, and verifies talent — all in one platform.",
  keywords: "career, internships, hackathons, jobs, AI copilot, Indian students, DigiLocker, skill verification",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
