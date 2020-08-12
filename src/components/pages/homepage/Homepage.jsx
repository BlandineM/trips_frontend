import React from "react";
import "./homepage.scss";
import { NavLink } from "react-router-dom";

function Homepage() {
  return (
    <div className="homepage">
      <div>

        <img className="banniere" src="https://res.cloudinary.com/blandine/image/upload/v1586012438/homepage.jpg" alt="banniere"></img>
      </div>
      <div className="info">
        <h1 className="title_homepage">Bien préparer son voyage</h1>
        <p>L'organisation d'un voyage suscite de nombreuses questions : <br /><br />Où aller ?<br /> Quand partir ? <br />Quel budget ? <br />Combien de temps ? <br /><br />Trip's Harley va vous aider à trouver le bon endroit, au bon moment. Avec l'aide des trippers vous pouvez voir qui à visiter quoi au même moment. Ainsi partager vos meilleurs découvertes. Ce qu'il vous restera seulement à faire, c'est de profiter!</p>
      </div>
      <div className="card">
        <div className="sun">
          <NavLink to="/plage">
            <h3>Soleil - Plage ?</h3>
            <img src="/plage.jpg" alt="plage"></img>
          </NavLink>
        </div>
        <div className="hiking">
          <NavLink to="/randonnee">
            <h3>Randonnée?</h3>
            <img src="/randonnee.jpg" alt="randonnée"></img>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
