import type { Metadata } from "next";
import "./globals.css";
import "./theme.css";

export const metadata: Metadata = {
  title: "ALVOREM — Intelligent systems for modern business",
  description:
    "ALVOREM designs and builds AI-powered systems, data products, automation and software for modern business.",
  metadataBase: new URL("https://alvorem.ro"),
  openGraph: {
    title: "ALVOREM",
    description: "Intelligent systems for modern business.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
