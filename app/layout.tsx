import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Contax Business Solutions | Soluciones contables y tributarias",
    template: "%s | Contax Business Solutions",
  },
  description: "Asesoría contable, tributaria y empresarial para empresas y emprendedores en Estados Unidos y Colombia.",
  metadataBase: new URL("https://www.contaxbs.com"),
  applicationName: "Contax Business Solutions",
  category: "business",
  icons: {
    icon: [{ url: "/contax-favicon.svg", type: "image/svg+xml" }],
    shortcut: "/contax-favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Contax Business Solutions",
    title: "Contax Business Solutions | Soluciones contables y tributarias",
    description: "Construimos empresas. Protegemos tu crecimiento.",
    images: [{ url: "/og.png", width: 1730, height: 910, alt: "Contax Business Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contax Business Solutions | Soluciones contables y tributarias",
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
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
