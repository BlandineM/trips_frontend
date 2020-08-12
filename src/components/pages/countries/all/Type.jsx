import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../../NavBar";
import "./type.scss";
import { useParams } from "react-router-dom";
import MonthCard from '../month/MonthCard';

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
          const tripper = trippers.find(tripper => tripper.id_countries === country.id_country)
          return (
            <div key={i} className="cards">
              <MonthCard country={country} tripperAll={tripper} key={i} />
            </div>
          );
        })

        }
      </div>

    </div >
  );
}

export default Type;