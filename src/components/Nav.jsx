import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n";
import "./Nav.css";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24);
  const toggleRef = useRef(null);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    function updateScrolledState() {
      setScrolled(window.scrollY > 24);
    }

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("nav-scroll-lock", open);

    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    if (main) main.inert = open;
    if (footer) footer.inert = open;

    function onKeyDown(event) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.classList.remove("nav-scroll-lock");
      if (main) main.inert = false;
      if (footer) footer.inert = false;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}${open ? " menu-active" : ""}`}>
      <div className={`nav-inner${open ? " nav-open" : ""}`}>
        <a className="wordmark" href="#hero" onClick={() => setOpen(false)}>
          Christophe Patrice
          <small>{t.nav.subtitle}</small>
        </a>
        <nav
          className={`links${open ? " open" : ""}`}
          id="navLinks"
          aria-label={t.nav.label}
        >
          {t.nav.links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <div className="language-switcher" role="group" aria-label={t.nav.language}>
            {["fr", "en"].map((code) => (
              <a
                key={code}
                href={code === "en" ? "?lang=en" : window.location.pathname}
                lang={code}
                aria-current={language === code ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  setLanguage(code);
                }}
              >
                {code.toUpperCase()}
              </a>
            ))}
          </div>
          <a className="nav-phone" href="tel:+33660233752" aria-label="+33 6 60 23 37 52">
            06 60 23 37 52
          </a>
        </div>
        <button
          ref={toggleRef}
          className="nav-toggle"
          aria-label={open ? t.nav.close : t.nav.open}
          aria-expanded={open}
          aria-controls="navLinks"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
}
