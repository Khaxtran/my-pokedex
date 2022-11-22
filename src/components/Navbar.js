import React, { useState } from "react";

export default function Navbar() {
  const [isActive, setIsActive] = useState();

  function toggleBurgerMenu() {
    setIsActive(!isActive);
  }

  return (
    <nav
      className="navbar is-fixed-top is-warning"
      role="navigation"
      aria-label="main navigation"
      style={{ zIndex: "20" }}
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
            alt="logo"
          />
        </a>

        <div
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={toggleBurgerMenu}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>
      <div
        id="openHamburger"
        className={`navbar-menu is-size-4 ${isActive ? "is-active" : ""}`}
      >
        <div className="navbar-start pl-5"></div>
        <div className="navbar-end pr-5">
          <div className="navbar-item">
            <div className="buttons">
              <button className="button is-success is-medium" style={{border: "3px solid black", boxShadow: "3px 3px 0px black", borderRadius: "10px"}}><strong>Pokedex</strong></button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
