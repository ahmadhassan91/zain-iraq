import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zain Iraq Knowledge Base",
  description: "Unified knowledge platform for Zain Iraq",
  icons: {
    icon: "/brand/zain-logo.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
