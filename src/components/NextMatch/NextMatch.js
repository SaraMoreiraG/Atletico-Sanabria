import React, { useState, useEffect } from "react";
import "./NextMatch.css";

function NextMatch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Function to fetch data from the server
  const getDataFromServer = () => {
    // Define the URL to fetch data
    const apiUrl =
      "https://mrew2ksxap.us-east-1.awsapprunner.com/matchesdb/full";

    // Make a GET request to the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  // Effect to fetch data when the component mounts
  useEffect(() => {
    getDataFromServer();
  }, []);

  if (loading) {
    return (
      <div className="clasification col-4 p-3 my-5">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="col-lg-8 col-md-12 px-2">
      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-inner">
          {data &&
            data.map((match, index) => {
              const date = new Date(match.date);
              const dayNumber = date.getDate();
              const dayNames = [
                "Domingo",
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sábado",
              ];
              const monthNames = [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre",
              ];

              return (
                <div
                  key={index}
                  className={
                    "carousel-item next-match mb-5" +
                    (index === 0 ? " active" : "")
                  }
                >
                  <div className="next-match-header align-items-center">
                    <div className="next-match-date col-4">
                      <h4>{dayNumber}</h4>
                      <span>
                        {dayNames[date.getDay()]} <br />
                        {monthNames[date.getMonth()]}
                      </span>
                    </div>
                    <div className="next-match-middle py-1 px-0 col-4">
                      Próximo partido
                      <span className="publicity">
                        PRESENTED BY | <h6>NEOSPOR</h6>
                      </span>
                    </div>
                    <div className="col-4"></div>
                  </div>
                  <div className="next-match-body">
                    <div className="home-team col-xs-4 col-sm-4 col-md-4">
                      <div className="home-team-img">
                        <img
                          src={`https://images-atletico-sanabria.s3.amazonaws.com/logos/${match.homeShortName}.png`}
                          alt={`logo equipo ${match.homeTeam}`}
                          height="150px"
                          className="img-fluid"
                        />
                      </div>
                      <span className="home-team-name">{match.homeTeam}</span>
                    </div>
                    <div className="match-info col-4">
                      <span className="clock">{match.hour}</span>
                      <br />
                      <span className="vs-sign">vs</span>
                      <div className="time-venue">
                        <span className="venue">{match.place}</span>
                        <br />
                        <span className="time">
                          {date.getDate()} {monthNames[date.getMonth()]}{" "}
                          {date.getFullYear()} <br /> {match.hour}
                        </span>
                      </div>
                    </div>
                    <div className="home-team col-xs-4 col-sm-4 col-md-4">
                      <div className="home-team-img">
                        <img
                          src={`https://images-atletico-sanabria.s3.amazonaws.com/logos/${match.visitorShortName}.png`}
                          alt={`logo ${match.visitorTeam}`}
                          height="150px"
                          className="img-fluid"
                        />
                      </div>
                      <span className="home-team-name">
                        {match.visitorTeam}
                      </span>
                    </div>
                  </div>
                  <div className="next-match-footer">
                    <button className="btn-blue">Ver calendario</button>
                  </div>
                </div>
              );
            })}
        </div>
        <button
          className="carousel-control-prev justify-content-start"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next justify-content-end"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
        <div className="carousel-indicators">
          {data &&
            data.map((match, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default NextMatch;
