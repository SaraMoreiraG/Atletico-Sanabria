import React from "react";
import SimpleSlider from "../Slider";
import NextMatch from "../components/NextMatch/NextMatch";
import PointTable from "../components/PointTable/PointTable";
import Sponsors from "../components/Sponsors/Sponsors";
import InfoCards from "../components/InfoCards/InfoCards";
import NewMemberForm from "../components/NewMemberForm";

function Home() {
  return (
    <div className="main">
      <SimpleSlider />
      <div className="main-margin row d-flex justify-content-between">
        <NextMatch />
        <PointTable />
      </div>
      <div id="news">
        <div class="fixed-background"></div>
        <div className="main-margin">
        <h1 className="mb-4">Feature News</h1>
        <InfoCards />
        </div>
      </div>
      <NewMemberForm />
      <Sponsors />
    </div>
  );
}

export default Home;
