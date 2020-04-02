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
  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  const colorScale = scaleLinear()
    .domain([0.29, 0.68])
    .range(["#ffedea", "#ff5233"]);

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
            <img src={`${user.avatar}`}></img>
          </div>
        )
      })},
      <div className="map">
        <h1>Tes voyages </h1>
        {/* <ZoomableGroup zoom={1}> */}
        <ComposableMap
          projectionConfig={{
            rotate: [-10, 0, 0],
            scale: 147
          }}
        >
          {/* <Sphere stroke="#E4E5E6" strokeWidth={0.5} /> */}
          {/* <Graticule stroke="#E4E5E6" strokeWidth={0.5} /> */}
          {data.length > 0 && (
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const d = data.find(s => s.ISO3 === geo.properties.ISO_A3);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
                    />
                  );
                })
              }
            </Geographies>
          )}
          <Annotation
            subject={[2.3522, 48.8566]}
            dx={-90}
            dy={-30}
            connectorProps={{
              stroke: "#FF5533",
              strokeWidth: 3,
              strokeLinecap: "round"
            }}
          >
            <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#F53">
              {"Paris"}
            </text>
          </Annotation>
        </ComposableMap>
        {/* </ZoomableGroup> */}
      </div>
    </div>
  );

};

export default User;