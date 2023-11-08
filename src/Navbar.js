import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sportsData from "./redux/sportsData";
import { scrollToSection } from "./utils/scrollUtils";

import logo from "./assets/images/atletico-sanabria-transparent.png";

function Navbar() {
  const [isLogged] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 582);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSportsMenuOpen, setIsSportsMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  // Handle scrolling and update the state
  const handleScroll = () => {
    if (window.scrollY > 130) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    // Add a scroll event listener to track scrolling
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSportsMenu = () => {
    setIsSportsMenuOpen(!isSportsMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
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
    <div className="navbar">
      <div className="navbar-black">
        <div className="navbar-margin justify-content-end">
          <div className="me-3">
            <a href="https://www.instagram.com/atletico_sanabria/" target="blank">
            <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
          <div className="me-3">
          <a href="https://www.tiktok.com/@atltico.sanabria?_t=8hAZmFjuOw5&_r=1" target="blank">
            <i className="fa-brands fa-tiktok"></i>
            </a>
          </div>
          <div className="me-3">
          <a href="https://www.facebook.com/profile.php?id=100093372765743&ref=xav_ig_profile_web" target="blank">
            <i className="fa-brands fa-square-facebook"></i>
            </a>
          </div>
          <div className="me-3">
          <a href="https://www.youtube.com/@ATLETICO.SANABRIA" target="blank">
            <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
          <div className="d-flex justify-content-end align-items-center ms-2">
            <Link to="/login" className="nav-link">
              {isLogged ? (
                <i className="fa-solid fa-user"> Dashboard</i>
              ) : (
                <div>
                  <span>LOG IN</span>
                  <i className="fa-regular fa-user ms-2"></i>
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
      <div className={`navbar-grey ${scrolling ? "scrolling" : ""}`}>
        <nav className={`row navbar-margin justify-content-between ${isMenuOpen ? "open" : ""}`}>
            {/***** Logo ******/}
            <div className={`px-0 py-2 ${isSmallScreen ? "col-9" : "col-5"}`}>
              <Link to="/" className="logo d-flex" onClick={closeMenu}>
                <img src={logo} alt="Logo" className="navbar-logo" />
                <div className="text-center mt-2">
                  <p className="company-name">
                    Atlético <span className="company-sub-name">Sanabria</span>
                  </p>
                  <p className="company-description">Club Deportivo</p>
                </div>
              </Link>
            </div>
            {/***** Small Menu ******/}
            {isSmallScreen ? (
              <>
                <div className="col-3 d-flex align-items-center justify-content-end">
                  <div className="d-flex align-items-center">
                    <Link to="/login" className="nav-link">
                      {isLogged ? (
                        <i className="fa-solid fa-user"> Dashboard</i>
                      ) : (
                        <div>
                          <i className="fa-regular fa-user company-name me-2"></i>
                        </div>
                      )}
                    </Link>
                    <div
                      className={`dropdown-button ${isMenuOpen ? "open" : ""}`}
                      onClick={toggleMenu}
                    >
                      <i className="fa-solid fa-bars"></i>
                    </div>
                  </div>
                </div>
                <div className="text-start pt-2">
                  <ul className="dropdown-list">
                    <Link
                      to="/#news"
                      className="nav-link dropdown-link"
                      onClick={() => {
                        scrollToSection("news");
                        closeMenu();
                      }}
                    >
                      <li>Noticias</li>
                    </Link>
                    <Link
                      to="/formulario-nuevo-socio"
                      className="nav-link"
                      onClick={closeMenu}
                    >
                      <li>Hazte socio</li>
                    </Link>
                  </ul>
                </div>
              </>
            ) : (
            //***** Big Menu *********
              <>
                <div className="col-7 d-flex align-items-center justify-content-end p-0">
                  {/* Sports toggle */}
                  <div
                    className={`sports-toggle ${
                      isSportsMenuOpen ? "open" : ""
                    }`}
                    onClick={toggleSportsMenu}
                    onMouseEnter={() => setIsSportsMenuOpen(true)}
                    onMouseLeave={() => setIsSportsMenuOpen(false)}
                  >
                    <span className="nav-link">
                      Deportes
                      <span className="ms-2">
                        <i className="fa-solid fa-caret-down"></i>
                      </span>
                    </span>
                  </div>
                  <div className="me-3">
                    <Link to="/formulario-actividades" className="nav-link">
                      <span>Actividades</span>
                    </Link>
                  </div>
                  <div className="me-3">
                    <Link to="/formulario-nuevo-socio" className="nav-link">
                      <span>Hazte socio</span>
                    </Link>
                  </div>
                </div>
              </>
            )}
        </nav>
      </div>
      {/* Sports dropdown */}
      <div className="d-flex justify-content-end">
        <div className={`text-start col-4 ${isSportsMenuOpen ? "open" : ""}`}>
          <div>
            <ul
              className="dropdown-sports col-2"
              onMouseEnter={() => setIsSportsMenuOpen(true)}
              onMouseLeave={() => setIsSportsMenuOpen(false)}
            >
              {Object.keys(sportsData).map((sportKey) => {
                const sport = sportsData[sportKey];
                return (
                  <Link
                    key={sport.title}
                    to={`/deportes/${sportKey}`}
                    className="nav-link dropdown-link ps-3"
                    onClick={() => {
                      scrollToSection("news");
                      closeMenu();
                    }}
                  >
                    <li>{sport.title}</li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
