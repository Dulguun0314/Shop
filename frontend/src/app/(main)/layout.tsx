"use client";

import Footer from "./components/Footer";
import Header from "./components/Header";
import "./global.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ minHeight: "calc(100vh - 320.5px - 74px)" }}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
