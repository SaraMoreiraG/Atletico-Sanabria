import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "./assets/images/atletico-sanabria-transparent.png";

function Navbar() {
  const [isLogged] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 582);

  // Use an event listener to update isSmallScreen when the window size changes
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 582);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <nav className="navbar">
      <div className="links row d-flex col-12">
        <div className={isSmallScreen ? 'col-9' : 'col-7'}>
          <Link to="/" className="logo d-flex">
            <img src={logo} alt="Logo" className="navbar-logo" />
            <div className="text-center mt-2">
              <p className="company-name">
                Atlético <span className="company-sub-name">Sanabria</span>
              </p>
              <p className="company-description">Club Deportivo</p>
            </div>
          </Link>
        </div>
        {isSmallScreen ? (
          <div className="col-3 d-flex align-items-center justify-content-end">
            <div>
              <Link to="/login" className="nav-link">
                {isLogged ? (
                  <i className="fa-solid fa-user"> Dashboard</i>
                ) : (
                  <div>
                  <i className="fa-regular fa-user company-name me-2"></i>
                  <i className="fa-solid fa-bars"></i>
                  </div>
                )}
              </Link>
            </div>
          </div>
        ) : (
          <div className="col-5 d-flex align-items-center justify-content-end">
            <div className="me-3">
              <span>Noticias</span>
            </div>
            <div className="me-3">
              <span>Hazte socio</span>
            </div>
            <div>
              <Link to="/login" className="nav-link">
                {isLogged ? (
                  <i className="fa-solid fa-user"> Dashboard</i>
                ) : (
                  <i className="fa-regular fa-user company-name"></i>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
      <div></div>
    </nav>
  );
}

export default Navbar;
