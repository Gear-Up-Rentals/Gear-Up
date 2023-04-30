import React, { useEffect } from 'react'
import "./Search.css"
import Navbar from '../Navbar/Navbar'
import Circle from '../Circle'

const Search = () => {

  return (
    <div className='searchContainer'>
        <div className="searchWrapper">
            <div className="searchWrapper1">
                <div className='searchForm'>
                    <h1>Make Your Trip</h1>
                    <form>
                        <span>STARTING LOCATION</span>
                        <input type="text" />
                        <span>DESTINATION</span>
                        <input type="text" />
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
            </div>
        </div>
    </div>
  )
}

export default Search