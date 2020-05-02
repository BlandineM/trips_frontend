import React, { useState } from "react";
import { useSelector } from "react-redux";
import TripCard from "./TripCard";
import "./tripList.scss"

function TripList() {
  const [check, setCheck] = useState('fait');
  const toPassed = useSelector(state => state.LastTrip);
  const toNext = useSelector(state => state.NextTrip);
  return (
    <div className="list_countries">
      <h2 onClick={() => { setCheck('fait') }} className={`check titre `}>Fait</h2>
      <h2 onClick={() => { setCheck('aFaire') }} className={`new titre`}>A faire</h2>
      <div className="container">
        {check === 'fait'
          ?
          toPassed.map((country) => {
            return (
              <div className={`list_entete${check === "fait" ? " visible" : ""}`}>
                <TripCard country={country} />
              </div>
            )
          })
          :
          toNext.map((country) => {
            return (
              <div className={`list_entete${check === "aFaire" ? " visible" : ""}`}>
                <TripCard country={country} />
              </div>
            )
          })
        }
      </div>

    </div>

  )
}

export default TripList;