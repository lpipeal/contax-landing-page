import "../globals.css";
export { metadata } from "../site-metadata";
export default function SpanishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
