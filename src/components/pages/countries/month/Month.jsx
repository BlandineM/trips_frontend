import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../../NavBar";
import "./Month.scss";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import MonthCard from './MonthCard';

const { apiSite } = require("../../../../conf");

function Month() {
  const [filterG, setfilterG] = useState([]);
  const [filterB, setfilterB] = useState([]);
  const [weather, setWeather] = useState([])
  const [trippers, setTripper] = useState([]);
  const { month, type } = useParams();
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
    axios.get(`${apiSite}/type/${type}/period/${month}/advised/advised`).then(({ data }) => {
      setfilterG(data);
    });
    axios.get(`${apiSite}/type/${type}/period/${month}/advised/wrong`).then(({ data }) => {
      setfilterB(data);
    });
    axios.get(`${apiSite}/countries/tripper/period/${month}`).then(({ data }) => {
      setTripper(data)
    });
    axios.get(`${apiSite}/countries/weather/period/${month}`).then(({ data }) => {
      setWeather(data)
    })
  }, [setfilterG, setfilterB, month, type]);

  return (
    <div className="main">
      <style>
        @import
        url('https://fonts.googleapis.com/css?family=Indie+Flower|Lobster&display=swap');
      </style>
      <h1 className="title">Direction {type} </h1>

      <NavBar place={type} />

      <div className="destinations">

        <div className="titlecard">
          <h2>En {mois[month]} tu peux visiter</h2>

          <div className="destinationsG">
            {filterG.map((country, i) => {
              return (<div key={i} className="cards"><MonthCard country={country} key={i} /></div>);
            })}
          </div>
        </div>
        <NavLink to={`/newtrip`} className="newTrip">
          <div className="addTrip">
            <h2>Ajoute un voyage en {mois[month]} ? </h2>
          </div>
        </NavLink>

        <div className="separation"></div>

        <div className="titlecard">
          <h2>Déconseillé en {mois[month]}</h2>

          <div className="destinationsB">
            {filterB.map((country, i) => {
              return (<div key={i} className="cards"><MonthCard country={country} key={i} /></div>);
            })}
          </div>

        </div>

      </div>

    </div>
  );
}
export default Month;
