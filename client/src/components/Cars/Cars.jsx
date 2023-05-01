import React, { useEffect, useState } from 'react'
import "./Cars.css"
import blob1 from "../../assets/blob1.svg"
import blob2 from "../../assets/blob2.svg"
import car4 from "../../assets/car4.png"
import { Rating, Star } from "@smastrom/react-rating"
import { PrintIcon, StarIcon } from "evergreen-ui"
import Cookies from "js-cookie";
import carApi from '../../api/modules/car.api'
import { useNavigate } from 'react-router-dom'
const ratingstyles = {
    itemShapes: Star,
    activeFillColor: "#ffb700",
    inactiveFillColor: "grey",
  };

const Cars = () => {
    const searchInfo = JSON.parse(Cookies.get("searchInfo"));
    const [sortCriteria , setSortCriteria] = useState("-rating");
    const [topData , setTopData ] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [seats , setSeats ] = useState(null);
    const [transmission , setTransmission ] = useState(null);
    const [rating, setRating] = useState(null);
    const [sort, setSort] = useState("hourlyPrice");
    const navigate = useNavigate();
    const location = searchInfo.location;

    useEffect(() => {
        async function getData() {
            const { response , err } = await carApi.getAllCars({ carLocation:location , sort:sortCriteria , limit:4 });
            setTopData(response.data);
        }
        getData();
    }, [sortCriteria])

    useEffect(() => {
        let query = {
            carLocation: location
        }
        if(seats && seats !== "All") {
            query["seats"] = seats;
        }
        if(transmission && transmission !== "All") {
            query["transmission"] = transmission;
        }
        if(rating) {
            query["rating[gte]"] = rating;
        }
        if(sort) {
            query["sort"] = sort;
        }
        console.log(query);
        async function getData() {
            const { response , err } = await carApi.getAllCars(query);
            setFilterData(response.data);
            console.log(filterData);
        }
        getData();
    }, [seats , transmission , rating , sort])
  return (
    <>
        <div className="blobContainer">
        <img className='blob1' src={blob1} alt="" />
        <img className='blob2' src={blob2} alt="" />
        </div>
        <div className='carsContainer'>
            <div className="carsWrapper">
                <div className="carsWrapper1">
                    <img src={car4} alt="car" />
                </div>
                <div className="carsWrapper2">
                    <h1>Choose Your Vehicle</h1>
                    <span>
                        <p className={sortCriteria === "-rating" ? "active" : ""} onClick={() => setSortCriteria("-rating")}>Top Rating</p>
                        <p className={sortCriteria === "hourlyPrice" ? "active" : ""} onClick={() => setSortCriteria("hourlyPrice")}>Hourly Rate</p>
                    </span>
                    { topData.map((el , index) => (
                    <div className='carInfo' key = {index}>
                        <img src={el.images[0]} alt="" />
                        <span>
                            <p>{el.make + " " + el.model}</p>
                            <div className="carRating-bar">
                            <span id="carRating-box">
                                {el.rating} <StarIcon />
                            </span>
                            <div id="carRating-info">
                                <span>Excellent</span>
                                <Rating
                                readOnly
                                value={el.rating}
                                itemStyles={ratingstyles}
                                style={{ maxWidth: "60px" }}
                                />
                            </div>
                            </div>
                            <p>Rs. {el.hourlyPrice}</p>
                        </span>
                    </div>
                    ))}
                </div>
            </div>
            <div className="carsSearch">
                <h1>Other Available Cars</h1>
                <div className='filters'>
                    <div>
                    <label htmlFor="searchCar">Car Seats</label>
                    <select id="searchCar" placeholder={seats} onChange={(e) => setSeats(e.target.value)}>
                        <option value="All">All</option>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                        <option value="8">8</option>
                        <option value="10">10</option>
                        <option value=">10">More than 10</option>

                    </select>
                    {/* <input type="text" id = "searchCar" placeholder='Search Car' /> */}
                    </div>
                    <div>
                    <label htmlFor='searchModel'>Transmission</label>
                    <select id="searchModel" onChange={(e) => setTransmission(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Manual">Manual</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Semi-Automatic">Semi-Automatic</option>
                        <option value="Tiptronic">Tiptronic</option>
                    </select>
                    {/* <input type="text" id = "searchModel" placeholder='Select Car Model' /> */}
                    </div>
                    <div>
                    <label htmlFor="carRatings">Rating</label>
                    <input type="number" defaultValue={1} max={5} min={1} id = "carRatings" placeholder = "Rating" onChange={(e) => setRating(e.target.value)} />
                    </div>
                    <div>
                    <label htmlFor="carPrice">Price</label>
                    <select id="carRatings" onChange={(e) => setSort(e.target.value)}>
                        <option value="hourlyPrice">Low to High</option>
                        <option value="-hourlyPrice">High to Low</option>
                    </select>
                    </div>
                </div>
                <div className="grid">
                    {
                        filterData.map((el, index) => (
                        <div className="card" key = {index} onClick={() => navigate(`/confirm/${el._id}`)}>
                            <div className="img">
                                <img src={el.images[0]} alt="" />
                            </div>
                            <span>
                                <p>{el.make + " " + el.model}</p>
                                <p>Rs. {el.hourlyPrice}
                                <p>Seats : {el.seats}</p>
                                </p>
                                <div className="carRating-bar">
                                <span id="carRating-box">
                                    {el.rating} <StarIcon />
                                </span>
                                <div id="carRating-info">
                                    <span>Excellent</span>
                                    <Rating
                                    readOnly
                                    value={el.rating}
                                    itemStyles={ratingstyles}
                                    style={{ maxWidth: "60px" }}
                                    />
                                </div>
                                </div>
                            </span>
                        </div>
                        ))
                    }
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default Cars