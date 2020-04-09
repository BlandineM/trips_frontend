import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../../NavBar";
import "./type.scss";
import { useParams } from "react-router-dom";

function Type() {
  const [pays, setpays] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/type/${type}`).then(({ data }) => {
      setpays(data);
    });
  }, [setpays, type]);


  return (
    <div className="main">
      <h1 className="title">Direction {type} </h1>

      <NavBar place={type} />
      <div className="destinations">
        {pays.map((pays, i) => {
          return (
            <div key={i} className="cards">
              <div className="image">
                <h2>{pays.nameFr != null
                  ? pays.nameFr
                  : pays.name}</h2>
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
        })}
      </div>
    </div >
  );
}

export default Type;
