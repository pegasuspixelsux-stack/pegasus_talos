import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bath, Bed, Car, Check, MapPin, Maximize2 } from "lucide-react";
import { badgeLabel, getProperty, properties, type PropertyStatus } from "@/config/catalog";
import { siteConfig } from "@/config/site.config";
import { formatPrice } from "@/lib/format";
import Footer from "@/components/Footer";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyContactCard from "@/components/PropertyContactCard";

const badgeTone: Record<PropertyStatus, string> = {
  Available: "bg-white text-[#0D0E12]",
  Reserved: "bg-amber-500/90 text-[#0D0E12]",
  Sold: "bg-white/20 text-white",
};

export function generateStaticParams() {
  return properties.map((property) => ({ id: property.id }));
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = getProperty(id);
  if (!property) notFound();

  // Lots have no rooms or garages; show a dash instead of "0".
  const count = (n: number) => (n > 0 ? String(n) : "—");
  const specs = [
    { label: "m² totales", value: `${property.specs.sqm.toLocaleString("es-UY")} m²`, icon: Maximize2 },
    { label: "Dormitorios", value: count(property.specs.bedrooms), icon: Bed },
    { label: "Baños", value: count(property.specs.bathrooms), icon: Bath },
    { label: "Cocheras / Garajes", value: count(property.specs.parking), icon: Car },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-canvas text-fg">
      <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-fg/10 bg-canvas/80 px-6 py-4 backdrop-blur-md">
        <Link href="/" className="font-serif text-xl italic">
          {siteConfig.name}
        </Link>
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-xs font-medium tracking-wider text-fg/60 uppercase transition-colors duration-200 hover:text-fg"
        >
          <ArrowLeft size={14} aria-hidden />
          Volver al catálogo
        </Link>
      </nav>

      <PropertyGallery images={property.images} alt={property.name}>
        <div className="absolute inset-x-0 bottom-8 z-20 mx-auto w-full max-w-[1440px] px-6 text-white md:px-12">
        <div className="max-w-2xl">
          <span className="mb-3 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs tracking-widest text-white/80 uppercase backdrop-blur-md">
            {property.area}
          </span>
          <h1 className="mb-3 font-serif text-4xl leading-tight font-normal lg:text-6xl">
            {property.name}
          </h1>
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="font-serif text-2xl">{formatPrice(property.price)}</span>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${badgeTone[property.status]}`}>
              {badgeLabel(property)}
            </span>
          </div>
          <p className="flex items-center gap-1.5 text-xs text-white/70">
            <MapPin size={14} aria-hidden />
            {property.location}
          </p>
        </div>
        </div>
      </PropertyGallery>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-12 md:px-12 lg:py-16">
        <section className="grid grid-cols-2 gap-4 rounded-2xl border border-fg/10 bg-surface/70 p-4 backdrop-blur-md md:grid-cols-4 md:p-6">
          {specs.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="rounded-xl bg-fg/10 p-3">
                <Icon size={20} strokeWidth={1.5} aria-hidden />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs tracking-wider text-fg/50 uppercase">{label}</span>
                <span className="text-sm font-semibold">{value}</span>
              </div>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="flex flex-col gap-16 lg:col-span-2">
            <section className="flex flex-col gap-6">
              <h2 className="font-serif text-3xl">Descripción de la Propiedad</h2>
              {property.description.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="max-w-prose text-base leading-relaxed text-fg/70">
                  {paragraph}
                </p>
              ))}
            </section>

            <section className="flex flex-col gap-6">
              <h2 className="font-serif text-3xl">Características y Amenities</h2>
              <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                {property.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-3 border-b border-fg/10 pb-4 text-sm text-fg/80">
                    <Check size={14} aria-hidden className="shrink-0" />
                    {amenity}
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col gap-6">
              <h2 className="font-serif text-3xl">Ubicación y Entorno</h2>
              <p className="flex items-center gap-2 text-sm text-fg/70">
                <MapPin size={16} aria-hidden />
                {property.location}
              </p>
              <p className="text-sm text-fg/50">
                El mapa y las distancias a puntos de interés se publicarán cuando estén confirmadas las coordenadas de la propiedad.
              </p>
            </section>
          </div>

          <div id="consulta" className="scroll-mt-24">
            <PropertyContactCard propertyName={property.name} price={formatPrice(property.price)} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
