import React, { useState, useEffect } from "react";
import "./NextMatch.css";

import logo from "../../assets/images/atletico-sanabria-transparent-small.png";
import logo2 from "../../assets/images/logos/originals/venialbo.png";
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
    <div className="col-8 px-2">
      <div className="next-match">
        {data &&
          data.map((match) => {
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
              <>
                <div className="next-match-header align-items-center">
                  <div className="next-match-date col-4">
                    <h4>{dayNumber}</h4>
                    <span>
                      {dayNames[date.getDay()]} <br />
                      {monthNames[date.getMonth()]}
                    </span>
                  </div>
                  <div className="next-match-middle col-4">
                    Proximo partido
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
                        src={logo}
                        alt="Logo equipo"
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
                        {date.getFullYear()} {match.hour}
                      </span>
                    </div>
                  </div>
                    <div
                      className="home-team col-xs-4 col-sm-4 col-md-4"
                    >
                      <div className="home-team-img">
                        <img
                          src={logo}
                          alt="Logo equipo"
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
                  <button className="btn-red">Ver calendario</button>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}

export default NextMatch;
