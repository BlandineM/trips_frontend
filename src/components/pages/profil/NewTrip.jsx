import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Axios from 'axios';
import "./newTrip.scss"
import { NavLink } from "react-router-dom";

const { apiSite } = require("../../../conf")
function NewTrip() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState([]);
  const [year, setYear] = useState([]);
  const [month, setMonth] = useState();
  const [check, setCheck] = useState(null);
  const toPassed = useSelector(state => state.LastTrip);
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
    })
  }, [])

  function valider(e) {
    Axios.post(`${apiSite}/me/trip`,
      {
        country,
        month,
        year,
        check
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    )
  }
  return (
    <div>
      <NavLink to={`/profil`}>
        <img src="/fleche.png" alt="" />
      </NavLink>
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
            e.preventDefault(e)
            valider(e);
          }}>
            <h1>Ajoute un voyage?</h1>

            <div className="country">
              <h1>Pays:</h1>
              <label htmlFor="countries"></label>
              <input list="countries" onChange={evt => setCountry(evt.target.value)} />
              <datalist name="countries" id="countries">
                {countries.map((country) => {
                  return (<option data-value={country.id_countries} value={country.nameFr} key={country.id_countries}></option>)
                })}
              </datalist>
            </div>

            <div className="monthly">
              <h1>Période:</h1>
              <label htmlFor="month" ></label>
              <input list="month" onChange={evt => (console.log(evt.target.value, "evt target period ")
                //  setMonth(evt.target.value)}
              )}
              />
              <datalist name="month" id="month">
                {mois.map((country, i) => {
                  return (<option value={i + 1} data-value={country} key={i}></option>)
                })}
              </datalist>
              <input type="hidden" name="answer" id="answerInput-hidden"></input>

              <label htmlFor="year"></label>
              <input type="number" id="year" placeholder="1970" min="1970" onChange={evt => setYear(evt.target.value)}></input>
            </div>

            <div>
              <input type="radio" value="1" id="checkCoice1" name="check" onChange={evt => setCheck(evt.target.value)} />
              <label htmlFor="checkCoice1">Fait</label>
              <input type="radio" value="0" id="checkCoice2" name="check" onChange={evt => setCheck(evt.target.value)} />
              <label htmlFor="checkCoice2">A faire</label>
            </div>
            {check === null
              ? ""
              : <h3>{check === "1" ? "Tu es parties" : "Tu vas partir"} {country} au mois de {mois[parseInt(month) - 1]} en {year}</h3>
            }

            <input type="submit" className="valider" />
          </form>
        </div>

      </div>
    </div>
  )
}
export default NewTrip;