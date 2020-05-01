import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import Infos from "./info/Infos";
import "./nav.scss";
import NextTrip from "./nextTrip/NextTrip";
import Map from "./map/Map"
import List from "./list/List"
import "./user.scss"
// import Data from '/data/data.json'



const { apiSite } = require("../../../conf")

function User() {
  const [choice, setChoice] = useState('map');
  const [check, setCheck] = useState('fait');
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${apiSite}/profil/${user.id}/countries`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(({ data }) => {
      dispatch({ type: "DATA_LAST_TRIP", data: data.filter(data => data.check === 1) });
      dispatch({ type: "DATA_NEXT_TRIP", data: data.filter(data => data.check === 0) })
    });

  }, [dispatch, user.id]);



  return (

    <div className="container_profil">
      <Infos />
      <div className="choice-profil">
        <h2 onClick={() => { setChoice('map') }} className={`map${choice === "map" ? ' selected' : ""}`}>Map</h2>
        <h2 onClick={() => { setChoice('liste') }} className={`liste${choice === "liste" ? ' selected' : ""}`}>Liste</h2>
      </div>

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
            <Map statut={check} />
          </div>


          :
          <List statut={check} />



      }
      <h1 className="title_user">Ajoute un voyage </h1>
    </div >

  );
};

export default User;
