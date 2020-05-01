import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import Infos from "./info/Infos";
import Nav from "./nav/Nav";
import NextTrip from "./nextTrip/NextTrip"
import "./user.scss"
// import Data from '/data/data.json'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";


const { apiSite } = require("../../../conf")

function User() {
  const [choice, setChoice] = useState('map');
  const [check, setCheck] = useState('fait');
  const toPassed = useSelector(state => state.LastTrip);
  const toNext = useSelector(state => state.NextTrip);
  const user = useSelector(state => state.user);
  const token = useSelector(state => state.user.token);
  const dispatch = useDispatch();

  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
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



  useEffect(() => {
    axios.get(`${apiSite}/profil/${user.id}/countries`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(({ data }) => {
      dispatch({ type: "DATA_LAST_TRIP", data: data.filter(data => data.check === 1) });
      dispatch({ type: "DATA_NEXT_TRIP", data: data.filter(data => data.check === 0) })
    });

  }, [dispatch, user.id]);

  const codeVisited = toPassed.map((c) => { return c.code })
  const codeToVisit = toNext.map((c) => { return c.code })

  return (

    <div className="container_profil">
      <Infos />
      <Nav />

      <NextTrip />

      <div className="legend"></div>
      {
        choice === 'map'
          ?

          <div className="mapworld">

            <div>
              <h3 onClick={() => { setCheck('aFaire') }} className="legend new">A faire</h3>
              <h3 onClick={() => { setCheck('fait') }} className="legend check">Fait</h3>
            </div>

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
                            fill: (check === "fait" ? codeVisited : codeToVisit).includes(geo.properties.ISO_A3) ? (check === "fait" ? "rgba(39,73,109,1)" : "#4cd3c2") : "#D6D6DA",
                            outline: "none"
                          },
                          hover: {
                            fill: (check === "fait" ? codeVisited : codeToVisit).includes(geo.properties.ISO_A3) ? (check === "fait" ? "rgba(39,73,109,1)" : "#4cd3c2") : "#D6D6DA",
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

          <div className="list_countries">
            <h2 onClick={() => { setCheck('fait') }} className={`check titre `}>Fait</h2>
            <table className={`list_entete${check === "fait" ? " visible" : ""}`}>
              <thead>
                <th>Nom du pays</th>
                <th>Période voyagé</th>
                <th>Année du voyage</th>
              </thead>
              {toPassed.map((country) => {
                return (
                  <tbody className="list_corps">
                    <td>{country.pays_name}</td>
                    <td>{mois[country.periode_month]}</td>
                    <td>{country.year}</td>
                  </tbody>
                )
              })}
            </table>
            <h2 onClick={() => { setCheck('aFaire') }} className={`new titre`}>A faire</h2>
            <table className={`list_entete${check === "aFaire" ? " visible" : ""}`}>
              <thead>
                <th>Nom du pays</th>
              </thead>
              {toNext.map((country) => {
                return (
                  <tbody className="list_corps">
                    <td>{country.pays_name}</td>
                  </tbody>
                )
              })}
            </table>

            <ul>


            </ul>
          </div>

      }
      <h1 className="title_user">Ajoute un voyage </h1>
    </div >

  );
};

export default User;
