"use client";

import AdminHeader from "./components/AdminHeader";
import AllCategory from "./components/allCategory";
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
        <div className="flex justify-center items-start ">
          <AllCategory />
          {children}
        </div>
      </body>
    </html>
  );
}
