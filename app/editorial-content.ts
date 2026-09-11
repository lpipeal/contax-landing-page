export type Locale = "en" | "es";

export type LocalizedText = Record<Locale, string>;
export type PublicationStatus = "draft" | "published";

export type EducationalResource = {
  id: string;
  type: LocalizedText;
  title: LocalizedText;
  status: PublicationStatus;
  externalUrl?: string;
  externalLabel?: LocalizedText;
  featured?: boolean;
  isDemo?: boolean;
};

export type VideoItem = {
  id: string;
  title: LocalizedText;
  status: PublicationStatus;
  duration?: string;
  externalUrl?: string;
  isDemo?: boolean;
};

// El modo preview permite revisar tarjetas completas sin exponer contenido demo en producción.
export const showDemoContent = process.env.NEXT_PUBLIC_CONTAX_CONTENT_MODE === "preview";

export type ServiceItem = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  countryIds: Array<"us" | "co">;
};

export type CountryCoverage = {
  id: "us" | "co";
  flag: string;
  name: LocalizedText;
  services: LocalizedText[];
};

export type StrategicPartner = {
  id: string;
  name: string;
  description: LocalizedText;
  countryIds: Array<"us" | "co">;
  logo?: string;
  websiteUrl?: string;
  permissionConfirmed: boolean;
  order: number;
  status: PublicationStatus;
};

export type ClientTestimonial = {
  id: string;
  quote: LocalizedText;
  displayName: string;
  company?: string;
  industry?: string;
  countryId: "us" | "co";
  serviceId?: string;
  publicationConsent: boolean;
  order: number;
  status: PublicationStatus;
};

export const services: ServiceItem[] = [
  { id: "bookkeeping", title: { es: "Contabilidad", en: "Bookkeeping" }, description: { es: "Información financiera ordenada para tomar mejores decisiones.", en: "Organized financial information to support better decisions." }, countryIds: ["us", "co"] },
  { id: "taxes", title: { es: "Impuestos personales y corporativos", en: "Personal & business taxes" }, description: { es: "Preparación y acompañamiento para cumplir con claridad.", en: "Preparation and guidance to comply with clarity." }, countryIds: ["us", "co"] },
  { id: "formation", title: { es: "Creación de empresas", en: "Business formation" }, description: { es: "La estructura adecuada para empezar y crecer con seguridad.", en: "The right structure to start and grow with confidence." }, countryIds: ["us", "co"] },
  { id: "payroll", title: { es: "Nómina / Payroll", en: "Payroll" }, description: { es: "Procesos de nómina organizados y oportunos.", en: "Organized, timely payroll processes." }, countryIds: ["us", "co"] },
  { id: "advisory", title: { es: "Asesoría contable y financiera", en: "Accounting & financial advisory" }, description: { es: "Una perspectiva estratégica para cada etapa de tu negocio.", en: "A strategic perspective for every phase of your business." }, countryIds: ["us", "co"] },
  { id: "itin", title: { es: "ITIN Application Assistance", en: "ITIN application assistance" }, description: { es: "Acompañamiento para gestionar tu proceso de ITIN.", en: "Guidance through your ITIN process." }, countryIds: ["us"] },
];

export const countryCoverage: CountryCoverage[] = [
  {
    id: "us",
    flag: "🇺🇸",
    name: { es: "Estados Unidos", en: "United States" },
    services: [
      { es: "Impuestos personales y corporativos", en: "Personal and business taxes" },
      { es: "ITIN para personas elegibles", en: "ITIN for eligible individuals" },
      { es: "Formación de LLC y Corporations", en: "LLC and corporation formation" },
      { es: "Contabilidad y nómina", en: "Bookkeeping and payroll" },
    ],
  },
  {
    id: "co",
    flag: "🇨🇴",
    name: { es: "Colombia", en: "Colombia" },
    services: [
      { es: "Contabilidad y reportes financieros", en: "Bookkeeping and financial reports" },
      { es: "Orientación tributaria y de cumplimiento", en: "Tax and compliance guidance" },
      { es: "Formalización de empresas y negocios", en: "Business formalization" },
      { es: "Asesoría financiera y estratégica", en: "Financial and strategic advisory" },
    ],
  },
];

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
    externalUrl: "https://example.com/contax/resources/deductible-expenses",
    externalLabel: { es: "Leer artículo", en: "Read article" },
    isDemo: true,
  },
  {
    id: "business-deadlines-guide",
    type: { es: "GUÍA", en: "GUIDE" },
    title: { es: "Fechas clave para tu empresa", en: "Key dates for your business" },
    status: "draft",
    externalUrl: "https://example.com/contax/resources/business-deadlines",
    externalLabel: { es: "Ver guía", en: "View guide" },
    isDemo: true,
  },
];

export const videoLibrary: VideoItem[] = [
  { id: "tax-planning", title: { es: "¿Qué es la planeación tributaria y por qué tu negocio la necesita?", en: "What is tax planning and why does your business need it?" }, status: "draft", duration: "06:45", externalUrl: "https://example.com/contax/videos/tax-planning", isDemo: true },
  { id: "deductions", title: { es: "Deducciones fiscales que muchos empresarios olvidan", en: "Tax deductions many owners overlook" }, status: "draft", duration: "04:12", externalUrl: "https://example.com/contax/videos/deductions", isDemo: true },
  { id: "llc-vs-corporation", title: { es: "LLC vs Corporation: ¿cuál conviene más?", en: "LLC vs. Corporation: which is best?" }, status: "draft", duration: "05:18", externalUrl: "https://example.com/contax/videos/llc-vs-corporation", isDemo: true },
  { id: "itin", title: { es: "ITIN: requisitos y proceso paso a paso", en: "ITIN: requirements and process step by step" }, status: "draft", duration: "05:27", externalUrl: "https://example.com/contax/videos/itin", isDemo: true },
];

// Agrega aquí aliados únicamente después de confirmar autorización de uso de marca.
export const strategicPartners: StrategicPartner[] = [];

// La landing mostrará testimonios solo cuando haya tres o más con consentimiento expreso.
export const clientTestimonials: ClientTestimonial[] = [];
