import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../../NavBar";
import "./type.scss";
import { useParams } from "react-router-dom";

const { apiSite } = require("../../../../conf")

function Type() {
  const [countries, setCountries] = useState([]);
  const [trippers, setTripper] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    axios.get(`${apiSite}/type/${type}/countries`).then(({ data }) => {
      setCountries(data);
    });
    axios.get(`${apiSite}/countries/tripper`).then(({ data }) => {
      setTripper(data)
    })
  }, [setCountries, type]);



  return (
    <div className="main">
      <h1 className="title">Direction {type} </h1>

      <NavBar place={type} />

      <div className="destinations">
        {countries.map((country, i) => {
          return (
            <div key={i} className="cards">

              <div className="image">

                <div className="info_countries">
                  {trippers.map((tripper) => {
                    return (
                      ((country.id_country === tripper.id_countries)
                        ? (<h2 className="tripper">{tripper.numOfVisited} {tripper.numOfVisited > 1 ? "personnes ont" : "personne a"} déjà été ici</h2>)
                        : ("")))
                  })}
                  <h2>{country.nameFr != null
                    ? country.nameFr
                    : country.name}</h2>
                  <img className="info_country" src={`${country.flag}`}></img>
                </div>

                <img
                  className="destinationPicture"
                  src={country.pictures != null
                    ? `${country.pictures}`
                    : `${country.flag}`}
                  alt={`${country.name}`}
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