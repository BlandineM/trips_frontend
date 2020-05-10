import React from "react";
import { useSelector } from "react-redux";
import TripCard from "./TripCard";
import "./tripList.scss"

function TripList(props) {
  const check = props.check
  const toPassed = useSelector(state => state.LastTrip);
  const toNext = useSelector(state => state.NextTrip);

  function carrousel(trip) {
    let arraySection = [];
    for (let i = 1; i <= (Math.ceil(trip.length / 3)); i++) {
      const arrayCountries = []
      if ((i * 3) - 3 < trip.length) {
        arrayCountries.push(trip[(i * 3) - 3])
      } if ((i * 3) - 2 < trip.length) {
        arrayCountries.push(trip[(i * 3) - 2])
      } if ((i * 3) - 1 < trip.length) {
        arrayCountries.push(trip[(i * 3) - 1])
      }
      arraySection.push(arrayCountries)
    }
    return arraySection
  }
  const arraySectionPassed = carrousel(toPassed)
  const arraySectionNext = carrousel(toNext)



  return (
    <div className="list_countries">

      <div className="container">

        <div class="wrapper">
          {check === 'fait'
            ? arraySectionPassed.map((section, i) => {
              return (<section id={`section${i}`}>
                <a href={i === 0 ? `#section${arraySectionPassed.length}` : `#section${i - 1}`} class="arrow__btn">‹</a>
                {section.map((country) => {
                  return (<div className={`list_entete${check === "fait" ? " visible" : ""}`}>
                    <TripCard country={country} />
                  </div>)

                })}
                <a href={i === arraySectionPassed.length - 1 ? `#section0` : `#section${i + 1}`} class="arrow__btn">›</a>
              </section>)
            })
            : arraySectionNext.map((section, i) => {
              return (<section id={`section${i}`}>
                <a href={i === 0 ? `#section${arraySectionNext.length}` : `#section${i - 1}`} class="arrow__btn">‹</a>
                {section.map((country) => {
                  return (<div className={`list_entete${check === "aFaire" ? " visible" : ""}`}>
                    <TripCard country={country} />
                  </div>)

                })}
                <a href={i === arraySectionNext.length - 1 ? `#section0` : `#section${i + 1}`} class="arrow__btn">›</a>
              </section>)
            })
          }
        </div>

      </div >

    </div>
  )
}

export default TripList;