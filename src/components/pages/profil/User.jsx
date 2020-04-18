import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from 'axios';
import "./user.scss"
// import Data from '/data/data.json'
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  Annotation,
  ZoomableGroup
} from "react-simple-maps";
const { apiSite } = require("../../../conf")

function User() {
  const [profil, setProfil] = useState([]);
  const [choice, setChoice] = useState('map');
  const [check, setCheck] = useState('fait');
  const toPassed = useSelector(state => state.LastTrip);
  const toNext = useSelector(state => state.NextTrip);
  const [test, setTest] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);

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
    Axios.get(`${apiSite}/profil/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(({ data }) => {
      setProfil(data);
      dispatch({ type: "DATA_LAST_TRIP", data: data.countries });
    });

    Axios.get(`${apiSite}/nextTrip/user/2`, {
      // headers: { Authorization: `Bearer ${token}` }
    }).then(({ data }) => {
      dispatch({ type: "DATA_NEXT_TRIP", data: data });
    });

  }, [dispatch, token, user.id]);

  function fileSelectedHandler(e) {
    e.preventDefault();
    setSelectedFile(e.target.files[0])
    fileUploadHandler(e);
    return setSelectedFile(false);
  }

  function fileUploadHandler(e) {
    e.persist();
    const { selectedFile } = this.state;
    const { refreshProfile } = this.props;
    const formData = new FormData();
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      timeout: 6000
    };
    formData.append('avatar', selectedFile);
    Axios.post(`${apiSite}/users/${user.id}/avatar`, formData, config)
      .then(refreshProfile)
      .catch(console.log);
  }

  const codeVisited = toPassed.map((c) => { return c.code })
  const codeToVisit = toNext.map((c) => { return c.code })
  return (

    <div className="container_profil">

      <div>
        <h1 className="title_user">Informations:</h1>

        <div className="profil">
          <h2 className="name">{user.name}</h2>
          <img src={(profil.avatar != null
            ? `${user.avatar}`
            : 'https://res.cloudinary.com/blandine/image/upload/v1585844046/avatar/none.png')}
            alt='image de profil'></img>
          <input
            style={{ display: 'none' }}
            type="file"
            name="avatar"
            accept="image/x-png,image/gif,image/jpeg"
            onChange={(e) => { fileSelectedHandler(e); }}
          // ref={(fileInput) => { this.fileInput = fileInput; }}
          />
          <button type="button" >Modifier mon avatar</button>
        </div>

      </div>
      <h1 className="title_user">Voyages: </h1>

      <div className="choice-profil">
        <h2 onClick={() => { setChoice('map') }} className={`map${choice === "map" ? ' selected' : ""}`}>Map</h2>
        <h2 onClick={() => { setChoice('liste') }} className={`liste${choice === "liste" ? ' selected' : ""}`}>Liste</h2>
      </div>

      <div className="legend"></div>
      {
        choice === 'map'
          ?

          <div className="mapworld">

            <div>
              <h3 onClick={() => { setCheck('fait') }} className="legend check">Fait</h3>
              <h3 onClick={() => { setCheck('aFaire') }} className="legend new">A faire</h3>
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
                            fill: (check === "fait" ? codeVisited : codeToVisit).includes(geo.properties.ISO_A3) ? (check === "fait" ? "#ffa41b" : "#4cd3c2") : "#D6D6DA",
                            outline: "none"
                          },
                          hover: {
                            fill: (check === "fait" ? codeVisited : codeToVisit).includes(geo.properties.ISO_A3) ? (check === "fait" ? "#ffa41b" : "#4cd3c2") : "#D6D6DA",
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

          <div>
            <table className="list_entete">
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
            <h2>Les prochains</h2>
            <ul>
              {toNext.map((country) => {
                return (<li>{country.pays_name}</li>)
              })}

            </ul>
          </div>

      }
      <h1>Ajoute un voyage </h1>
    </div >

  );
};

export default User;