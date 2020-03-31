import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./addTrip.scss";
import axios from "axios";

export default function Addtrip() {
  const history = useHistory();
  const [pays, setPays] = useState("");
  const [month, setMonth] = useState("01");
  const type = "plage";
  const arrayMois = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre"
  ];
  function sqlNameByType(type) {
    if (type === "plage") {
      return "P";
    } else {
      return "M";
    }
  }

  function addTrip() {
    const sqlName = sqlNameByType(type);
    axios
      .post(`http://localhost:5000/plage/01/newtrip`, {
        pays
      })
      .then(({ data }) => {
        history.push("/");
      });
  }
  console.log(month);

  return (
    <div className="formulaire">
      <form
        onSubmit={e => {
          e.preventDefault();
          addTrip();
        }}
      >
        <h1>Ajoute un voyage </h1>
        <p className="input">
          <label for="pays">Pays</label>
          <input
            type="text"
            name="pays"
            id="pays"
            value={pays}
            placeholder="Ta destination"
            onChange={evt => setPays(evt.target.value)}
          ></input>

          {arrayMois.map((mois, i) => {
            return (
              <div key={i} className="inputs">
                <input
                  type="checkbox"
                  name={i + 1}
                  id={i + 1}
                  value={i + 1}
                  onchange={evt => setMonth(evt.target.value)}
                />
                <label for={i}>{mois}</label>
              </div>
            );
          })}
        </p>
        <input type="submit" value="Envoyer"></input>
      </form>
    </div>
  );
}
