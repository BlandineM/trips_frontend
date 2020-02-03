import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import "./style/Month.scss";
import { useParams } from "react-router-dom";

function Month() {
  const [filterG, setfilterG] = useState([]);
  const [filterB, setfilterB] = useState([]);
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
    axios.get(`http://localhost:5000/${type}/${month}`).then(({ data }) => {
      setfilterG(data);
    });
    axios
      .get(`http://localhost:5000/${type}/wrong/${month}`)
      .then(({ data }) => {
        setfilterB(data);
      });
  }, [setfilterG, setfilterB, month]);

  return (
    <div className="main">
      <style>
        @import
        url('https://fonts.googleapis.com/css?family=Indie+Flower|Lobster&display=swap');
      </style>
      <h1> En {mois[month]} </h1>
      <NavBar place={type} />
      <div className="destinations">
        <div className="title">
          <h2>A visiter</h2>
          <div className="destinationsG">
            {filterG.map((pays, i) => {
              return (
                <div key={i} className="cards">
                  <div className="image">
                    <h2>{pays.pays}</h2>
                    <img
                      className="destinationPicture"
                      src={`/destinations/${pays.id}.jpg`}
                      alt={`${pays.pays}`}
                    ></img>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="separation"></div>
        <div className="title">
          <h2>A éviter</h2>
          <div className="destinationsB">
            {filterB.map((pays, i) => {
              return (
                <div key={i} className="cards">
                  <div className="image">
                    <h2>{pays.pays}</h2>
                    <img
                      className="destinationPicture"
                      src={`/destinations/${pays.id}.jpg`}
                      alt={`${pays.pays}`}
                    ></img>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Month;
