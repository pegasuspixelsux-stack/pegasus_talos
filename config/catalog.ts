// config/catalog.ts
// Shared listings for the landing page grid, the catalog, the detail pages and the dashboard.
// All property facts below are PLACEHOLDERS. Replace with real data (Firebase) later.

export type PropertyStatus = "Available" | "Reserved" | "Sold";

export type Operation = "En Venta" | "Alquiler Anual" | "Alquiler de Temporada" | "En Pozo";

export const statusLabel: Record<PropertyStatus, string> = {
  Available: "Disponible",
  Reserved: "Reservado",
  Sold: "Vendido",
};

export interface Property {
  id: string;
  name: string;
  location: string;
  area: string;
  operation: Operation;
  price: number;
  status: PropertyStatus;
  specs: {
    sqm: number;
    bedrooms: number;
    bathrooms: number;
    parking: number;
  };
  images: string[];
  description: string[];
  amenities: string[];
}

/** Badge shown on cards and headers: the transaction type while available, otherwise the status. */
export function badgeLabel(property: Property): string {
  return property.status === "Available" ? property.operation : statusLabel[property.status];
}

const galleryImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2560&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2560&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2560&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2560&auto=format&fit=crop",
];

export const properties: Property[] = [
  {
    id: "villa-manantiales",
    name: "Villa Manantiales",
    location: "Ruta 10 km 162, José Ignacio, Maldonado",
    area: "JOSÉ IGNACIO",
    operation: "En Venta",
    price: 1_850_000,
    status: "Available",
    specs: { sqm: 480, bedrooms: 4, bathrooms: 5, parking: 3 },
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2560&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2560&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2560&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2560&auto=format&fit=crop",
    ],
    description: [
      "Ubicada en una de las zonas más exclusivas de José Ignacio, Villa Manantiales combina una arquitectura contemporánea de líneas puras con terminaciones en madera noble y piedra local. Diseñada para maximizar la luz natural y brindar vistas panorámicas al océano Atlántico.",
      "La propiedad cuenta con amplios ventanales de piso a techo, cocina gourmet integrada con equipamiento de alta gama, máster suite con vestidor e hidromasaje, y una espectacular terraza con piscina infinity climatizada y sector de fogón exterior.",
    ],
    amenities: [
      "Vista Panorámica al Mar",
      "Piscina Infinity Climatizada",
      "Seguridad y Conserjería 24hs",
      "Losa Radiante Sectorizada",
      "Cava de Vinos",
      "Parrillero Gourmet Techado",
      "Smart Home Automation",
      "Acceso Privado a la Playa",
    ],
  },
  {
    id: "villa-atlantica",
    name: "Villa Atlántica",
    location: "Punta del Este, Maldonado",
    area: "PENÍNSULA",
    operation: "En Venta",
    price: 2_450_000,
    status: "Available",
    specs: { sqm: 420, bedrooms: 4, bathrooms: 4, parking: 2 },
    images: galleryImages,
    description: [
      "Villa de líneas contemporáneas con ventanales de piso a techo y terminaciones en madera y piedra natural. Pensada para aprovechar la luz del día durante todo el año.",
      "Cocina integrada con equipamiento de alta gama, suite principal con vestidor y una terraza con piscina y sector de parrilla.",
    ],
    amenities: [
      "Vista al mar",
      "Piscina climatizada",
      "Seguridad 24hs",
      "Losa radiante",
      "Parrillero techado",
      "Gimnasio",
    ],
  },
  {
    id: "casa-del-faro",
    name: "Casa del Faro",
    location: "José Ignacio, Maldonado",
    area: "JOSÉ IGNACIO",
    operation: "Alquiler de Temporada",
    price: 3_900_000,
    status: "Reserved",
    specs: { sqm: 560, bedrooms: 5, bathrooms: 6, parking: 3 },
    images: galleryImages,
    description: [
      "Casa de categoría con amplios espacios sociales, pensada para recibir y para el silencio. Materiales naturales y una paleta sobria.",
      "Cinco dormitorios en suite, biblioteca y un jardín con deck de madera.",
    ],
    amenities: ["Vista panorámica", "Piscina infinity", "Seguridad 24hs", "Cava de vinos", "Smart home", "Acceso a la playa"],
  },
  {
    id: "loft-playa-brava",
    name: "Loft Playa Brava",
    location: "Punta del Este, Maldonado",
    area: "PLAYA BRAVA",
    operation: "Alquiler Anual",
    price: 890_000,
    status: "Available",
    specs: { sqm: 110, bedrooms: 2, bathrooms: 2, parking: 1 },
    images: galleryImages,
    description: [
      "Loft de doble altura con una planta abierta, pensado para una vida urbana y de bajo mantenimiento.",
      "Dos dormitorios, balcón con vista y una cochera cubierta.",
    ],
    amenities: ["Balcón con vista", "Gimnasio", "Seguridad 24hs", "Cochera cubierta", "Ascensor"],
  },
  {
    id: "estancia-los-pinos",
    name: "Estancia Los Pinos",
    location: "Maldonado",
    area: "MALDONADO",
    operation: "En Venta",
    price: 4_200_000,
    status: "Sold",
    specs: { sqm: 900, bedrooms: 6, bathrooms: 7, parking: 4 },
    images: galleryImages,
    description: [
      "Estancia con un parque arbolado y casonas independientes para recibir huéspedes con privacidad.",
      "Casona principal, casa de huéspedes, caballeriza y una pileta de tamaño generoso.",
    ],
    amenities: ["Parque arbolado", "Pileta", "Caballeriza", "Casa de huéspedes", "Seguridad perimetral"],
  },
  {
    id: "penthouse-playa-mansa",
    name: "Penthouse Exclusivo en Playa Mansa",
    location: "Parada 18 de Playa Mansa, Punta del Este",
    area: "PLAYA MANSA",
    operation: "En Venta",
    price: 1_250_000,
    status: "Available",
    specs: { sqm: 380, bedrooms: 4, bathrooms: 5, parking: 3 },
    images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop"],
    description: [
      "Planta alta única con vista panorámica a la Isla Gorriti y espectaculares atardeceres sobre la Mansa. Cuenta con terraza privada, parrillero propio e hidromasaje.",
    ],
    amenities: ["Vista Panorámica al Mar", "Piscina Climatizada", "Parrillero Privado", "Seguridad 24hs", "Servicio de Playa"],
  },
  {
    id: "villa-modernista-jose-ignacio",
    name: "Villa Modernista en José Ignacio",
    location: "Playa Mansa de José Ignacio, Maldonado",
    area: "JOSÉ IGNACIO",
    operation: "En Venta",
    price: 2_800_000,
    status: "Available",
    specs: { sqm: 520, bedrooms: 5, bathrooms: 6, parking: 4 },
    images: ["https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop"],
    description: [
      "Diseño vanguardista en hormigón visto y maderas nobles a pasos del faro. Amplia integración entre ambientes interiores y exteriores con piscina infinity.",
    ],
    amenities: ["Piscina Infinity", "Acceso a la Playa", "Hormigón Visto", "Losa Radiante", "Cava de Vinos"],
  },
  {
    id: "chacra-maritima-manantiales",
    name: "Chacra Marítima en Manantiales",
    location: "Ruta 104, Manantiales",
    area: "MANANTIALES",
    operation: "En Venta",
    price: 1_650_000,
    status: "Available",
    specs: { sqm: 450, bedrooms: 4, bathrooms: 4, parking: 3 },
    images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop"],
    description: [
      "Chacra de 5 hectáreas con tajamar propio y entorno natural arbolado a minutos de la playa. Privacidad total con vistas lejanas al Atlántico.",
    ],
    amenities: ["Tajamar Privado", "5 Hectáreas", "Casero / Casa de Huéspedes", "Galería con Parrillero", "Entorno Natural"],
  },
  {
    id: "apartamento-primera-fila-playa-brava",
    name: "Apartamento en Primera Fila de Playa Brava",
    location: "Parada 10 de Playa Brava, Punta del Este",
    area: "PLAYA BRAVA",
    operation: "En Venta",
    price: 890_000,
    status: "Available",
    specs: { sqm: 210, bedrooms: 3, bathrooms: 3, parking: 2 },
    images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop"],
    description: [
      "Unidad en torre de máxima categoría frente a la playa Brava. Gran balcón terraza con vistas directas al océano y servicio hotelero completo.",
    ],
    amenities: ["Frente al Mar", "Gimnasio y Spa", "Piscina In/Out", "Servicio de Mucama", "Cancha de Tennis"],
  },
  {
    id: "residencia-familiar-la-barra",
    name: "Residencia Familiar en La Barra",
    location: "Cerca de Calle Los Dedos, La Barra",
    area: "LA BARRA",
    operation: "En Venta",
    price: 620_000,
    status: "Available",
    specs: { sqm: 290, bedrooms: 4, bathrooms: 3, parking: 2 },
    images: ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop"],
    description: [
      "Cálida propiedad a tres cuadras del centro comercial de La Barra. Gran parque arbolado con piscina, deck y parrillero techado.",
    ],
    amenities: ["Piscina Climatizada", "Jardín Arbolado", "Parrillero Techado", "Alarma", "Depósito"],
  },
  {
    id: "apartamento-reciclado-puerto",
    name: "Apartamento Reciclado frente al Puerto",
    location: "Puerto de Punta del Este, Península",
    area: "PENÍNSULA",
    operation: "En Venta",
    price: 340_000,
    status: "Available",
    specs: { sqm: 95, bedrooms: 2, bathrooms: 2, parking: 1 },
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop"],
    description: [
      "Planta baja totalmente reciclada a nuevo frente al Puerto. Acabados minimalistas de alta calidad, ideal para vivienda permanente o renta.",
    ],
    amenities: ["Vista al Puerto", "Reciclado a Nuevo", "Bajos Gastos Comunes", "Calefacción por Eurocable", "Cochera Fija"],
  },
  {
    id: "casa-estilo-maritimo-parada-10",
    name: "Casa de Estilo Marítimo en Parada 10",
    location: "Parada 10 de la Mansa, Cantegril",
    area: "PARADAS",
    operation: "En Venta",
    price: 510_000,
    status: "Available",
    specs: { sqm: 180, bedrooms: 3, bathrooms: 2, parking: 2 },
    images: ["https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=1200&auto=format&fit=crop"],
    description: [
      "Casa sólida en barrio residencial tranquilo cerca de colegios y servicios. Excelente construcción con estufa a leña y parrillero.",
    ],
    amenities: ["Estufa a Leña", "Barrio Residencial", "Cerca de Servicios", "Parrillero", "Riego Automático"],
  },
  {
    id: "chalet-clasico-faro",
    name: "Chalet Clásico junto al Faro",
    location: "Zona Faro de Punta del Este, Península",
    area: "PENÍNSULA",
    operation: "En Venta",
    price: 780_000,
    status: "Available",
    specs: { sqm: 240, bedrooms: 4, bathrooms: 3, parking: 2 },
    images: ["https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop"],
    description: [
      "Icónica propiedad con fachada en piedra local y tejas coloradas. Patio interno privado con parrillero protegido del viento.",
    ],
    amenities: ["Construcción de Piedra", "Patio Interno", "Ubicación Histórica", "Parrillero Cubierto", "Suite Principal"],
  },
  {
    id: "duplex-diseno-playa-bikini",
    name: "Dúplex de Diseño en Playa Bikini",
    location: "A 100m de Playa Bikini, Manantiales",
    area: "MANANTIALES",
    operation: "Alquiler de Temporada",
    price: 740_000,
    status: "Available",
    specs: { sqm: 160, bedrooms: 3, bathrooms: 3, parking: 2 },
    images: ["https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop"],
    description: [
      "Dúplex moderno con solárium privado y jacuzzi en terraza superior. A metros de una de las playas más cotizadas de la costa.",
    ],
    amenities: ["Solárium Privado", "Jacuzzi Exterior", "Cerca de Bikini Beach", "Seguridad", "Servicio de Limpieza"],
  },
  {
    id: "lote-exclusivo-pinar-jose-ignacio",
    name: "Lote Exclusivo en Barrio Privado",
    location: "Barrio Privado Pinar de José Ignacio",
    area: "JOSÉ IGNACIO",
    operation: "En Venta",
    price: 420_000,
    status: "Available",
    specs: { sqm: 1_200, bedrooms: 0, bathrooms: 0, parking: 0 },
    images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop"],
    description: [
      "Nivelado y listo para construir la residencia de tus sueños en un entorno protegido con vigilancia permanente y club house.",
    ],
    amenities: ["Seguridad 24hs", "Club House", "Cancha de Tenis", "Entorno Protegido", "Listo para Construir"],
  },
  {
    id: "apartamento-moderno-a-estrenar",
    name: "Apartamento Moderno a Estrenar",
    location: "Parada 5 de la Brava, Punta del Este",
    area: "PARADAS",
    operation: "En Pozo",
    price: 295_000,
    status: "Available",
    specs: { sqm: 88, bedrooms: 2, bathrooms: 2, parking: 1 },
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop"],
    description: [
      "Unidad de diseño contemporáneo con bajas expensas, ideal para inversión o primera vivienda cerca de la península.",
    ],
    amenities: ["Entrega Prevista 2027", "Barbacoa Común", "Solárium", "Bajos Gastos Comunes", "Cochera Subterránea"],
  },
  {
    id: "mansion-minimalista-barrio-golf",
    name: "Mansión Minimalista en Barrio Golf",
    location: "Barrio Golf / Rincón del Indio",
    area: "PLAYA BRAVA",
    operation: "En Venta",
    price: 1_950_000,
    status: "Available",
    specs: { sqm: 600, bedrooms: 5, bathrooms: 6, parking: 4 },
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop"],
    description: [
      "Residencia señorial rodeada de pinos en zona de embajadas y residencias diplomáticas. Spa interno, sauna y piscina climatizada.",
    ],
    amenities: ["Piscina Climatizada In/Out", "Sauna y Spa", "Cava subterránea", "Gran Parque Arbolado", "Cámaras de Seguridad"],
  },
];

export function getProperty(id: string): Property | undefined {
  return properties.find((property) => property.id === id);
}

export interface Zone {
  slug: string;
  name: string;
  /** Matches `Property.area` so the catalog filter can use it. */
  area: string;
  descriptor: string;
}

export const zones: Zone[] = [
  { slug: "manantiales", name: "Manantiales", area: "MANANTIALES", descriptor: "Zona Costa" },
  { slug: "la-barra", name: "La Barra", area: "LA BARRA", descriptor: "Zona Costa" },
  { slug: "jose-ignacio", name: "José Ignacio", area: "JOSÉ IGNACIO", descriptor: "Faro & Laguna" },
  { slug: "aldea-green", name: "Aldea Green", area: "ALDEA GREEN", descriptor: "Barrio Privado" },
];

export function zoneBySlug(slug?: string): Zone | undefined {
  return zones.find((zone) => zone.slug === slug);
}
