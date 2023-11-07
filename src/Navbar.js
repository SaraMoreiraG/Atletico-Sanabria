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
    if (window.scrollY > 0) {
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
    <div className="navbar-row">
      <div className={`navbar-color ${scrolling ? "scrolling" : ""}`}>
        <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
          <div className="row d-flex col-12">
            {/***** Logo ******/}
            <div className={isSmallScreen ? "col-9" : "col-7"}>
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
                      to="/newmemberform"
                      className="nav-link"
                      onClick={closeMenu}
                    >
                      <li>Hazte socio</li>
                    </Link>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="col-5 d-flex align-items-center justify-content-end">
                  {/* Sports toggle */}
                  <div
                    className={`sports-toggle ${isSportsMenuOpen ? "open" : ""}`}
                    onClick={toggleSportsMenu}
                    onMouseEnter={() => setIsSportsMenuOpen(true)}
                    onMouseLeave={() => setIsSportsMenuOpen(false)}
                  >
                    <span className="nav-link">
                      Deportes
                      <span className="ms-2">
                        <i class="fa-solid fa-caret-down"></i>
                      </span>
                    </span>
                  </div>
                  <div className="me-3">
                    <Link
                      to="/#news"
                      className="nav-link"
                      onClick={() => scrollToSection("news")}
                    >
                      <span>Noticias</span>
                    </Link>
                  </div>
                  <div className="me-3">
                    <Link to="/newmemberform" className="nav-link">
                      <span>Hazte socio</span>
                    </Link>
                  </div>
                  <div>
                    <Link to="/login" className="nav-link">
                      {isLogged ? (
                        <i className="fa-solid fa-user"> Dashboard</i>
                      ) : (
                        <i className="fa-regular fa-user"></i>
                      )}
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </nav>
      </div>
      {/* Sports dropdown */}
      <div className="d-flex justify-content-end">
        <div className={`text-start col-5 ${isSportsMenuOpen ? "open" : ""}`}>
          <div>
            <ul
              className="dropdown-sports col-4"
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
