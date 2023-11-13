import React from "react";
import { Link } from "react-router-dom";
import sportsData from "../../context/sportsData";

import "./InfoCards.css";

function InfoCards() {
  return (
    <div className="row g-5 justify-content-between">
      {Object.keys(sportsData).map((sportKey) => {
        const sport = sportsData[sportKey];
        return (
          <div className="col-md-6" key={sportKey}>
            <div className="info-card">
              <div className="col-lg-5 col-md-12">
                <img src={sport.img} className="img-fluid" alt={sport.title} />
              </div>
              <div className="px-4 my-3">
                <h2>{sport.title}</h2>
                <p>{sport.description}</p>
                <Link to={`/deportes/${sportKey}`}>
                  <button className="btn-blue mb-2">Leer más</button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default InfoCards;
