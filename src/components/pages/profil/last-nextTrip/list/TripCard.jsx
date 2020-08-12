import React from "react";

function TripCard(props) {
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
    <div className="item">
      <img src={props.country.pictures ? props.country.pictures : props.country.flag} alt={props.country.country_name} />
      <div className="info">
        <h1 className="country">{props.country.country_name}</h1>
        <h2 className="period">{props.country.month ? `${mois[props.country.month]}` : ''} {props.country.year ? `${props.country.year}` : ''} </h2>
      </div>
    </div>
  )
}
export default TripCard; 