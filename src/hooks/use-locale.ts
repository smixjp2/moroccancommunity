"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Locale = "fr" | "en";

export function useLocale(): Locale {
  const searchParams = useSearchParams();
  const langParam = searchParams.get("lang");
  const [locale, setLocale] = useState<Locale>("fr");

  useEffect(() => {
    let initial: Locale = "fr";
    const savedLocale = localStorage.getItem("locale") as Locale | null;

    if (langParam === "fr" || langParam === "en") {
      initial = langParam;
      localStorage.setItem("locale", langParam);
      document.cookie = `locale=${langParam}; path=/; max-age=31536000`;
    } else if (savedLocale === "fr" || savedLocale === "en") {
      initial = savedLocale;
    } else if (typeof navigator !== "undefined") {
      initial = navigator.language.startsWith("en") ? "en" : "fr";
      localStorage.setItem("locale", initial);
      document.cookie = `locale=${initial}; path=/; max-age=31536000`;
    }

    setLocale(initial);
  }, [langParam]);

  return locale;
}
