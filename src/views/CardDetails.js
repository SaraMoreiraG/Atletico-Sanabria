import React, { useState, useEffect } from "react";
import sportsData from "../redux/sportsData";
import { useParams } from "react-router-dom";

const CardDetails = () => {
  const { sport } = useParams();
  const sportData = sportsData[sport];
  const [navbarHeight, setNavbarHeight] = useState(80);

  useEffect(() => {
    window.scrollTo(0, 0);

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

  if (!sportData) {
    return <div>No hay datos disponibles para el deporte seleccionado.</div>;
  }

  return (
    <div style={{ paddingTop: navbarHeight + "px" }} id="card-details">
      <div className="card-details-margin">
        <h2>{sportData.title}</h2>
        <div className="row">
          <img
            src={sportData.img}
            alt={sportData.title}
            className="col-5 img-fluid"
          />
          <div className="col-6">
            <p>{sportData.description}</p>
            <div>
              <p>
                <b>Horarios: </b>
                {sportData.schedule}
              </p>
              <p>
                <b>Entrenador: </b>
                {sportData.coach}
              </p>
              <p>
                <b>Equipamiento necesario: </b>
                {sportData.equipment}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
