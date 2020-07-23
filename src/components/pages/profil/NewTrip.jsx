import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Axios from 'axios';
import "./newTrip.scss"
import { NavLink } from "react-router-dom";

const { apiSite } = require("../../../conf")
function NewTrip() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState([]);
  const [year, setYear] = useState([]);
  const [month, setMonth] = useState();
  const [check, setCheck] = useState(null);
  const [preview, setPreview] = useState('')
  const [file, setFile] = useState('')
  const [description, setDescription] = useState('')
  const toPassed = useSelector(state => state.LastTrip);
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
  ];
  const onChange = e => {
    return new Promise(() => {
      setPreview(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    })
  };

  useEffect(() => {
    Axios.get(`${apiSite}/countries`).then(({ data }) => {
      setCountries(data)
    })
  }, [])

  function valider(e) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('country', country);
    formData.append('month', month);
    formData.append('year', year);
    formData.append('check', check);
    formData.append('description', description);
    return Axios.post(`${apiSite}/me/trip`, formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  }
  return (
    <div>
      <NavLink to={`/profil`}>
        <img src="/fleche.png" alt="retour" />
      </NavLink>
      <div className="trip">
        <div className="lastTrip">
          <table >
            <thead>
              <tr>
                <td>
                  Tes derniers voyages:
                </td>
              </tr>
            </thead>
            {toPassed.map((visit, i) => {
              return (
                <tbody key={i}>
                  <tr >

                    <td><img src={visit.flag} alt={visit.country_name} /></td>
                    <td >
                      {visit.country_name}
                    </td>
                    <td>{visit.year}</td>

                  </tr>
                </tbody>
              )
            })}
          </table>
        </div>

        <div className="nextTrip">
          <form onSubmit={e => {
            e.preventDefault(e)
            valider(e);
          }}>
            <h1>Ajoute un voyage?</h1>

            <div className="country">
              <label htmlFor="countries">Pays:</label>
              <input list="countries" onChange={evt => setCountry(evt.target.value)} />
              <datalist name="countries" id="countries">
                {countries.map((country) => {
                  return (<option data-value={country.id_countries} value={country.id_countries} key={country.id_countries}></option>)
                })}
              </datalist>
            </div>

            <div className="monthly">
              <label htmlFor="month" >Période: </label>
              <input list="month" onChange={evt =>
                setMonth(evt.target.value)}
              />
              <datalist name="month" id="month">
                {mois.map((country, i) => {
                  return (<option value={i + 1} data-value={country} key={i}></option>)
                })}
              </datalist>
              {/* <input type="hidden" name="answer" id="answerInput-hidden"></input> */}
              <label htmlFor="year">Année:</label>
              <input type="number" id="year" placeholder="1970" min="1970" onChange={evt => setYear(evt.target.value)}></input>
            </div>

            <div>
              <input type="radio" value="1" id="checkCoice1" name="check" onChange={evt => setCheck(evt.target.value)} />
              <label htmlFor="checkCoice1">Fait</label>
              <input type="radio" value="0" id="checkCoice2" name="check" onChange={evt => setCheck(evt.target.value)} />
              <label htmlFor="checkCoice2">A faire</label>
            </div>
            {check === null
              ? ""
              : <h3>{check === "1" ? "Tu es parties" : "Tu vas partir"} {country} au mois de {mois[parseInt(month) - 1]} en {year}</h3>
            }
            <label for="story">Quelques lignes sur ton voyage:</label>

            <textarea id="story" name="story"
              rows="5" cols="33" onChange={evt => setDescription(evt.target.value)}>
            </textarea>
            <label className='custom-file-label' htmlFor='customFile'>
              {preview ? <img src={preview} alt="profil" />
                : (<img src={('https://res.cloudinary.com/blandine/image/upload/v1585844046/avatar/none.png')}
                  alt='voyage'></img>
                )}
            </label>
            <input
              style={{ display: 'none' }}
              type='file'
              className='custom-file-input'
              id='customFile'
              accept="image/x-png,image/gif,image/jpeg"
              onChange={onChange}
            >
            </input>

            <input type="submit" className="valider" />
          </form>
        </div>

      </div>
    </div>
  )
}
export default NewTrip;