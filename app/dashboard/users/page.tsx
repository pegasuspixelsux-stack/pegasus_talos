import { contacts } from "@/config/crm";
import { DataTable, PageHeader } from "@/components/dashboard-ui";

export default function DashboardUsersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gestión"
        title="Usuarios & Clientes"
        description={`${contacts.length} contactos registrados.`}
      />

      <DataTable headers={["Nombre", "Correo electrónico", "Origen", "Alta"]}>
        {contacts.map((c) => (
          <tr key={c.email} className="border-t border-fg/10">
            <td className="py-4 pr-6">{c.name}</td>
            <td className="py-4 pr-6 text-fg/60">{c.email}</td>
            <td className="py-4 pr-6 text-fg/60">{c.source}</td>
            <td className="py-4 text-fg/60">{c.added}</td>
          </tr>
        ))}
      </DataTable>
    </>
  );
}
