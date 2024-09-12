"use client";

import AdminHeader from "./components/AdminHeader";
import "./global.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ minHeight: "calc(100vh - 320.5px - 74px)" }}>
        <AdminHeader />
        {children}
      </body>
    </html>
  );
}
