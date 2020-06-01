import React from "react";
import { useSelector } from "react-redux";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import "./map.scss"

function Map(props) {
  const check = props.statut;
  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
  const toPassed = useSelector(state => state.LastTrip);
  const toNext = useSelector(state => state.NextTrip);
  const codeVisited = toPassed.map((c) => { return c.code })
  const codeToVisit = toNext.map((c) => { return c.code })
  const [test, setTest] = useState('')


  return (
    <div className="mapProfil">
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
                    const { NAME } = geo.properties;
                    setTest(`${NAME} — `);
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


  )
}
export default Map