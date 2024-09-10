"use client";

import Footer from "@/components/Footer";
import "./globals.css";
import Header from "@/components/Header";
import DashboardHeader from "@/components/DashboardHeader";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboard = pathname.includes("/dashboards");

  return (
    <html lang="en">
      <body>
        {isDashboard ? <DashboardHeader /> : <Header />}
        {children}
        {isDashboard ? "" : <Footer />}
      </body>
    </html>
  );
}
