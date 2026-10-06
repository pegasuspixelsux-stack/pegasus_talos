"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/config/site.config";

const NAV_ITEMS: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Panel de Control", href: "/dashboard", icon: LayoutDashboard },
  { label: "Propiedades", href: "/dashboard/properties", icon: Building2 },
  { label: "Usuarios & Clientes", href: "/dashboard/users", icon: Users },
  { label: "Leads & Consultas", href: "/dashboard/leads", icon: MessageSquare },
  { label: "Configuración", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // The overview only matches exactly; the other pages also match their sub-routes.
  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{ type: "spring", stiffness: 260, damping: 32 }}
      className="sticky top-0 flex h-screen shrink-0 flex-col justify-between overflow-hidden border-r border-fg/10 bg-surface/60 p-4 backdrop-blur-md"
    >
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-between gap-2 px-2 pt-2">
          {!collapsed && <span className="truncate font-serif text-xl italic">{siteConfig.name}</span>}
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expandir menú" : "Contraer menú"}
            aria-expanded={!collapsed}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-fg/15 text-fg/70 transition-[background-color,transform] duration-200 hover:bg-fg/10 hover:text-fg active:scale-[0.94]"
          >
            {collapsed ? <ChevronRight size={16} aria-hidden /> : <ChevronLeft size={16} aria-hidden />}
          </button>
        </div>

        <nav aria-label="Panel de control" className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                title={collapsed ? label : undefined}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-200 ${
                  active ? "bg-fg/10 text-fg" : "text-fg/60 hover:bg-fg/5 hover:text-fg"
                }`}
              >
                <Icon size={18} strokeWidth={1.5} aria-hidden className="shrink-0" />
                {!collapsed && <span className="truncate">{label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <Link
        href="/"
        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-fg/50 transition-colors duration-200 hover:text-fg ${
          collapsed ? "justify-center" : ""
        }`}
      >
        {collapsed ? "←" : "← Volver al sitio"}
      </Link>
    </motion.aside>
  );
}
