import Link from "next/link";
import { zoneBySlug } from "@/config/catalog";
import { siteConfig } from "@/config/site.config";
import Footer from "@/components/Footer";
import PropertyCatalog from "@/components/PropertyCatalog";

export default async function PropertiesCatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ zona?: string }>;
}) {
  const { zona } = await searchParams;
  const initialArea = zoneBySlug(zona)?.area;

  return (
    <div className="flex min-h-screen w-full flex-col bg-canvas text-fg">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-fg/10 bg-canvas/80 px-6 py-5 backdrop-blur-md lg:px-16">
        <Link href="/" className="font-serif text-xl italic">
          {siteConfig.name}
        </Link>
        <Link href="/" className="text-sm text-fg/60 transition-colors duration-200 hover:text-fg">
          Inicio
        </Link>
      </nav>

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-6 py-24 lg:px-16 lg:py-32">
        <header className="mb-16 flex flex-col gap-4">
          <p className="text-sm text-fg/60">{siteConfig.tagline}</p>
          <h1 className="font-serif text-4xl leading-tight md:text-5xl">Propiedades</h1>
        </header>

        <PropertyCatalog initialArea={initialArea} />
      </main>

      <Footer />
    </div>
  );
}
