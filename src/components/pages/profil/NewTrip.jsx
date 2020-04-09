import React, { useState, useEffect } from "react";
import Axios from 'axios';
import "./newTrip.scss"

function NewTrip() {
  const [pays, setPays] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [idUser, setIdUser] = useState("2");
  const [countries, setCountries] = useState([]);
  const [visitedCountry, setVisitedCountry] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:5000/countries`).then(({ data }) => {
      setCountries(data)
    });
    Axios.get(`http://localhost:5000/profil/2`).then(({ data }) => {

      setVisitedCountry(data.countries.map((country) => { return (country.pays_name) }));

    });

  }, [])

  function valider(e) {
    Axios.post(`http://localhost:5000/2/country`, {
      id_pays: pays,
      id_periodes: month,
      year,
      id_users: 2
    })
  }

  return (
    <div>
      <h1>Tes derniers voyages:</h1>
      {visitedCountry.map((visit) => {
        console.log(visit);

        return (<h2>{visit}</h2>)
      })}
      <h1>Ton dernier voyage</h1>
      <form onSubmit={e => {
        valider(e);
      }}>
        <div className="country">
          <h1>Pays:</h1>
          <label htmlFor="countries"></label>
          <select name="countries" id="countries">

            {countries.map((country) => {

              return (<option value={country.id_pays} onChange={evt => setPays(evt.target.value)}>{country.nameFr}</option>)
            })}
          </select>
        </div>
        <div className="monthly">
          <h1>Période:</h1>
          <label htmlFor="month"></label>
          <select name="month" id="month">
            <option value="1" onChange={evt => setMonth(evt.target.value)}>Janvier</option>
            <option value="2" onChange={evt => setMonth(evt.target.value)}>Février</option>
            <option value="3" onChange={evt => setMonth(evt.target.value)}>Mars</option>
            <option value="4" onChange={evt => setMonth(evt.target.value)}>Avril</option>
            <option value="5" onChange={evt => setMonth(evt.target.value)}>Mai</option>
            <option value="6" onChange={evt => setMonth(evt.target.value)}>Juin</option>
            <option value="7" onChange={evt => setMonth(evt.target.value)}>Juillet</option>
            <option value="8" onChange={evt => setMonth(evt.target.value)}>Aout</option>
            <option value="9" onChange={evt => setMonth(evt.target.value)}>Septembre</option>
            <option value="10" onChange={evt => setMonth(evt.target.value)}>Octobre</option>
            <option value="11" onChange={evt => setMonth(evt.target.value)}>Novembre</option>
            <option value="12" onChange={evt => setMonth(evt.target.value)}>Décembre</option>
          </select>
          <label htmlFor="year"></label>
          <input type="number" id="year" placeholder="1970" min="1970" max="2020" onChange={evt => setYear(evt.target.value)}></input>

        </div>
        <input type="submit" className="valider" />
      </form>
    </div>
  )

}

export default NewTrip;