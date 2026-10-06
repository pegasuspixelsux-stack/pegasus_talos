import { siteConfig } from "@/config/site.config";

/** Formats a price as "USD 1.850.000" using the site currency and locale. */
export function formatPrice(value: number): string {
  const amount = new Intl.NumberFormat(siteConfig.settings.locale, {
    maximumFractionDigits: 0,
  }).format(value);
  return `${siteConfig.settings.currency} ${amount}`;
}
