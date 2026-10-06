"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

const BACKGROUND_IMAGE =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2560&auto=format&fit=crop";

const inputClass =
  "w-full rounded-xl border border-fg/10 bg-fg/5 px-4 py-3.5 text-sm text-fg placeholder:text-fg/30 transition-[border-color,background-color] duration-200 focus:border-fg/40 focus:bg-fg/10 focus:outline-none focus:ring-0";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? "No se pudo iniciar sesión. Intenta de nuevo.");
        setSubmitting(false);
        return;
      }

      const next = new URLSearchParams(window.location.search).get("next");
      const destination = next && next.startsWith("/") ? next : "/dashboard";
      router.push(destination);
      router.refresh();
    } catch {
      setError("No se pudo conectar. Revisa tu conexión e intenta de nuevo.");
      setSubmitting(false);
    }
  }

  return (
    <main className="relative h-screen min-h-screen w-full overflow-hidden bg-canvas font-sans text-fg">
      {/* Full-bleed background */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BACKGROUND_IMAGE}
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-transparent to-canvas/40" />
      </div>

      <div className="relative z-10 grid h-full w-full grid-cols-1 lg:grid-cols-2">
        {/* Left column: brand presence over the image */}
        <div className="hidden flex-col justify-between p-12 text-white lg:flex lg:p-16">
          <span className="font-serif text-2xl italic tracking-wide">Pegasus Talos</span>

          <div className="max-w-md">
            <p className="mb-3 font-serif text-2xl leading-snug text-white/90">
              &ldquo;Propiedades exclusivas en la costa.&rdquo;
            </p>
            <p className="text-xs tracking-widest text-white/50 uppercase">
              Inmobiliaria &amp; Desarrollos
            </p>
          </div>
        </div>

        {/* Right column: glass panel with the form */}
        <div className="flex flex-col justify-between border-l border-fg/10 bg-canvas/50 p-8 backdrop-blur-md sm:p-12 lg:p-16">
          <div className="flex w-full items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium tracking-wider text-fg/60 uppercase transition-colors duration-200 hover:text-fg"
            >
              <ArrowLeft size={14} aria-hidden />
              Volver al sitio
            </Link>

            <span className="font-serif text-lg italic lg:hidden">Pegasus Talos</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto my-auto w-full max-w-sm py-8"
          >
            <div className="mb-10">
              <h1 className="mb-3 font-serif text-4xl leading-tight font-normal">
                Pegasus Talos
              </h1>
              <p className="text-sm text-fg/60">
                Ingresa tus credenciales para acceder al sistema.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="mb-2 block text-xs tracking-wider text-fg/60 uppercase">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@ejemplo.com"
                  className={inputClass}
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="password" className="block text-xs tracking-wider text-fg/60 uppercase">
                    Contraseña
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-fg/50 transition-colors duration-200 hover:text-fg"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`${inputClass} pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    aria-pressed={showPassword}
                    className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-fg/50 transition-colors duration-200 hover:text-fg"
                  >
                    {showPassword ? <EyeOff size={16} aria-hidden /> : <Eye size={16} aria-hidden />}
                  </button>
                </div>
              </div>

              {error && (
                <p role="alert" className="text-sm text-red-300/90">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 w-full rounded-xl bg-fg py-3.5 text-sm font-medium text-canvas shadow-[0_0_0_rgba(255,255,255,0)] transition-[background-color,transform,box-shadow] duration-300 ease-out hover:bg-fg/90 hover:shadow-[0_0_32px_rgba(255,255,255,0.22)] active:scale-[0.99] disabled:opacity-60"
              >
                {submitting ? "Ingresando…" : "Iniciar sesión"}
              </button>
            </form>
          </motion.div>

          <p className="text-xs text-fg/40">
            &copy; {new Date().getFullYear()} Pegasus Talos. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </main>
  );
}
