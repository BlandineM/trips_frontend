import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import Infos from "./info/Infos";
import "./nav.scss";
import LastNextTrip from "./last-nextTrip/LastNextTrip";
import Map from "./map/Map"
import "./user.scss"
import Suggestion from './suggestion/Suggestion';
// import Data from '/data/data.json'

const { apiSite } = require("../../../conf")

function User() {
  const [isToggledCheck, setToggledCheck] = useState(false);
  const toggleCheck = () => setToggledCheck(!isToggledCheck);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${apiSite}/me/profil/countries`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(({ data }) => {
      console.log(data, "data user ");

      dispatch({ type: "DATA_LAST_TRIP", data: data.filter(data => data.check === 1) });
      dispatch({ type: "DATA_NEXT_TRIP", data: data.filter(data => data.check === 0) })
    });
  }, [dispatch, user.id]);


  return (
    <div className="container_profil">
      <Infos />
      <Suggestion />
      <LastNextTrip />

      <div className="legend"></div>


      <div className="mapworld">
        <div>
          <h3 onClick={toggleCheck} className={`legend ${isToggledCheck ? "new" : "check"}`}>{isToggledCheck ? "A Faire" : "Fait"}</h3>
        </div>
        <Map check={isToggledCheck} />
      </div>

    </div >

  );
};

export default User;
