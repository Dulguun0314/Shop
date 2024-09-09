"use client";

import Footer from "@/components/Footer";
import "./globals.css";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import LoadingPage from "./loading";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Home = dynamic(() => import("../../src/app/page"), {
    ssr: true,
    loading: () => <LoadingPage />,
  });
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
