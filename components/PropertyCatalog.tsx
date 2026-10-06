"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { badgeLabel, properties, type PropertyStatus } from "@/config/catalog";
import { siteConfig } from "@/config/site.config";
import { formatPrice } from "@/lib/format";

const statusTone: Record<PropertyStatus, string> = {
  Available: "text-emerald-500 border-emerald-500/40",
  Reserved: "text-amber-600 border-amber-600/40",
  Sold: "text-fg/50 border-fg/15",
};

const fieldClass =
  "w-full rounded-full border border-fg/15 bg-surface/70 px-5 py-3 text-sm text-fg placeholder:text-fg/40 focus:border-fg/40 focus:outline-none";

const PAGE_SIZE = 12;

const operations = Array.from(new Set(properties.map((property) => property.operation)));
interface PropertyCatalogProps {
  /** Zone pre-selected from the URL (e.g. the homepage zone cards). */
  initialArea?: string;
}

export default function PropertyCatalog({ initialArea = "" }: PropertyCatalogProps) {
  const [query, setQuery] = useState("");
  const [operation, setOperation] = useState("");
  const [area, setArea] = useState(initialArea);

  // Include the requested zone even when it has no listings yet, so the dropdown matches the results.
  const areas = Array.from(new Set([...properties.map((property) => property.area), ...(initialArea ? [initialArea] : [])])).sort();
  const [minBedrooms, setMinBedrooms] = useState(0);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return properties.filter((property) => {
      if (term && !`${property.name} ${property.location} ${property.area}`.toLowerCase().includes(term)) {
        return false;
      }
      if (operation && property.operation !== operation) return false;
      if (area && property.area !== area) return false;
      if (property.specs.bedrooms < minBedrooms) return false;
      return true;
    });
  }, [query, operation, area, minBedrooms]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const hasFilters = query !== "" || operation !== "" || area !== "" || minBedrooms > 0;

  // Every filter change starts again from the first page of results.
  function updateFilter<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value);
      setPage(1);
    };
  }

  function clearFilters() {
    setQuery("");
    setOperation("");
    setArea("");
    setMinBedrooms(0);
    setPage(1);
  }

  return (
    <>
      <form
        role="search"
        onSubmit={(event) => event.preventDefault()}
        className="mb-12 flex flex-col gap-4 rounded-2xl border border-fg/10 bg-surface/50 p-4 backdrop-blur-md md:p-5"
      >
        <div className="relative">
          <Search size={16} aria-hidden className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-fg/40" />
          <input
            type="search"
            value={query}
            onChange={(event) => updateFilter(setQuery)(event.target.value)}
            placeholder="Buscar por nombre, zona o ubicación"
            aria-label="Buscar propiedades"
            className={`${fieldClass} pl-11`}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <select
            value={operation}
            onChange={(event) => updateFilter(setOperation)(event.target.value)}
            aria-label="Operación"
            className={fieldClass}
          >
            <option value="">Todas las operaciones</option>
            {operations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={area}
            onChange={(event) => updateFilter(setArea)(event.target.value)}
            aria-label="Zona"
            className={fieldClass}
          >
            <option value="">Todas las zonas</option>
            {areas.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={minBedrooms}
            onChange={(event) => updateFilter(setMinBedrooms)(Number(event.target.value))}
            aria-label="Dormitorios mínimos"
            className={fieldClass}
          >
            <option value={0}>Cualquier cantidad de dormitorios</option>
            {[1, 2, 3, 4, 5].map((count) => (
              <option key={count} value={count}>
                {count}+ dormitorios
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={clearFilters}
            disabled={!hasFilters}
            className="flex items-center justify-center gap-2 rounded-full border border-fg/30 px-5 py-3 text-sm font-medium transition-[background-color,opacity] duration-200 hover:bg-fg/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <X size={14} aria-hidden />
            Limpiar filtros
          </button>
        </div>
      </form>

      <p className="mb-8 text-sm text-fg/60" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "propiedad" : "propiedades"}
        {totalPages > 1 && ` · página ${currentPage} de ${totalPages}`}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-fg/15 px-6 py-16 text-center">
          <p className="font-serif text-2xl">No encontramos propiedades con esos filtros.</p>
          <p className="mt-3 text-sm text-fg/60">Probá con otra zona o quitá algún filtro.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {pageItems.map((property) => (
            <Link
              key={property.id}
              href={`/properties/${property.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-fg/10 bg-surface/70 backdrop-blur-md transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-fg/15"
            >
              <div className="relative aspect-video overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={siteConfig.assets.placeholderProperty}
                  alt={property.name}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-center justify-between text-xs text-fg/60">
                  <span>{property.location}</span>
                  <span className={`shrink-0 rounded-full border px-3 py-1 ${statusTone[property.status]}`}>
                    {badgeLabel(property)}
                  </span>
                </div>
                <h2 className="font-serif text-2xl leading-snug">{property.name}</h2>
                <p className="text-sm text-fg/60">{formatPrice(property.price)}</p>
                <span className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-medium text-fg/80 transition-colors duration-200 group-hover:text-fg">
                  Ver propiedad
                  <ArrowRight size={14} aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <nav aria-label="Paginación" className="mt-16 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1.5 rounded-full border border-fg/30 px-5 py-2.5 text-sm font-medium transition-[background-color,opacity] duration-200 hover:bg-fg/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={14} aria-hidden />
            Anterior
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => setPage(number)}
              aria-current={number === currentPage ? "page" : undefined}
              className={`h-10 w-10 rounded-full text-sm font-medium transition-colors duration-200 ${
                number === currentPage ? "bg-fg text-canvas" : "text-fg/70 hover:bg-fg/10 hover:text-fg"
              }`}
            >
              {number}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1.5 rounded-full border border-fg/30 px-5 py-2.5 text-sm font-medium transition-[background-color,opacity] duration-200 hover:bg-fg/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Siguiente
            <ChevronRight size={14} aria-hidden />
          </button>
        </nav>
      )}
    </>
  );
}
