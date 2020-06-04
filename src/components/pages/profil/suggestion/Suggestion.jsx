import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';
import "./suggestion.scss"

const { apiSite } = require("../../../../conf")

export default function Suggestion() {
  const [sugges, setSugges] = useState([]);
  const user = useSelector(state => state.user);
  const mois = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
  ]

  useEffect(() => {
    axios.get(`${apiSite}/suggestion/2`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(({ data }) => {
      setSugges(data)
    })
  }, [user.id])

  sugges.sort(function (a, b) {
    return a.id_periods - b.id_periods
  })
  return (
    sugges.length < 0
      ?
      <div className="containerSuggest">
        <h1>Besoins d'idées:</h1>

        {sugges.map((country) => {
          return (
            <div className="cardSugges">
              <div className="flagSugges">
                <img src={country.pictures ? country.pictures : country.flag} alt={country.name} />
              </div>
              <h3 className="titleSugges">{country.nameFr}</h3>
              <h3 className="periodSugges">Départ en {mois[country.id_periods]}</h3>
              <h3 className="tempSugges">{country.temperature} C°</h3>
              <h3 className="precSugges">{country.precipitation} mm</h3>

            </div>
          )

        })}

      </div>
      : ""


  )

}
