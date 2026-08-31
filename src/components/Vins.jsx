import useReveal from "../hooks/useReveal";
import { medalsByLanguage, order, winesByLanguage } from "../data/wines";
import vinsImg from "../assets/images/vins-collection.jpg";
import { useLanguage } from "../i18n";
import "./Vins.css";

export default function Vins({ onGoToTerroir }) {
  const headRef = useReveal();
  const headerRef = useReveal();
  const listRef = useReveal();
  const { language, t } = useLanguage();
  const wines = winesByLanguage[language];
  const medals = medalsByLanguage[language];
  const priceSubject = encodeURIComponent(t.professional.subject);

  return (
    <section id="vins">
      <div className="wrap">
        <div className="head-row reveal" ref={headRef}>
          <div>
            <span className="eyebrow">{t.vins.eyebrow}</span>
            <h2>{t.vins.title}</h2>
          </div>
          <p className="dek">{t.vins.dek}</p>
        </div>

        <figure className="vins-header hover-caption reveal" ref={headerRef} tabIndex={0}>
          <img
            src={vinsImg}
            alt={t.vins.imageAlt}
            loading="lazy"
          />
          <figcaption className="hover-caption-text">{t.vins.imageCaption}</figcaption>
        </figure>

        <div className="collection reveal" ref={listRef}>
          {order.map((id) => {
            const wine = wines[id];
            const wineMedals = medals[id];
            const years = Object.keys(wineMedals);
            return (
              <div className="wine-row" key={id}>
                <div>
                  <div className="name">{wine.name}</div>
                  <div className="meta">
                    {wine.kicker} · {wine.commune}
                  </div>
                </div>
                <div>
                  <p className="note" style={{ marginTop: 0 }}>
                    {wine.note}
                  </p>
                  <div className="archive">
                    <span className="archive-label">{t.vins.awards}</span>
                    {years.length > 0 ? (
                      years.map((year) => (
                        <span className="chip or" key={year}>
                          {year} — {wineMedals[year].join(", ")}
                        </span>
                      ))
                    ) : (
                      <span className="chip">{t.vins.noAwards}</span>
                    )}
                  </div>
                </div>
                <div className="side">
                  <div className="avail">
                    <b>{t.vins.request}</b>
                    {t.vins.packaging}
                  </div>
                  <a className="fiche-link" href="#terroir" onClick={() => onGoToTerroir(id)}>
                    {t.vins.terroirLink} →
                  </a>
                  <a
                    className="fiche-link"
                    href={`mailto:christophe.patrice@orange.fr?subject=${priceSubject}`}
                  >
                    {t.vins.pricesLink} →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
