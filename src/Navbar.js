import React from "react";
import { Link } from "react-router-dom";

import logo from "./assets/images/atletico-sanabria-transparent.png";

function Navbar() {
  return (
    <nav className="navbar p-10">
        <Link to="/" className="logo d-flex">
          <img
            src={logo}
            alt="Logo"
            height="70"
            className="d-inline-block align-text-center"
          />
          <div className="text-center mt-2">
            <p className="company-name">
              Atlético <span className="company-sub-name">Sanabria</span>
            </p>
            <p className="company-description">Club Deportivo</p>
          </div>
        </Link>
      <span>Noticias</span>
      <span>Hazte socio</span>
      <Link to="/login" className="nav-link">Login</Link>
    </nav>
  );
}

export default Navbar;
