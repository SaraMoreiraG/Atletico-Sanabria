import React from "react";
import "./Loader.css";

function Loader() {
  return (
    <div className="loader-full-screen">
      <div className="loader-container">
        <div className="football"></div>
      </div>
      <p className="loading-text">Cargando...</p>
    </div>
  );
}

export default Loader;
