import { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-commerce",
  description: "moya page",
  icons: {
    icon: "/headIcon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ minHeight: "calc(100vh - 320.5px - 74px)" }}>
        {children}
      </body>
    </html>
  );
}
