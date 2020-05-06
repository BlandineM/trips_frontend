import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const { apiSite } = require("../../../../conf");

function MonthCard(props) {
  const { month } = useParams();

  const [weather, setWeather] = useState([])
  const [trippers, setTripper] = useState([]);
  const mois = {
    "01": "Janvier",
    "02": "Fevrier",
    "03": "Mars",
    "04": "Avril",
    "05": "Mai",
    "06": "Juin",
    "07": "Juillet",
    "08": "Aout",
    "09": "Septembre",
    "10": "Octobre",
    "11": "Novembre",
    "12": "Decembre"
  };
  useEffect(() => {
    axios.get(`${apiSite}/countries/tripper/period/${month}`).then(({ data }) => {
      setTripper(data)
    });
    axios.get(`${apiSite}/countries/weather/period/${month}`).then(({ data }) => {
      setWeather(data)
    })
  }, [month]);

  return (
    <div className="image">

      <div className="info_countries">
        <h2 className="title_country">{props.country.nameFr != null
          ? props.country.nameFr
          : props.country.name}</h2>
        <img className="info_country" src={`${props.country.flag}`} alt={props.country.name}></img>

        {trippers.map((tripper) => {
          return (
            ((props.country.id_countries === tripper.id_countries)
              ? (<h2 className="tripper">{tripper.numOfVisited} {tripper.numOfVisited > 1 ? "personnes ont" : "personne a"} déjà été ici en {mois[month]}</h2>)
              : ("")))
        })}
        {props.tripperAll
          ? <h2 className="tripper">{props.tripperAll.numOfVisited} {props.tripperAll.numOfVisited > 1 ? "personnes ont" : "personne a"} déjà été ici</h2>
          : ""
        }


        {weather.map((temperature) => {
          return (
            ((props.country.id_countries === temperature.id_countries)
              ? (<div>
                <img className="thermometer" src="/thermometer.png" alt="termometer" />
                <h2 className="weather">{temperature.temperature} C°</h2>
                <img className="rain" src="/rain.png" alt="water" />
                <h2 className="precipitation">{temperature.precipitation} mm</h2>
              </div>) :
              "")
          )
        })}
      </div>

      <img
        className="destinationPicture"
        src={props.country.pictures != null
          ? `${props.country.pictures}`
          : `${props.country.flag}`}
        alt={`${props.country.name}`}
      />
    </div>

  )
}
export default MonthCard;