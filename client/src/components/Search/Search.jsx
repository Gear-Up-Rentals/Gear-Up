import React, { useEffect, useState } from 'react'
import "./Search.css"
import Navbar from '../Navbar/Navbar'
import Circle from '../Circle'
import SearchTextField from '../SearchTextField'
import { cities } from '../../consts/appData'
import MapboxMap from '../Map'

const Search = () => {
  const [carLocation, setCarLocation] = useState(null);
  const [coords , setCoords ] = useState([70 , 70]);
  const onLocationSelect = (city) => {
    setCarLocation(city);
    };

    useEffect(() => {
        cities.map((el) => {
            if (el.cityName === carLocation) {
                setCoords();
                console.log(el.cityName)
            } 
        })
        console.log(coords);
    } , [carLocation]);
  return (
    <div className='searchContainer'>
        <div className="searchWrapper">
            <div className="searchWrapper1">
                <div className='searchForm'>
                    <h1>Make Your Trip</h1>
                    <form>
                        <span>STARTING LOCATION</span>
                        <div>
                        <SearchTextField
                        title="Cities"
                        items={cities.map((el) => el.cityName)}
                        onChange={onLocationSelect}
                        className="carLocation"
                        name="carLocation"
                        />
                        </div>
                        <span>JOURNEY DATE</span>
                        <input type="date" />
                        <span>RETURN DATE</span>
                        <input type="date" />

                        <button>Let's Start</button>
                    </form>
                </div>
            </div>
            <div className="searchWrapper2">
            <Circle className = "circle1" top = "75vh" left= "-75vh" backgroundColor="#FEB06Eff" />
            <Circle className = "circle2" top = "-110vh" right= "-10vh" backgroundColor="#FEB06Eff" />
            <MapboxMap center={coords} />
            </div>
        </div>
    </div>
  )
}

export default Search