import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Axios from 'axios';
import "./newTrip.scss"
import { NavLink } from "react-router-dom";
import moment from 'moment';
import Select from 'react-select';

const { apiSite } = require("../../../conf")
function NewTrip() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState();
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [preview, setPreview] = useState('')
  const [file, setFile] = useState('')
  const [description, setDescription] = useState('')

  const toPassed = useSelector(state => state.LastTrip);
  const monthList = [
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

  function selectCountry(selectedCountry) {
    setCountry(selectedCountry.value );
  }

  function selectMonth(selectedMonth) {
    setMonth(selectedMonth.value );
  }

  function valider(e) {
    if(country  !== undefined && month !== undefined && year !== undefined){
    const formData = new FormData();
    formData.append('file', file);
    formData.append('country', country);
    formData.append('month', month);
    formData.append('year', year);
    formData.append('description', description);
    return Axios.post(`${apiSite}/me/trip`, formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )

  }}
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
                      {visit.country_nameFr=! undefined? visit.country_nameFr:visit.country_name}
                    </td>
                    <td>{visit.year===0?"Année non connu": visit.year}</td>

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
              <h1>Pays:</h1>
              <label htmlFor="countries"></label>
              <Select
                  id="countries"
                  onChange={selectCountry}
                  options={countries.map((country) => {
                    return {value: country.id_countries, label: country.nameFr!=undefined?country.nameFr : country.name}
                  })}
                  isSearchable="true"
              />
            </div>

            <div className="monthly">
              <h1>Période:</h1>
              <label htmlFor="month" ></label>
              <Select
                  id="month"
                  onChange={selectMonth}
                  options={monthList.map((month, i) => {
                    return {value: i+1, label: month}
                  })}
                  isSearchable="true"
              />

              <label htmlFor="year"></label>

              <input type="number" id="year" placeholder="1970" min="1970" onChange={evt => setYear(evt.target.value)}></input>
            </div>
            {(month === undefined || year === undefined || country === undefined)
              ? ""
              : <h3>{moment().set({'year': year, 'month': month}).isSameOrBefore(moment())  ? "Tu es parties" : "Tu vas partir"} {countries[country-840].name} au mois de {monthList[parseInt(month) - 1]} en {year}</h3>
            }
            {(month === undefined || year === undefined || country === undefined)
              ? ""
              : <div>

                {moment().set({'year': year, 'month': month}).isSameOrBefore(moment())  
                ?<div>
                
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
                </div>
                : ""}
              </div>}
            

            <input type="submit" className="valider" />
          </form>
        </div>

      </div>
    </div>
  )
}
export default NewTrip;