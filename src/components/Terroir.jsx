import useReveal from "../hooks/useReveal";
import { winesByLanguage } from "../data/wines";
import { useLanguage } from "../i18n";
import montmainsImg from "../assets/images/terroir-coteaux.jpg";
import tailleImg from "../assets/images/terroir-taille.jpg";
import antigelImg from "../assets/images/terroir-antigel.jpg";
import chardonnayImg from "../assets/images/terroir-chardonnay.jpg";
import "./Terroir.css";

const ATLAS_GROUP_IDS = [
  ["petit-chablis"],
  ["chablis"],
  ["montmains", "beauroy", "beauregard"],
];

function WineDetails({ wine, selectedLabel, className = "" }) {
  return (
    <div className={`data-pane${className ? ` ${className}` : ""}`}>
      <span className="selected-label">{selectedLabel}</span>
      <span className="kicker">{wine.kicker}</span>
      <h3>{wine.name}</h3>
      <p className="commune">{wine.commune}</p>
      <dl className="facts">
        {wine.facts.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p className="note">{wine.note}</p>
    </div>
  );
}

function WineCard({ id, activeId, onSelect, selectedLabel, wines }) {
  const wine = wines[id];
  const active = activeId === id;

  return (
    <div className={`atlas-card-shell${active ? " active" : ""}`}>
      <button
        type="button"
        className="atlas-wine"
        aria-pressed={active}
        onClick={() => onSelect(id)}
      >
        <span className="atlas-wine-name">{wine.name}</span>
        <span className="atlas-wine-place">{wine.commune}</span>
      </button>
      {active && <WineDetails wine={wine} selectedLabel={selectedLabel} className="mobile-data" />}
    </div>
  );
}

export default function Terroir({ activeId, onSelect }) {
  const headRef = useReveal();
  const layoutRef = useReveal();
  const stripRef = useReveal();
  const { language, t } = useLanguage();
  const wines = winesByLanguage[language];
  const active = wines[activeId];
  const atlasGroups = t.terroir.groups.map(([index, label, soil, description], groupIndex) => ({
    index,
    label,
    soil,
    description,
    ids: ATLAS_GROUP_IDS[groupIndex],
  }));

  return (
    <section
      id="terroir"
      style={{
        background: "var(--fond-secondaire)",
        borderTop: "1px solid var(--ligne-claire)",
        borderBottom: "1px solid var(--ligne-claire)",
      }}
    >
      <div className="wrap">
        <div className="head-row reveal" ref={headRef}>
          <div>
            <span className="eyebrow">{t.terroir.eyebrow}</span>
            <h2>{t.terroir.title}</h2>
          </div>
          <p className="dek">{t.terroir.dek}</p>
        </div>

        <div className="terroir-layout reveal" ref={layoutRef}>
          <div className="atlas-pane">
            <div className="atlas-heading">
              <span>{t.terroir.atlasTitle}</span>
              <p>{t.terroir.atlasIntro}</p>
            </div>

            <div className="atlas-zones">
              {atlasGroups.map((group) => (
                <div className="atlas-zone" key={group.label}>
                  <div className="atlas-zone-copy">
                    <span className="atlas-index">{group.index}</span>
                    <strong>{group.label}</strong>
                    <span className="atlas-soil">{group.soil}</span>
                    <small>{group.description}</small>
                  </div>
                  <div className={`atlas-wines${group.ids.length > 1 ? " multiple" : ""}`}>
                    {group.ids.map((id) => (
                      <WineCard
                        key={id}
                        id={id}
                        activeId={activeId}
                        onSelect={onSelect}
                        selectedLabel={t.terroir.selected}
                        wines={wines}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="atlas-distance" aria-hidden="true">
              <span>{t.terroir.distance[0]}</span>
              <i />
              <span>{t.terroir.distance[1]}</span>
            </div>

            <div className="atlas-irancy">
              <div className="atlas-zone-copy">
                <span className="atlas-index">{t.terroir.irancy[0]}</span>
                <strong>{t.terroir.irancy[1]}</strong>
                <span className="atlas-soil">{t.terroir.irancy[2]}</span>
                <small>{t.terroir.irancy[3]}</small>
              </div>
              <div className="atlas-wines">
                <WineCard
                  id="irancy"
                  activeId={activeId}
                  onSelect={onSelect}
                  selectedLabel={t.terroir.selected}
                  wines={wines}
                />
              </div>
            </div>
          </div>

          <WineDetails wine={active} selectedLabel={t.terroir.selected} className="desktop-data" />
        </div>

        <div className="terroir-strip reveal" ref={stripRef}>
          <figure className="hover-caption" tabIndex={0}>
            <img
              src={montmainsImg}
              alt={t.terroir.strip[0][0]}
              loading="lazy"
            />
            <figcaption className="hover-caption-text">{t.terroir.strip[0][1]}</figcaption>
          </figure>
          <figure className="hover-caption" tabIndex={0}>
            <img src={tailleImg} alt={t.terroir.strip[1][0]} loading="lazy" />
            <figcaption className="hover-caption-text">{t.terroir.strip[1][1]}</figcaption>
          </figure>
          <figure className="hover-caption" tabIndex={0}>
            <img src={antigelImg} alt={t.terroir.strip[2][0]} loading="lazy" />
            <figcaption className="hover-caption-text">{t.terroir.strip[2][1]}</figcaption>
          </figure>
          <figure className="hover-caption" tabIndex={0}>
            <img
              src={chardonnayImg}
              alt={t.terroir.strip[3][0]}
              loading="lazy"
            />
            <figcaption className="hover-caption-text">{t.terroir.strip[3][1]}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
