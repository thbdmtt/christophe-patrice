import { useLanguage } from "../i18n";
import "./Footer.css";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <span className="wordmark">Christophe Patrice</span>
            <p style={{ maxWidth: "38ch", color: "var(--texte-sombre-muted)", fontSize: ".88rem", marginTop: "14px" }}>
              {t.footer.intro}
            </p>
          </div>
          <div>
            <h4>{t.footer.domain}</h4>
            <ul>
              {t.footer.links.map(([href, label]) => (
                <li key={href}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{t.footer.contact}</h4>
            <ul>
              <li>
                <a href="tel:+33660233752">+33 6 60 23 37 52</a>
              </li>
              <li>
                <a href="mailto:christophe.patrice@orange.fr">christophe.patrice@orange.fr</a>
              </li>
              <li>52 Route Nationale, 89800 Beine</li>
              <li><a href="#contact">{t.footer.visit}</a></li>
              <li><a href="#contact">{t.footer.prices}</a></li>
            </ul>
          </div>
        </div>
        <div className="legal-strip">
          <span>{t.footer.copyright}</span>
          <span>{t.footer.legalPending}</span>
        </div>
        <p className="warning">{t.footer.warning}</p>
      </div>
    </footer>
  );
}
