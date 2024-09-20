"use client";

import AdminHeader from "./components/AdminHeader";
import AllCategory from "./components/allCategory";
import "./global.css";
import { AdminProvider } from "./utils/AdminProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ minHeight: "calc(100vh - 320.5px - 74px)" }}>
        <AdminHeader />
        <div className="flex justify-center items-start ">
          <AllCategory />
          <AdminProvider>{children}</AdminProvider>
        </div>
      </body>
    </html>
  );
}
