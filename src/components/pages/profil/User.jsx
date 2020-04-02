import React, { useState, useEffect } from "react";
import Axios from 'axios';
import "./user.scss"
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  Annotation,
  ZoomableGroup
} from "react-simple-maps";

function User() {
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const [choice, setChoice] = useState('map')
  const geoUrl =
      "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  const visitedCountry = ["FRA","BRA"];

  useEffect(() => {
    Axios.get(`http://localhost:5000/profil/2`).then(({ data }) => {
      setUser(data);
    });
    csv(`/vulnerability.csv`).then(data => {
      setData(data);
    });
  }, [])
  console.log(user[0]);


  return (
    <div>
      {user.map((user) => {
        return (
          <div className="profil">
            <h1 className="name">{user.name}</h1>
            <img src={(user.avatar != null
              ? `${user.avatar}`
              : 'https://res.cloudinary.com/blandine/image/upload/v1585844046/avatar/none.png')}
              alt='image de profil'></img>
          </div>
        )
      })},
      <h1 className="titlev">Tes voyages </h1>
      <div className="choice-profil">
        <h2 onClick={() => { setChoice('map') }} >Map</h2>
        <h2 onClick={() => { setChoice('liste') }}>Liste</h2>
      </div>
      {choice === 'map'
        ? <div className="map">
          <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
            <ZoomableGroup>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map(geo => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        console.log(geo.properties.ISO_A3);
                      }}
                      style={{
                        default: {
                          fill: visitedCountry.includes(geo.properties.ISO_A3) ? "#ffa41b" : "#D6D6DA",
                          outline: "none"
                        },
                        hover: {
                          fill: visitedCountry.includes(geo.properties.ISO_A3) ? "#ffa41b" : "#D6D6DA",
                          outline: "none"
                        }
                      }}
                    />
                  ))
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
        :
        <h1>Liste des pays visités</h1>
      }
    </div>
  );

};

export default User;