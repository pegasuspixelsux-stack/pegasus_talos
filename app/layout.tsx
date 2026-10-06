import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Inmobiliaria | Propiedades Exclusivas y Desarrollos en la Costa",
  description:
    "Especialistas en la comercialización, desarrollo e inversión de propiedades exclusivas en Punta del Este y la costa.",
};

// Runs before first paint so a saved dark theme never flashes light.
const themeScript = `try{if(localStorage.getItem("pt-theme")==="dark"){document.documentElement.dataset.theme="dark"}}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-canvas text-fg font-sans">
        {children}
      </body>
    </html>
  );
}
