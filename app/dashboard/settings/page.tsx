import { siteConfig } from "@/config/site.config";
import { PageHeader } from "@/components/dashboard-ui";

function SettingsCard({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-fg/10 bg-surface/70 p-6 backdrop-blur-md">
      <h2 className="font-serif text-xl">{title}</h2>
      <dl className="flex flex-col gap-3 text-sm">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-6 border-t border-fg/10 pt-3 first:border-t-0 first:pt-0"
          >
            <dt className="text-fg/60">{label}</dt>
            <dd className="truncate text-right">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function DashboardSettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sistema"
        title="Configuración"
        description={
          <>Solo lectura. Para modificar estos valores, edite <code className="text-fg/80">config/site.config.ts</code>.</>
        }
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SettingsCard
          title="Operaciones"
          rows={[
            ["Moneda", siteConfig.settings.currency],
            ["Configuración regional", siteConfig.settings.locale],
            ["Notificaciones de leads", siteConfig.settings.enableLeadNotification ? "Activadas" : "Desactivadas"],
            ["Asignación automática de leads", siteConfig.settings.autoAssignLeads ? "Activada" : "Desactivada"],
          ]}
        />
        <SettingsCard
          title="Contacto"
          rows={[
            ["Correo electrónico", siteConfig.contact.email],
            ["Teléfono", siteConfig.contact.phone],
            ["Dirección", `${siteConfig.address.street}, ${siteConfig.address.city}`],
          ]}
        />
      </div>
    </>
  );
}
