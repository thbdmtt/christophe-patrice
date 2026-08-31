import useReveal from "../hooks/useReveal";
import miseEnBouteille from "../assets/images/pro-miseenbouteille.jpg";
import gammeImg from "../assets/images/pro-gamme.jpg";
import { useLanguage } from "../i18n";
import "./Professionnel.css";

export default function Professionnel() {
  const ref = useReveal();
  const { t } = useLanguage();
  const subject = encodeURIComponent(t.professional.subject);

  return (
    <section id="professionnel" className="pro on-dark">
      <div className="pro-bg">
        <img src={miseEnBouteille} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="wrap pro-inner reveal" ref={ref}>
        <div>
          <span className="eyebrow">{t.professional.eyebrow}</span>
          <h2>{t.professional.title}</h2>
          <p>{t.professional.text}</p>
          <div className="cta-row">
            <a
              className="btn"
              href={`mailto:christophe.patrice@orange.fr?subject=${subject}`}
            >
              {t.professional.cta}
            </a>
          </div>
          <ul className="pro-list">
            {t.professional.services.map((service, index) => (
              <li key={service}>
                <span className="i">{String(index + 1).padStart(2, "0")}</span>
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </div>
        <figure className="pro-card hover-caption" tabIndex={0}>
          <img
            src={gammeImg}
            alt={t.professional.imageAlt}
            loading="lazy"
          />
          <figcaption className="hover-caption-text">{t.professional.imageCaption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
