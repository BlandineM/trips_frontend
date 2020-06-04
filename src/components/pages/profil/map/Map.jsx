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
  const check = props.check;
  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
  const toPassed = useSelector(state => state.LastTrip);
  const toNext = useSelector(state => state.NextTrip);
  const codeVisited = toPassed.map((c) => { return c.code })
  const codeToVisit = toNext.map((c) => { return c.code })



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


                  }}
                  style={{
                    default: {
                      fill: (check ? codeVisited : codeToVisit).includes(geo.properties.ISO_A3)
                        ? (check ? "rgba(39,73,109,1)" : "#4cd3c2")
                        : "#2f3032",
                      outline: "none"
                    },
                    hover: {
                      fill: (check ? codeVisited : codeToVisit).includes(geo.properties.ISO_A3) ? (check ? "rgba(39,73,109,1)" : "#4cd3c2") : "#2f3032",
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