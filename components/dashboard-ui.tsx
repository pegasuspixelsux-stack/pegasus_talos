import type { ReactNode } from "react";
import type { PropertyStatus } from "@/config/catalog";

export const propertyStatusTone: Record<PropertyStatus, string> = {
  Available: "text-emerald-500 border-emerald-500/40",
  Reserved: "text-amber-600 border-amber-600/40",
  Sold: "text-fg/50 border-fg/15",
};

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-2">
      {eyebrow && <p className="text-sm text-fg/60">{eyebrow}</p>}
      <h1 className="font-serif text-4xl leading-tight md:text-5xl">{title}</h1>
      {description && <p className="text-sm text-fg/60">{description}</p>}
    </header>
  );
}

export function DataTable({ headers, children }: { headers: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-fg/10 bg-surface/70 px-6 backdrop-blur-md">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} scope="col" className="py-4 pr-6 text-xs font-medium text-fg/50 last:pr-0">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
