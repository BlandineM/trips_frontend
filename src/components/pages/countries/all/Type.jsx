import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../../NavBar";
import "./type.scss";
import { useParams } from "react-router-dom";

const { apiSite } = require("../../../../conf")

function Type() {
  const [pays, setpays] = useState([]);
  const [trippers, setTripper] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    axios.get(`${apiSite}/type/${type}/countries`).then(({ data }) => {
      setpays(data);
    });
    axios.get(`${apiSite}/countries/tripper`).then(({ data }) => {
      setTripper(data)
    })
  }, [setpays, type]);

  console.log("tripper", trippers);

  return (
    <div className="main">
      <h1 className="title">Direction {type} </h1>

      <NavBar place={type} />

      <div className="destinations">
        {pays.map((pays, i) => {
          return (
            <div key={i} className="cards">

              <div className="image">

                <div className="info_countries">
                  {trippers.map((tripper) => {
                    return (
                      ((pays.id_pays === tripper.id_pays)
                        ? (<h2 className="tripeur">{tripper.numOfVisited} {tripper.numOfVisited > 1 ? "personnes" : "personne"} à déjà été ici</h2>)
                        : (<h2 className="tripeur"></h2>)))
                  })}
                  <h2>{pays.nameFr != null
                    ? pays.nameFr
                    : pays.name}</h2>
                  <img className="info_pays" src={`${pays.flag}`}></img>
                </div>

                <img
                  className="destinationPicture"
                  src={pays.pictures != null
                    ? `${pays.pictures}`
                    : `${pays.flag}`}
                  alt={`${pays.name}`}
                ></img>
              </div>

            </div>
          );
        })

        }
      </div>

    </div >
  );
}

export default Type;