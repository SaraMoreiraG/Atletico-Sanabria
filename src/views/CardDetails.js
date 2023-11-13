import React, { useEffect } from "react";
import sportsData from "../context/sportsData";
import { Link, useParams } from "react-router-dom";

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
        <div className="next-match">
        <div className="next-match-header align-items-center">
          <div className="next-match-date col-4">
            <h4>Senior</h4>
            <span>
              Martes 18:00 <br />
              Jueves 18:00
            </span>
          </div>
          <div className="next-match-middle py-1 px-0 col-4">
            {sportData.title}
            <span className="publicity">
              Atlético | <h6>SANABRIA</h6>
            </span>
          </div>
          <div className="col-4"></div>
          <div className="header-img"></div>
        </div>
        <div className="next-match-body p-3">
          <div className="home-team col-xs-4 col-sm-4 col-md-4">
            <div className="home-team-img">
              <img
                src={sportData.img}
                alt={sportData.title}
                height="150px"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="match-info col-xs-4 col-sm-4 col-md-4">
            <span className="clock">ENTRENAMIENTOS</span>
            <div className="time-venue">
              <span className="time">
                <b>Entrenador: </b>
                {sportData.coach}
              </span>
              <span className="time">
                <b>Equipamiento necesario: </b><br></br>
                {sportData.equipment}
              </span>
              <span className="time">
                <b>Precio: </b>
                60€ / mes
              </span>
            </div>
          </div>
          <div className="home-team col-xs-4 col-sm-4 col-md-4">
            <span className="home-team-name">{sportData.description}</span>
          </div>
        </div>
        <div className="next-match-footer">
          <Link to="/formulario-actividades">
          <button className="btn-blue">Más información</button>
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CardDetails;
