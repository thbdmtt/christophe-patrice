import useReveal from "../hooks/useReveal";
import { useLanguage } from "../i18n";
import "./Ledger.css";

export default function Ledger() {
  const ref = useReveal();
  const { t } = useLanguage();

  return (
    <div className="ledger reveal" ref={ref}>
      {t.ledger.map(([number, caption]) => (
        <div key={caption}>
          <span className="n num">{number}</span>
          <span className="c">{caption}</span>
        </div>
      ))}
    </div>
  );
}
