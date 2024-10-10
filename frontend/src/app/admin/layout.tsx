"use client";

import { ToastContainer } from "react-toastify";
import AdminHeader from "./components/AdminHeader";
import AllCategory from "./components/allCategory";
import "./global.css";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "../(main)/components/utils/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ minHeight: "calc(100vh - 320.5px - 74px)" }}>
        <UserProvider>
          <AdminHeader />
          <div className="flex items-start container w-screen m-auto ">
            <div className="flex">
              <AllCategory />
            </div>
            <div className="flex-1">{children}</div>
            <ToastContainer />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
