import React from "react";
import logo from "./assets/images/atletico-sanabria-transparent.png";

function Navbar() {
  return (
    <nav class="navbar">
      <div class="p-10">
        <a href="#" className="logo">
          <img
            src={logo}
            alt="Logo"
            height="70"
            class="d-inline-block align-text-center"
          />
          Atlético Sanabria
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
