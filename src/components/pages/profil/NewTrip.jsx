import React, { useState, useEffect } from "react";
import Axios from 'axios';

function NewTrip() {
  const [pays, setPays] = useState("");
  const [periode, setPeriode] = useState("");
  const [idUser, setIdUser] = useState("");
  const [countries, setCountries] = useState([])

  useEffect(){
    Axios.get(``).then(({ data }) => {
      setCountries(data)
    }),
      Axios.post(``, {
        pays,
        periode,
        idUser
      })
  }

  return (
    <div>
      <form>
        <h1>Pays</h1>
        <label htmlFor="countries"></label>
        <select name="countries" id="countries">
          <option value="Choisis un pays"></option>
          {countries.map((country) => {
            <option value={country.name} onChange={evt => setPays(evt.target.value)}></option>
          })
        </select>
        <h1>Période</h1>
        <label htmlFor="year"></label>
        <input type="month" id="year" onChange={evt => setPeriode(evt.target.value)}></input>
        <input type="submit" />
      </form>
    </div>
  )

}
export default NewTrip;