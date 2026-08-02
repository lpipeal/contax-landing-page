import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Contax Business Solutions | Strategic Accounting & Tax Advisory",
  description: "Accounting, tax and business advisory for entrepreneurs, growing companies and international investors in the United States.",
  metadataBase: new URL("https://www.contaxbs.com"),
  openGraph: {
    title: "Contax Business Solutions | Strategic Accounting & Tax Advisory",
    description: "Construimos empresas. Protegemos tu crecimiento.",
    images: [{ url: "/og.png", width: 1730, height: 910, alt: "Contax Business Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contax Business Solutions",
    description: "Construimos empresas. Protegemos tu crecimiento.",
    images: ["/og.png"],
  },
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
