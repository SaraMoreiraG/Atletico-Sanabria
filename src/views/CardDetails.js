import React, { useEffect } from "react";
import sportsData from "../context/sportsData";
import { useParams } from "react-router-dom";

const CardDetails = () => {
  const { sport } = useParams();
  const sportData = sportsData[sport];

  useEffect(() => {
    window.scrollTo(0, 57);
  }, []);

  if (!sportData) {
    return <div>No hay datos disponibles para el deporte seleccionado.</div>;
  }

  return (
    <div id="card-details">
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
