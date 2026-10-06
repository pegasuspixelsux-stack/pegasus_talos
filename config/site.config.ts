// config/site.config.ts

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
  };
  assets: {
    heroImage: string;
    loginBackground: string;
    placeholderProperty: string;
  };
  settings: {
    currency: string;
    locale: string;
    enableLeadNotification: boolean;
    autoAssignLeads: boolean;
  };
}

export const siteConfig: SiteConfig = {
  name: "Pegasus Talos",
  tagline: "Inmobiliaria & Desarrollos",
  description:
    "Especialistas en la comercialización, desarrollo e inversión de propiedades exclusivas en Punta del Este y la costa.",
  address: {
    street: "Ruta 10, km 160",
    city: "Punta del Este",
    state: "Maldonado",
    country: "Uruguay",
    zip: "20000",
  },
  contact: {
    email: "contacto@pegasustalos.com",
    phone: "+598 99 123 456",
    whatsapp: "+59899123456",
  },
  assets: {
    heroImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2560&auto=format&fit=crop",
    loginBackground:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2560&auto=format&fit=crop",
    placeholderProperty:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
  },
  settings: {
    currency: "USD",
    locale: "es-UY",
    enableLeadNotification: true,
    autoAssignLeads: false,
  },
};
