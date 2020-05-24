import React from "react";
import { useSelector } from "react-redux";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";

function Map(props) {
  const check = props.statut;
  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
  const toPassed = useSelector(state => state.LastTrip);
  const toNext = useSelector(state => state.NextTrip);
  const codeVisited = toPassed.map((c) => { return c.coded })
  const codeToVisit = toNext.map((c) => { return c.coded })

  return (
    <div>
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