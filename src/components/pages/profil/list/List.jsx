import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./list.scss"

function List() {
  const [check, setCheck] = useState('fait');
  const toPassed = useSelector(state => state.LastTrip);
  const toNext = useSelector(state => state.NextTrip);
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

  return (
    <div className="list_countries">
      <h2 onClick={() => { setCheck('fait') }} className={`check titre `}>Fait</h2>
      <table className={`list_entete${check === "fait" ? " visible" : ""}`}>
        <thead>
          <th>Nom du pays</th>
          <th>Période voyagé</th>
          <th>Année du voyage</th>
        </thead>
        {toPassed.map((country) => {
          return (
            <tbody className="list_corps">
              <td>{country.country_name}</td>
              <td>{mois[country.month]}</td>
              <td>{country.year}</td>
            </tbody>
          )
        })}
      </table>
      <h2 onClick={() => { setCheck('aFaire') }} className={`new titre`}>A faire</h2>
      <table className={`list_entete${check === "aFaire" ? " visible" : ""}`}>
        <thead>
          <th>Nom du pays</th>
          <th>Période voyagé</th>
          <th>Année du voyage</th>
        </thead>
        {toNext.map((country) => {
          return (
            <tbody className="list_corps">
              <td>{country.country_name}</td>
              <td>{mois[country.month]}</td>
              <td>{country.year}</td>
            </tbody>
          )
        })}
      </table>

      <ul>


      </ul>
    </div>

  )
}

export default List;