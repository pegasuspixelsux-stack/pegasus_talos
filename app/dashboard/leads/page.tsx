import Link from "next/link";
import { getProperty } from "@/config/catalog";
import { leads } from "@/config/crm";
import { DataTable, PageHeader } from "@/components/dashboard-ui";

const stageTone: Record<string, string> = {
  Nuevo: "text-fg/70 border-fg/20",
  Calificado: "text-sky-500 border-sky-500/40",
  "Visita agendada": "text-amber-600 border-amber-600/40",
  Negociación: "text-emerald-500 border-emerald-500/40",
};

export default function DashboardLeadsPage() {
  // Highest score first: the most likely buyers at the top.
  const sorted = [...leads].sort((a, b) => b.score - a.score);

  return (
    <>
      <PageHeader
        eyebrow="Gestión"
        title="Leads & Consultas"
        description={`${leads.length} consultas abiertas, ordenadas por puntaje.`}
      />

      <DataTable headers={["Lead", "Propiedad de interés", "Etapa", "Puntaje"]}>
        {sorted.map((l) => {
          const property = getProperty(l.propertyId);
          return (
            <tr key={l.name + l.propertyId} className="border-t border-fg/10">
              <td className="py-4 pr-6">{l.name}</td>
              <td className="py-4 pr-6">
                {property ? (
                  <Link
                    href={`/properties/${property.id}`}
                    className="text-fg/70 underline-offset-4 transition-colors duration-200 hover:text-fg hover:underline"
                  >
                    {property.name}
                  </Link>
                ) : (
                  <span className="text-fg/50">Sin propiedad asignada</span>
                )}
              </td>
              <td className="py-4 pr-6">
                <span className={`rounded-full border px-3 py-1 text-xs ${stageTone[l.stage]}`}>{l.stage}</span>
              </td>
              <td className="py-4 font-serif text-lg">{l.score}</td>
            </tr>
          );
        })}
      </DataTable>
    </>
  );
}
