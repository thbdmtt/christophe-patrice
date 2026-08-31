import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { copy } from "./data/copy";

const LanguageContext = createContext(null);

function getInitialLanguage() {
  const requested = new URLSearchParams(window.location.search).get("lang");
  return requested === "en" ? "en" : "fr";
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);

  useEffect(() => {
    const content = copy[language];
    document.documentElement.lang = language;
    document.title = content.meta.title;

    const description = document.querySelector('meta[name="description"]');
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (description) description.content = content.meta.description;
    if (ogLocale) ogLocale.content = language === "en" ? "en_GB" : "fr_FR";
    if (ogTitle) ogTitle.content = content.meta.title;
    if (ogDescription) ogDescription.content = content.meta.ogDescription;
  }, [language]);

  function setLanguage(nextLanguage) {
    const next = nextLanguage === "en" ? "en" : "fr";
    const url = new URL(window.location.href);
    if (next === "en") url.searchParams.set("lang", "en");
    else url.searchParams.delete("lang");
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
    setLanguageState(next);
  }

  const value = useMemo(
    () => ({ language, setLanguage, t: copy[language] }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
