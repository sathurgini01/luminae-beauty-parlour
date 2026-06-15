import type { Metadata } from "next";
import "../src/index.css";

export const metadata: Metadata = {
  title: "Luminae Beauty & Parlour",
  description: "Beauty parlour booking and management portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
