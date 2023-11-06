import React, { useEffect, useState } from "react";
import { scrollToSection } from "../utils/scrollUtils";

import SimpleSlider from "../Slider";
import NextMatch from "../components/NextMatch/NextMatch";
import PointTable from "../components/PointTable/PointTable";
import Sponsors from "../components/Sponsors/Sponsors";
import InfoCards from "../components/InfoCards/InfoCards";


function Home() {
  const [navbarHeight, setNavbarHeight] = useState(80); // Default height

  useEffect(() => {
    // Create a ResizeObserver instance
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target.classList.contains("navbar")) {
          // Update the navbarHeight state when the navbar size changes
          setNavbarHeight(entry.target.offsetHeight);
        }
      }
    });

    // Observe the navbar element
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      resizeObserver.observe(navbar);
    }

    return () => {
      // Clean up the observer when the component unmounts
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    // Measure the actual height of the navbar and set it in the state
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, [navbarHeight]);
  useEffect(() => {
    const sectionFromURL = window.location.hash;
    const sectionWithoutHash = sectionFromURL.substring(1); // Remove the first character, which is the #

    scrollToSection(sectionWithoutHash);
  }, []);

  return (
    <div style={{ paddingTop: navbarHeight + "px" }}>
      <SimpleSlider />
      <div className="main-margin row d-flex justify-content-between">
        <NextMatch />
        <PointTable />
      </div>
      <div id="news">
        <div className="fixed-background"></div>
        <div className="main-margin">
        <h1 className="mb-4">Feature News</h1>
        <InfoCards />
        </div>
      </div>
      <Sponsors />
    </div>
  );
}

export default Home;
