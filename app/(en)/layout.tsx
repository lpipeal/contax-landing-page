import type { Metadata } from "next";
import { metadata as base } from "../site-metadata";
import "../globals.css";
export const metadata: Metadata = {
  ...base,
  title: "Accounting, tax and business solutions | Contax Business Solutions",
  description:
    "Accounting, tax and business support for individuals and businesses in the United States and Colombia.",
  alternates: { canonical: "/en", languages: { es: "/", en: "/en" } },
  openGraph: {
    ...base.openGraph,
    title: "Contax Business Solutions",
    description: "We build stronger businesses. We protect your growth.",
    locale: "en_US",
    url: "/en",
  },
  twitter: {
    ...base.twitter,
    title: "Contax Business Solutions",
    description: "We build stronger businesses. We protect your growth.",
  },
};
export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
