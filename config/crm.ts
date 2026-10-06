// config/crm.ts
// Mock CRM data shared by the dashboard pages. Replace with Firebase queries later.

export type LeadStage = "Nuevo" | "Calificado" | "Visita agendada" | "Negociación";

export interface Contact {
  name: string;
  email: string;
  source: string;
  added: string;
}

export interface Lead {
  name: string;
  propertyId: string;
  stage: LeadStage;
  score: number;
}

export const contacts: Contact[] = [
  { name: "Lucía Fernández", email: "lucia@example.com", source: "Sitio web", added: "2026-10-02" },
  { name: "Martín Rodríguez", email: "martin@example.com", source: "Referido", added: "2026-10-03" },
  { name: "Sofía Paz", email: "sofia@example.com", source: "Instagram", added: "2026-10-04" },
  { name: "Diego Silva", email: "diego@example.com", source: "WhatsApp", added: "2026-10-05" },
];

export const leads: Lead[] = [
  { name: "Lucía Fernández", propertyId: "villa-manantiales", stage: "Visita agendada", score: 86 },
  { name: "Martín Rodríguez", propertyId: "villa-atlantica", stage: "Nuevo", score: 62 },
  { name: "Sofía Paz", propertyId: "loft-playa-brava", stage: "Negociación", score: 91 },
  { name: "Diego Silva", propertyId: "casa-del-faro", stage: "Calificado", score: 74 },
];
