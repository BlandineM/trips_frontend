import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./lastNextTrip.scss"
import TripList from './list/TripList';
import { NavLink } from "react-router-dom";

function LastNextTrip() {
  const [isToggledToCheck, setToggledToCheck] = useState(false);
  const toggleToCheck = () => setToggledToCheck(!isToggledToCheck);
  const [isToggledCheck, setToggledCheck] = useState(false);
  const toggleCheck = () => setToggledCheck(!isToggledCheck);
  const toNext = useSelector(state => state.NextTrip);
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
  function compteur(country) {
    const dateConverter = Date.parse(` ${country.month + 1} 01 ${country.year} 00:00:00 GMT`);
    let compte = parseInt((dateConverter - Date.now()));
    if (compte < 0) {
      compte = compte / -1
    }
    let compteur = 0
    let unite = ""
    if (compte > 31536000000) {
      compteur = parseInt(compte / 31536000000)
      unite = "ans"
    }
    else if (compte > 2628000000) {
      compteur = parseInt(compte / 2628000000)
      unite = "mois"
    } else if (compte > 86400000) {
      compteur = parseInt(compte / 86400000)
      unite = "jours"
    }
    return (`${compteur} ${unite}`)
  }
  return (
    <div>
      {toNext.length > 0
        ? toNext.map((country, i) => {
          return (
            i === 0
              ? (
                <div className="nextTrip" onClick={toggleToCheck}>
                  <div className="date">
                    <h1>{mois[country.month]}</h1>
                    {country.year != null ? (<h1>{country.year}</h1>) : (<h1>Année à définir</h1>)}
                  </div>
                  <div className="pays">
                    <img src={country.flag} alt="flag of country" />
                    <div>
                      <h1 className="country_name">{country.country_name}</h1>
                      <h2 className="compte">Dans {compteur(country)}</h2>
                    </div>
                    <span title="Déroule les voyages prévus">
                      <img src="/fleche_bas_next.png" alt="fleche" className={`fleche ${isToggledToCheck ? "haut" : "bas"}`} />
                    </span>
                  </div>
                  <NavLink to={`/new`} className="newTrip">
                    <span title="Ajoute une voyage !">
                      <h1 className="addTrip">+</h1>
                    </span>
                  </NavLink>
                </div>
              )
              : ""
          )
        })
        : (<div className="nextTrip">
          <div className="empty">
            <h1 className="nextTripEmpty">Tu n'as pas de prochain voyages de prévu</h1>
            <NavLink to={`/new`} className="newTrip">
              <h1 className="addTrip Next">+</h1>
            </NavLink>
          </div>
        </div>)
      }
      {isToggledToCheck
        ? <TripList toCheck={isToggledToCheck} />
        : ""}

      {toPassed.length > 0
        ? (toPassed.map((countryLast, i) => {
          return (
            i === 0
              ? (
                <div className="lastTrip" onClick={toggleCheck}>
                  <NavLink to={`/new`} className="newTrip">
                    <span title="Ajoute un voyage !">
                      <h1 className="addTrip">+</h1>
                    </span>
                  </NavLink>
                  <div className="pays">
                    <span title="Déroule les voyages éffectués.">
                      <img src="/fleche_bas_last.png" alt="fleche" className={`fleche ${isToggledCheck ? "haut" : "bas"}`} />
                    </span>
                    <div>
                      <h1 className="country_name">{countryLast.country_name}</h1>
                      <h2 className="compte">Il y a  {compteur(countryLast)}</h2>
                    </div>
                    <img src={countryLast.flag} alt="flag of country" />
                  </div>
                  <div className="date">
                    <h1>{mois[countryLast.month]}</h1>
                    {countryLast.year != null ? (<h1>{countryLast.year}</h1>) : (<h1>Année à définir</h1>)}
                  </div>
                </div>
              )
              : ""
          )
        }))
        : (<div className="lastTrip">
          <div className="empty">
            <NavLink to={`/new`} className="newTrip">
              <h1 className="addTrip">+</h1>
            </NavLink>
            <h1 className="lastTripEmpty">Tu n'as pas de voyages effectué</h1>
          </div>
        </div>
        )}
      {isToggledCheck
        ? <TripList check={isToggledCheck} />
        : ""}
    </div>
  )

}
export default LastNextTrip;
