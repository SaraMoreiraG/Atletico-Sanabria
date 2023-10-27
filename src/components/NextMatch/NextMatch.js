import React from "react";
import "./NextMatch.css";

import logo from "../../assets/images/atletico-sanabria-transparent.png";

function NextMatch() {
  const calendary = [
    {
      homeTeam: "Atlélico Sanabria",
      visitTeam: "Atlélico Sanabria",
      dayNumber: 6,
      dayName: "Lunes",
      year: 2023,
      hour: "22:00",
    },
  ];
  return (
    <div className="next-match col-7">
      <div className="next-match-header align-items-center">
        <div className="next-match-date col-4">
          <h4>6</h4>
          <span>
            Lunes <br />
            Noviembre
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
            <img src={logo} alt="Logo equipo" height="150px" />
          </div>
          <span className="home-team-name">Atletico Sanabria</span>
        </div>

        <div className="match-info col-4">
          <span className="clock">22:00</span>
          <br />
          <span className="vs-sign">vs</span>
          <div className="time-venue">
            <span className="venue">Brighton City No:5 , Brighton</span>
            <br />
            <span className="time">6 November 2023 21:25</span>
          </div>
        </div>

        <div className="home-team col-xs-4 col-sm-4 col-md-4">
          <div className="home-team-img">
            <img src={logo} alt="Logo equipo" height="150px" />
          </div>
          <span className="home-team-name">Atletico Sanabria</span>
        </div>
      </div>
      <div className="next-match-footer">
        <button className="btn-red">Ver calendario</button>
      </div>
    </div>
  );
}

export default NextMatch;
