export type Locale = "en" | "es";

type LocalizedText = Record<Locale, string>;
type PublicationStatus = "draft" | "published";

export type EducationalResource = {
  id: string;
  type: LocalizedText;
  title: LocalizedText;
  status: PublicationStatus;
  externalUrl?: string;
  featured?: boolean;
};

export type VideoItem = {
  id: string;
  title: LocalizedText;
  status: PublicationStatus;
  duration?: string;
};

export const educationalResources: EducationalResource[] = [
  {
    id: "tax-planning-reel",
    type: { es: "REEL DE INSTAGRAM", en: "INSTAGRAM REEL" },
    title: { es: "Planeación tributaria", en: "Tax planning" },
    status: "published",
    externalUrl: "https://www.instagram.com/reel/DWkVUxjkYXr/",
    featured: true,
  },
  {
    id: "deductible-expenses-guide",
    type: { es: "ARTÍCULO", en: "ARTICLE" },
    title: { es: "Cómo organizar tus gastos deducibles", en: "How to organize deductible expenses" },
    status: "draft",
  },
  {
    id: "business-deadlines-guide",
    type: { es: "GUÍA", en: "GUIDE" },
    title: { es: "Fechas clave para tu empresa", en: "Key dates for your business" },
    status: "draft",
  },
];

export const videoLibrary: VideoItem[] = [
  { id: "tax-planning", title: { es: "¿Qué es la planeación tributaria y por qué tu negocio la necesita?", en: "What is tax planning and why does your business need it?" }, status: "draft" },
  { id: "deductions", title: { es: "Deducciones fiscales que muchos empresarios olvidan", en: "Tax deductions many owners overlook" }, status: "draft" },
  { id: "llc-vs-corporation", title: { es: "LLC vs Corporation: ¿cuál conviene más?", en: "LLC vs. Corporation: which is best?" }, status: "draft" },
  { id: "itin", title: { es: "ITIN: requisitos y proceso paso a paso", en: "ITIN: requirements and process step by step" }, status: "draft" },
];
