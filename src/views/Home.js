import React from "react";
import SimpleSlider from "../Slider";
import NextMatch from "../components/NextMatch/NextMatch";
import PointTable from "../components/PointTable/PointTable";
import Sponsors from "../components/Sponsors/Sponsors";
import InfoCards from "../components/InfoCards/InfoCards";

function Home() {
  return (
    <div className="main">
      <SimpleSlider />
      <div className="main-margin row d-flex justify-content-between">
        <NextMatch />
        <PointTable />
      </div>
      <div id="news">
        <div className="main-margin news py-5">
          <h1 className="my-4">Feature News</h1>
          <InfoCards />
        </div>
      </div>

      <Sponsors />
    </div>
  );
}

export default Home;
