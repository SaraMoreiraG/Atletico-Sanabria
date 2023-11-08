import React, { useEffect } from "react";
import { scrollToSection } from "../utils/scrollUtils";

import SimpleSlider from "../Slider";
import NextMatch from "../components/NextMatch/NextMatch";
import PointTable from "../components/PointTable/PointTable";
import Sponsors from "../components/Sponsors/Sponsors";
import InfoCards from "../components/InfoCards/InfoCards";

function Home() {
  useEffect(() => {
    const sectionFromURL = window.location.hash;
    const sectionWithoutHash = sectionFromURL.substring(1); // Remove the first character, which is the #

    scrollToSection(sectionWithoutHash);
  }, []);

  return (
    <div>
      <SimpleSlider />
      <div className="main-margin row d-flex justify-content-between">
        <NextMatch />
        <PointTable />
      </div>
      <div id="news">
        <div className="fixed-background"></div>
        <div className="main-margin">
          <h1 className="mb-4">Deportes</h1>
          <InfoCards />
        </div>
      </div>
      <Sponsors />
    </div>
  );
}

export default Home;
