import useReveal from "../hooks/useReveal";
import { useLanguage } from "../i18n";
import ContactForm from "./ContactForm";
import gitebg from "../assets/images/gite-fond-village.jpg";
import gite1 from "../assets/images/gite-facade.jpg";
import gite2 from "../assets/images/gite-terrasse.jpg";
import gite3 from "../assets/images/gite-salon.jpg";
import "./Visiter.css";

const BEINE_DIRECTIONS =
  "https://www.google.com/maps/search/?api=1&query=52%20Route%20Nationale%2C%2089800%20Beine%2C%20France";
const IRANCY_DIRECTIONS =
  "https://www.google.com/maps/search/?api=1&query=7%20Chemin%20des%20Foss%C3%A9s%2C%2089800%20Irancy%2C%20France";

function VisitActions({ directions, t }) {
  return (
    <div className="visit-actions">
      <a href={directions} target="_blank" rel="noreferrer">{t.directions} ↗</a>
      <a href="tel:+33660233752">{t.call}</a>
      <a href="mailto:christophe.patrice@orange.fr">{t.write}</a>
    </div>
  );
}

export default function Visiter() {
  const headRef = useReveal();
  const gridRef = useReveal();
  const servicesRef = useReveal();
  const contactRef = useReveal();
  const noteRef = useReveal();
  const galleryRef = useReveal();
  const { t } = useLanguage();
  const visit = t.visit;

  return (
    <section id="visiter">
      <div className="wrap">
        <div className="head-row reveal" ref={headRef}>
          <div>
            <span className="eyebrow">{visit.eyebrow}</span>
            <h2>{visit.title}</h2>
          </div>
          <p className="dek">{visit.dek}</p>
        </div>

        <div className="visit-grid reveal" ref={gridRef}>
          <div className="visit-card">
            <span className="k">{visit.white}</span>
            <h3>Beine</h3>
            <address>
              52 Route Nationale, 89800 Beine
              <br />
              {visit.tastingRoom}
            </address>
            <p className="hours">
              {visit.weekdays}
              <br />
              <b>{visit.hoursBeine}</b>
              <br />
              {visit.appointment}
              <br />
              {visit.closed}
            </p>
            <div className="closure">{visit.closureBeine}</div>
            <VisitActions directions={BEINE_DIRECTIONS} t={visit} />
          </div>
          <div className="visit-card">
            <span className="k">{visit.red}</span>
            <h3>Irancy</h3>
            <address>7 Chemin des Fossés, 89800 Irancy</address>
            <p className="hours">
              {visit.weekdays}
              <br />
              <b>{visit.hoursIrancy}</b>
              <br />
              {visit.appointment}
              <br />
              {visit.closed}
            </p>
            <div className="closure">{visit.closureIrancy}</div>
            <VisitActions directions={IRANCY_DIRECTIONS} t={visit} />
          </div>
        </div>

        <div className="visitor-services reveal" ref={servicesRef}>
          <h3>{visit.servicesTitle}</h3>
          <div className="visitor-service-grid">
            {visit.services.map(([marker, label]) => (
              <div className="visitor-service" key={label}>
                <span className="service-marker">{marker}</span>
                <p>{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-panel reveal" id="contact" ref={contactRef}>
          <div className="contact-copy">
            <span className="eyebrow">{visit.contactEyebrow}</span>
            <h3>{visit.contactTitle}</h3>
            <p>{visit.contactText}</p>
            <div className="contact-direct">
              <a href="tel:+33660233752">+33 6 60 23 37 52</a>
              <a href="mailto:christophe.patrice@orange.fr">christophe.patrice@orange.fr</a>
            </div>
          </div>
          <ContactForm />
        </div>

        <div className="gite-note reveal" ref={noteRef}>
          <div className="gn-bg">
            <img src={gitebg} alt="" />
          </div>
          <div>
            <h3>{visit.giteTitle}</h3>
            <p>{visit.giteText}</p>
          </div>
          <a
            className="btn ghost"
            href="https://www.gitedelaeti.com/"
            target="_blank"
            rel="noreferrer"
            aria-label={visit.giteAria}
          >
            {visit.giteCta}
          </a>
        </div>
        <div className="gite-gallery reveal" ref={galleryRef}>
          <figure className="hover-caption" tabIndex={0}>
            <img src={gite1} alt={visit.gitePhotos[0][0]} loading="lazy" />
            <figcaption className="hover-caption-text">{visit.gitePhotos[0][1]}</figcaption>
          </figure>
          <figure className="hover-caption" tabIndex={0}>
            <img src={gite2} alt={visit.gitePhotos[1][0]} loading="lazy" />
            <figcaption className="hover-caption-text">{visit.gitePhotos[1][1]}</figcaption>
          </figure>
          <figure className="hover-caption" tabIndex={0}>
            <img src={gite3} alt={visit.gitePhotos[2][0]} loading="lazy" />
            <figcaption className="hover-caption-text">{visit.gitePhotos[2][1]}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
