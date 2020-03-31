import React from "react";
import "./homepage.scss";
import { NavLink } from "react-router-dom";

function Homepage() {
  return (
    <div className="homepage">
      <div>
        <h2>Tu ne sais pas où et quand partir en vacances</h2>
      </div>
      <div className="card">
        <div className="sun">
          <NavLink to="/plage">
            <h3>Soleil - Plage ?</h3>
            <img src="/plage.jpg"></img>
          </NavLink>
        </div>
        <div className="hiking">
          <NavLink to="/randonnee">
            <h3>Randonnée?</h3>
            <img src="/randonnee.jpg"></img>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
