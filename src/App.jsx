import { useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Ledger from "./components/Ledger";
import Domaine from "./components/Domaine";
import Terroir from "./components/Terroir";
import Vins from "./components/Vins";
import Professionnel from "./components/Professionnel";
import VillageBand from "./components/VillageBand";
import Visiter from "./components/Visiter";
import Footer from "./components/Footer";
import { useLanguage } from "./i18n";

export default function App() {
  const [activeId, setActiveId] = useState("chablis");
  const { t } = useLanguage();

  function goToTerroir(id) {
    setActiveId(id);
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        {t.skipLink}
      </a>
      <Nav />
      <main id="main-content">
        <Hero />
        <Ledger />
        <Domaine />
        <Terroir activeId={activeId} onSelect={setActiveId} />
        <Vins onGoToTerroir={goToTerroir} />
        <Professionnel />
        <VillageBand />
        <Visiter />
      </main>
      <Footer />
    </>
  );
}
