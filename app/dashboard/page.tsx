import Link from "next/link";
import { getProperty, properties, type PropertyStatus } from "@/config/catalog";
import { leads } from "@/config/crm";
import { siteConfig } from "@/config/site.config";
import { DataTable, PageHeader } from "@/components/dashboard-ui";

const countByStatus = (status: PropertyStatus) =>
  properties.filter((p) => p.status === status).length;

// Mock figures; replace with real queries when the data layer exists.
const kpis = [
  { label: "Propiedades disponibles", value: String(countByStatus("Available")), delta: `de ${properties.length} publicadas` },
  { label: "Propiedades vendidas", value: String(countByStatus("Sold")), delta: `${countByStatus("Reserved")} reservadas` },
  { label: "Consultas abiertas", value: String(leads.length), delta: "+14 hoy" },
  { label: "Ingresos del mes", value: "USD 2.840.000", delta: "+8% vs. mes anterior" },
];

export default function DashboardOverviewPage() {
  const latestLeads = [...leads].sort((a, b) => b.score - a.score).slice(0, 4);

  return (
    <>
      <PageHeader eyebrow={siteConfig.tagline} title="Panel de Control" />

      <section aria-label="Indicadores clave" className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="flex flex-col gap-4 rounded-2xl border border-fg/10 bg-surface/70 p-6 backdrop-blur-md"
          >
            <span className="text-sm text-fg/60">{kpi.label}</span>
            <span className="font-serif text-4xl">{kpi.value}</span>
            <span className="text-xs text-fg/50">{kpi.delta}</span>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-3xl">Últimas consultas</h2>
          <Link href="/dashboard/leads" className="text-sm text-fg/60 transition-colors duration-200 hover:text-fg">
            Ver todas
          </Link>
        </div>
        <DataTable headers={["Lead", "Propiedad de interés", "Etapa", "Puntaje"]}>
          {latestLeads.map((l) => (
            <tr key={l.name + l.propertyId} className="border-t border-fg/10">
              <td className="py-4 pr-6">{l.name}</td>
              <td className="py-4 pr-6 text-fg/60">{getProperty(l.propertyId)?.name}</td>
              <td className="py-4 pr-6">{l.stage}</td>
              <td className="py-4 font-serif text-lg">{l.score}</td>
            </tr>
          ))}
        </DataTable>
      </section>
    </>
  );
}
