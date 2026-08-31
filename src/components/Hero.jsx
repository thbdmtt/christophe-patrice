import heroPhoto from "../assets/images/hero-aspersion.jpg";
import { useLanguage } from "../i18n";
import "./Hero.css";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero" id="hero">
      <img
        className="hero-photo"
        src={heroPhoto}
        alt={t.hero.alt}
        fetchPriority="high"
        decoding="async"
      />
      <span className="hero-credit">{t.hero.credit}</span>
      <div className="hero-content">
        <span className="eyebrow">{t.hero.eyebrow}</span>
        <h1>{t.hero.title}</h1>
        <p className="sub">{t.hero.sub}</p>
        <div className="cta-row">
          <a className="btn" href="#vins">
            {t.hero.wines}
          </a>
          <a className="btn ghost" href="#contact">
            {t.hero.visit}
          </a>
        </div>
      </div>
      <span className="scroll-cue">{t.hero.scroll}</span>
    </section>
  );
}
