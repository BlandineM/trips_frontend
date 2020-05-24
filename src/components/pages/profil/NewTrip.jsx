import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Axios from 'axios';
import "./newTrip.scss"

const { apiSite } = require("../../../conf")
function NewTrip() {
  const [pays, setPays] = useState([]);
  const [year, setYear] = useState([]);
  const [month, setMonth] = useState();
  const [check, setCheck] = useState(null);
  const [countries, setCountries] = useState([]);
  const toPassed = useSelector(state => state.LastTrip);
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
    Axios.get(`${apiSite}/countries`).then(({ data }) => {
      setCountries(data)
    });
  }, [])

  function valider(e) {
    Axios.post(`${apiSite}/profil/${user.id}/trip`, {
      id_pays: pays,
      id_periodes: month,
      year,
      check
    })
  }

  return (
    <div className="trip">

      <div className="lastTrip">
        <h1>Tes derniers voyages:</h1>
        <ul>
          {toPassed.map((visit) => {
            return (
              <li>{visit}</li>
            )
          })}
        </ul>
      </div>

      <div className="nextTrip">
        <form onSubmit={e => {
          valider(e);
        }}>
          <h1>Ajoute un voyage?</h1>

          <div className="country">
            <h1>Pays:</h1>
            <label htmlFor="countries"></label>
            <input list="countries" onChange={evt => setPays(evt.target.value)} />
            <datalist name="countries" id="countries">
              {countries.map((country) => {
                return (<option value={country.id_pays}>{country.nameFr}</option>)
              })}
            </datalist>
          </div>

          <div className="monthly">
            <h1>Période:</h1>
            <label htmlFor="month" ></label>
            <input list="month" onChange={evt => setMonth(evt.target.value)} />
            <datalist name="month" id="month">
              {mois.map((country, i) => {
                return (<option value={i + 1}>{country}</option>)
              })}
            </datalist>
            <label htmlFor="year"></label>
            <input type="number" id="year" placeholder="1970" min="1970" max="2020" onChange={evt => setYear(evt.target.value)}></input>
          </div>

          <div>
            <input type="radio" value="1" id="" checkCoice1 name="check" onChange={evt => setCheck(evt.target.value)} />
            <label htmlFor="checkCoice1">Fait</label>
            <input type="radio" value="0" id="" checkCoice2 name="check" onChange={evt => setCheck(evt.target.value)} />
            <label htmlFor="checkCoice2">A faire</label>
          </div>
          {check === null
            ? ""
            : <h3>{check === "1" ? "Tu es parties" : "Tu vas partir"} {pays} au mois de {mois[parseInt(month) - 1]} en {year}</h3>
          }

          <input type="submit" className="valider" />
        </form>
      </div>

    </div>
  )
}
export default NewTrip;