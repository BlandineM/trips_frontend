import React from "react";
import { useSelector } from "react-redux";
import "./nextTrip.scss"

function NextTrip() {
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
    toNext.map((test, i) => {
      if (i === 0) {
        return (
          <div className="nextTrip">
            <div className="date">
              <h1>{mois[test.periode_month]}</h1>
              {test.year != null ? (<h1>{test.year}</h1>) : (<h1>Année à définir</h1>)}
            </div>
            <div className="pays">
              <h1>{test.pays_name}</h1>
            </div>
          </div>
        )
      }
    })
  )

}
export default NextTrip;