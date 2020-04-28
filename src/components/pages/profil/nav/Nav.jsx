import React, { useState } from "react";
import "./nav.scss"

function Nav() {
  const [choice, setChoice] = useState('map');

  return (
    <div className="choice-profil">
      <h2 onClick={() => { setChoice('map') }} className={`map${choice === "map" ? ' selected' : ""}`}>Map</h2>
      <h2 onClick={() => { setChoice('liste') }} className={`liste${choice === "liste" ? ' selected' : ""}`}>Liste</h2>
    </div>
  )
}

export default Nav;