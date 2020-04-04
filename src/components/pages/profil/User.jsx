import React, { useState, useEffect } from "react";
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

function User() {
  const [user, setUser] = useState([]);
  const [choice, setChoice] = useState('map');
  const [visitedCountry, setVisitedCountry] = useState([]);
  const [test, setTest] = useState([]);
  // const [selectedFile, setSelectedFile] = useState(null);
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
    Axios.get(`http://localhost:5000/profil/2`).then(({ data }) => {
      setUser(data);
      setVisitedCountry(data.countries.map((country) => { return (country.code) }));
      setTest(data.countries.map((country) => country))
    });

  }, []);

  // function fileSelectedHandler(e) {
  //   e.preventDefault();
  //   console.log("e -------------------------", e.target);

  //   setSelectedFile(e.target.files[0])

  //   fileUploadHandler(e);

  //   return setSelectedFile(false);
  // }

  // function fileUploadHandler(e) {
  //   e.persist();
  //   const { selectedFile } = this.state;
  //   const { refreshProfile } = this.props;
  //   const formData = new FormData();
  //   const config = {
  //     headers: { 'content-type': 'multipart/form-data' },
  //     timeout: 6000
  //   };
  //   formData.append('avatar', selectedFile);
  //   Axios.post(`http://localhost:5000/users/2/avatar`, formData, config)
  //     .then(refreshProfile)
  //     .catch(console.log);
  // }

  console.log("test-----------", test[0]);

  return (

    <div className="container_profil">

      <div>
        <h1 className="title_user">Informations:</h1>
        <div className="profil">
          <h2 className="name">{user.name}</h2>
          {!test[0] === undefined
            ? <h3>Ton dernier voyage était en
            {mois[test[0].periode_month]}
              {test[0].year} en {test[0].pays_name}</h3>
            : ""}

          <img src={(user.avatar != null
            ? `${user.avatar}`
            : 'https://res.cloudinary.com/blandine/image/upload/v1585844046/avatar/none.png')}
            alt='image de profil'></img>
          {/* <input
            style={{ display: 'none' }}
            type="file"
            name="avatar"
            accept="image/x-png,image/gif,image/jpeg"
            onChange={(e) => { fileSelectedHandler(e); }}
          />
          <button type="button" onClick={fileSelectedHandler}>Modifier mon avatar</button> */}

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
              <h3 className="legend check">Fait</h3>
              <h3 className="legend new">A faire</h3>
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
                            fill: visitedCountry.includes(geo.properties.ISO_A3) ? "#ffa41b" : "#D6D6DA",
                            outline: "none"
                          },
                          hover: {
                            fill: visitedCountry.includes(geo.properties.ISO_A3) ? "#ffa41b" : "#D6D6DA",
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
          <div className="list">
            <table>
              <thead>
                <th>Nom du pays</th>
                <th>Période voyagé</th>
                <th>Année du voyage</th>
              </thead>

              {user.countries.map((country) => {
                return (
                  <tbody>
                    <td>{country.pays_name}</td>
                    <td>{mois[country.periode_month]}</td>
                    <td>{country.year}</td>
                  </tbody>
                )
              })}


            </table>

          </div>
      }
    </div >
  );

};

export default User;