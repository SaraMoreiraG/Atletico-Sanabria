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
      <div className="main-margin">
        <div className="next-match">
          <div className="next-match-header align-items-center">
            <div className="next-match-date col-4">
              <h4>{sportData.place}</h4>
              <span>
                {sportData.schedule[0]} <br />
                {sportData.schedule[1]}
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
          <div className="next-match-body row p-3">
            <div className="home-team col-sm-12 col-md-6 col-lg-4">
              <div className="home-team-img">
                <img
                  src={sportData.img}
                  alt={sportData.title}
                  height="150px"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="match-info col-sm-12 col-md-12 col-lg-4">
              <span className="clock">ENTRENAMIENTOS</span>
              <div className="time-venue">
                {sportData.coach && (
                  <span className="time mb-0">
                    <b>Técnico: </b>
                    {sportData.coach}
                  </span>
                )}
                {sportData.ayudante && (
                  <span className="time mt-0">
                    <b>Ayte. Técnico: </b>
                    {sportData.ayudante}
                  </span>
                )}
                {sportData.delegado && (
                  <span className="time mt-0">
                    <b>Delegado: </b>
                    {sportData.delegado}
                  </span>
                )}
                {sportData.socio && (
                  <span className="time mt-0">
                    <b>Socio: </b>
                    {sportData.socio}
                  </span>
                )}
                <span className="time">
                  <b>Equipamiento necesario: </b>
                  <br></br>
                  {sportData.equipment}
                </span>
                <span className="time">{sportData.message}</span>
              </div>
            </div>
            <div className="sport-description-wrapper col-sm-12 col-md-12 col-lg-4">
              <span className="sport-description">{sportData.description}</span>
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
