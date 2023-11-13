import React, { useState, useEffect } from "react";
import SimpleSlider from "../Slider";
import NextMatch from "../components/NextMatch/NextMatch";
import PointTable from "../components/PointTable/PointTable";
import Sponsors from "../components/Sponsors/Sponsors";
import InfoCards from "../components/InfoCards/InfoCards";
import Loader from "../components/Loader/Loader";

function Home() {
  const [loading, setLoading] = useState(true);

  // Simulate data loading with a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <div style={{ height: '100vh' }}>
        <Loader />
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default Home;
