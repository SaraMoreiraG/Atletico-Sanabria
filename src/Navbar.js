import React from "react";
import logo from "./assets/images/atletico-sanabria-transparent.png";

function Navbar() {
  return (
    <nav class="navbar">
      <div class="p-10">
        <a href="#" className="logo d-flex">
          <img
            src={logo}
            alt="Logo"
            height="70"
            class="d-inline-block align-text-center"
          />
		  <div className="text-center mt-2">
          <p className="company-name">Atlético <span className="company-sub-name">Sanabria</span></p>
          <p className="company-description">Club Deportivo</p>
		  </div>
        </a>
      </div>
      <h2>Noticias</h2>
      <h3>Hazte socio</h3>
    </nav>
  );
}

export default Navbar;
