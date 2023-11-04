import React, { useEffect, useRef } from "react";

import SimpleSlider from "../Slider";
import NextMatch from "../components/NextMatch/NextMatch";
import PointTable from "../components/PointTable/PointTable";
import Sponsors from "../components/Sponsors/Sponsors";
import InfoCards from "../components/InfoCards/InfoCards";


function Home() {
  // Create refs for each section
  const homeSectionRef = useRef(null);
  const newsSectionRef = useRef(null);
  const contactSectionRef = useRef(null);

  useEffect(() => {
    // Check if there is a hash in the URL
    if (window.location.hash) {
      // Check the hash in the URL and scroll to the corresponding section if it exists
      if (
        window.location.hash === "#news" &&
        newsSectionRef.current
      ) {
        newsSectionRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (
        window.location.hash === "#contact" &&
        contactSectionRef.current
      ) {
        contactSectionRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (window.location.hash === "#home" && homeSectionRef.current) {
        homeSectionRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div className="main">
      <SimpleSlider />
      <div className="main-margin row d-flex justify-content-between">
        <NextMatch />
        <PointTable />
      </div>
      <div ref={newsSectionRef} id="news">
        <div class="fixed-background"></div>
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
