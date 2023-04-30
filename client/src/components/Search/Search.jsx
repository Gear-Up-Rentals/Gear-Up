import React, { useEffect, useRef, useState } from 'react'
import "./Search.css"
import Navbar from '../Navbar/Navbar'
import Circle from '../Circle'
import SearchTextField from '../SearchTextField'
import { cities } from '../../consts/appData'
import MapboxMap from '../Map'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie";

const Search = () => {
  const [carLocation, setCarLocation] = useState(null);
  const [coords , setCoords ] = useState([77.216721, 28.6448]);
  
  const formRef = useRef(null);
  const navigate = useNavigate();
  const onLocationSelect = (city) => {
    setCarLocation(city);
    };
    const onContinue = async (e) => {
      e.preventDefault();
      const formData = new FormData(formRef.current);
      const formMap = {};
      for (let [name, value] of formData.entries()) {
        formMap[name] = value;
      }
      Cookies.set("searchInfo", JSON.stringify(formMap));
      navigate("/cars");
    };

    useEffect(() => {
        cities.map((el) => {
            if (el.cityName === carLocation) {
                setCoords(el.coord);
            }
        })
    } , [carLocation]);
  return (
    <div className='searchContainer'>
        <div className="searchWrapper">
            <div className="searchWrapper1">
                <div className='searchForm'>
                    <h1>Make Your Trip</h1>
                    <form ref = {formRef}>
                        <span>STARTING LOCATION</span>
                        <div>
                        <SearchTextField
                        title="Cities"
                        items={cities.map((el) => el.cityName)}
                        onChange={onLocationSelect}
                        className="carLocation"
                        name="location"
                        />
                        </div>
                        <span>BEGIN</span>
                        <input type="datetime-local" name='start-time' />
                        <span>RETURN</span>
                        <input type="datetime-local" name='end-time' />

                        <button onClick={onContinue}>Let's Start</button>
                    </form>
                </div>
            </div>
            <div className="searchWrapper2">
            <Circle className = "circle1" top = "75vh" left= "-75vh" backgroundColor="#FEB06Eff" />
            <Circle className = "circle2" top = "-110vh" right= "-10vh" backgroundColor="#FEB06Eff" />
            <div className = "searchMap">
                <MapboxMap center={coords} />
            </div>
            </div>
        </div>
    </div>
  )
}

export default Search