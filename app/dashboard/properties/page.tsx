import Link from "next/link";
import { badgeLabel, properties } from "@/config/catalog";
import { formatPrice } from "@/lib/format";
import { DataTable, PageHeader, propertyStatusTone } from "@/components/dashboard-ui";

export default function DashboardPropertiesPage() {
  const available = properties.filter((p) => p.status === "Available").length;

  return (
    <>
      <PageHeader
        eyebrow="Gestión"
        title="Propiedades"
        description={`${properties.length} propiedades publicadas, ${available} disponibles.`}
      />

      <DataTable headers={["Propiedad", "Ubicación", "Operación", "Precio", "Estado", ""]}>
        {properties.map((p) => (
          <tr key={p.id} className="border-t border-fg/10">
            <td className="py-4 pr-6">{p.name}</td>
            <td className="py-4 pr-6 text-fg/60">{p.location}</td>
            <td className="py-4 pr-6 text-fg/60">{p.operation}</td>
            <td className="py-4 pr-6">{formatPrice(p.price)}</td>
            <td className="py-4 pr-6">
              <span className={`rounded-full border px-3 py-1 text-xs ${propertyStatusTone[p.status]}`}>
                {badgeLabel(p)}
              </span>
            </td>
            <td className="py-4 text-right">
              <Link
                href={`/properties/${p.id}`}
                className="text-xs text-fg/60 underline-offset-4 transition-colors duration-200 hover:text-fg hover:underline"
              >
                Ver ficha
              </Link>
            </td>
          </tr>
        ))}
      </DataTable>
    </>
  );
}
