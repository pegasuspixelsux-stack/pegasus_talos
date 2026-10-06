"use client";

import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "pt-theme";

const options: { value: Theme; label: string }[] = [
  { value: "light", label: "Claro" },
  { value: "dark", label: "Oscuro" },
];

// Reads the attribute the inline script in the layout sets on <html>.
// Light is the default, so with no attribute the snapshot is "light".
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function getServerTheme(): Theme {
  return "light";
}

export default function ThemeSelector() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  function choose(next: Theme) {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (private mode). The choice still applies for this visit.
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label="Tema"
      className="inline-flex items-center rounded-full border border-fg/15 p-1"
    >
      {options.map((option) => {
        const selected = theme === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => choose(option.value)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-[background-color,color,transform] duration-200 ease-out active:scale-[0.97] ${
              selected ? "bg-fg text-canvas" : "text-fg/60 hover:text-fg"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
