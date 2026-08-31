import useReveal from "../hooks/useReveal";
import portraitChristophe from "../assets/images/domaine-portrait-christophe.jpg";
import controleCuve from "../assets/images/domaine-controle-cuve.jpg";
import facade from "../assets/images/domaine-facade.jpg";
import { useLanguage } from "../i18n";
import "./Domaine.css";

export default function Domaine() {
  const headRef = useReveal();
  const gridRef = useReveal();
  const photosRef = useReveal();
  const { t } = useLanguage();

  return (
    <section id="domaine">
      <div className="wrap">
        <div className="head-row reveal" ref={headRef}>
          <div>
            <span className="eyebrow">{t.domaine.eyebrow}</span>
            <h2>{t.domaine.title}</h2>
          </div>
          <p className="dek">{t.domaine.dek}</p>
        </div>

        <div className="domaine-grid reveal" ref={gridRef}>
          <div>
            {t.domaine.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <a className="link-more" href="#terroir">
              {t.domaine.link} →
            </a>
          </div>
          <ul className="timeline">
            {t.domaine.timeline.map(([year, text]) => (
              <li key={year + text}>
                <span className="y num">{year}</span>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="photo-trio reveal" ref={photosRef}>
          <figure className="hover-caption" tabIndex={0}>
            <img src={portraitChristophe} alt={t.domaine.photos[0][0]} loading="lazy" />
            <figcaption className="hover-caption-text">{t.domaine.photos[0][1]}</figcaption>
          </figure>
          <figure className="hover-caption" tabIndex={0}>
            <img src={controleCuve} alt={t.domaine.photos[1][0]} loading="lazy" />
            <figcaption className="hover-caption-text">{t.domaine.photos[1][1]}</figcaption>
          </figure>
          <figure className="hover-caption" tabIndex={0}>
            <img src={facade} alt={t.domaine.photos[2][0]} loading="lazy" />
            <figcaption className="hover-caption-text">{t.domaine.photos[2][1]}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
