import React from "react";
import { useSelector } from "react-redux";
import "./nextTrip.scss"

function NextTrip() {
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
      {toNext.map((country, i) => {
        if (i === 0) {
          return (
            <div className="nextTrip">
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
              </div>
            </div>
          )
        }

      })}

      {toPassed.map((countryLast, i) => {
        if (i === 0) {
          return (
            <div className="lastTrip">
              <div className="pays">
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
        }

      })}
    </div>
  )

}
export default NextTrip;
