import villageImg from "../assets/images/village-beine-peinture.jpg";
import { useLanguage } from "../i18n";
import "./VillageBand.css";

export default function VillageBand() {
  const { t } = useLanguage();

  return (
    <figure className="village-band hover-caption" tabIndex={0}>
      <img
        src={villageImg}
        alt={t.village.alt}
        loading="lazy"
      />
      <figcaption className="vb-caption hover-caption-text">{t.village.caption}</figcaption>
    </figure>
  );
}
