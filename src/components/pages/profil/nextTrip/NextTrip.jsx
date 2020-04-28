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

  return (
    <div>
      {toNext.map((country, i) => {
        if (i === 0) {
          return (
            <div className="nextTrip">
              <div className="date">
                <h1>{mois[country.periode_month]}</h1>
                {country.year != null ? (<h1>{country.year}</h1>) : (<h1>Année à définir</h1>)}
              </div>
              <div className="pays">
                <img src={country.pays_flag} alt="flag of country" />
                <div>
                  <h1 className="country_name">{country.pays_name}</h1>
                  <h2 className="compte">Dans 1 mois</h2>
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
                  <h1 className="country_name">{countryLast.pays_name}</h1>
                  <h2 className="compte">Il y a  1 mois</h2>
                </div>
                <img src={countryLast.pays_flag} alt="flag of country" />
              </div>
              <div className="date">
                <h1>{mois[countryLast.periode_month]}</h1>
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