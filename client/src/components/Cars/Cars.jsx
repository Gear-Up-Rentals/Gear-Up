import React, { useState } from 'react'
import "./Cars.css"
import blob1 from "../../assets/blob1.svg"
import blob2 from "../../assets/blob2.svg"
import car4 from "../../assets/car4.png"
import { Rating, Star } from "@smastrom/react-rating"
import { PrintIcon, StarIcon } from "evergreen-ui"

const ratingstyles = {
    itemShapes: Star,
    activeFillColor: "#ffb700",
    inactiveFillColor: "grey",
  };

const Cars = () => {
    const [sort , setSort] = useState("ratings");
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
                        <p onClick={() => setSort("ratings")}>Top Rating</p>
                        <p onClick={() => setSort("price")}>Hourly Rate</p>
                    </span>
                    <div className='carInfo'>
                        <img src={car4} alt="" />
                        <span>
                            <p>Car Name</p>
                            <div className="carRating-bar">
                            <span id="carRating-box">
                                4.9 <StarIcon />
                            </span>
                            <div id="carRating-info">
                                <span>Excellent</span>
                                <Rating
                                readOnly
                                value={4.5}
                                itemStyles={ratingstyles}
                                style={{ maxWidth: "60px" }}
                                />
                            </div>
                            </div>
                            <p>Price</p>
                        </span>
                    </div>
                    <div className='carInfo'>
                        <img src={car4} alt="" />
                        <span>
                            <p>Car Name</p>
                            <div className="carRating-bar">
                            <span id="carRating-box">
                                4.9 <StarIcon />
                            </span>
                            <div id="carRating-info">
                                <span>Excellent</span>
                                <Rating
                                readOnly
                                value={4.5}
                                itemStyles={ratingstyles}
                                style={{ maxWidth: "60px" }}
                                />
                            </div>
                            </div>
                            <p>Price</p>
                        </span>
                    </div>
                    <div className='carInfo'>
                        <img src={car4} alt="" />
                        <span>
                            <p>Car Name</p>
                            <div className="carRating-bar">
                            <span id="carRating-box">
                                4.9 <StarIcon />
                            </span>
                            <div id="carRating-info">
                                <span>Excellent</span>
                                <Rating
                                readOnly
                                value={4.5}
                                itemStyles={ratingstyles}
                                style={{ maxWidth: "60px" }}
                                />
                            </div>
                            </div>
                            <p>Price</p>
                        </span>
                    </div>
                    <div className='carInfo'>
                        <img src={car4} alt="" />
                        <span>
                            <p>Car Name</p>
                            <div className="carRating-bar">
                            <span id="carRating-box">
                                4.9 <StarIcon />
                            </span>
                            <div id="carRating-info">
                                <span>Excellent</span>
                                <Rating
                                readOnly
                                value={4.5}
                                itemStyles={ratingstyles}
                                style={{ maxWidth: "60px" }}
                                />
                            </div>
                            </div>
                            <p>Price</p>
                        </span>
                    </div>
                </div>
            </div>
            <div className="carsSearch">
                <h1>Other Available Cars</h1>
                <div className='filters'>
                    <div>
                    <label htmlFor="searchCar">Search</label>
                    <input type="text" id = "searchCar" placeholder='Search Car' />
                    </div>
                    <div>
                    <label htmlFor='searchModel'>Car Model</label>
                    <input type="text" id = "searchModel" placeholder='Select Car Model' />
                    </div>
                    <div>
                    <label htmlFor="carRatings">Rating</label>
                    <input type="number" max={5} min={1} id = "carRatings" placeholder = "Rating" />
                    </div>
                    <div>
                    <label htmlFor="carPrice">Price</label>
                    <select id="carRatings">
                        <option value="hourlyPrice">Low to High</option>
                        <option value="-hourlyPrice">High to Low</option>
                    </select>
                    </div>
                </div>
                <div className="grid">
                    <div className="card">
                        <div className="img">
                            <img src={car4} alt="" />
                        </div>
                        <span>
                            <p>Jeep</p>
                            <p>Rs. 500000</p>
                            <div className="carRating-bar">
                            <span id="carRating-box">
                                4.9 <StarIcon />
                            </span>
                            <div id="carRating-info">
                                <span>Excellent</span>
                                <Rating
                                readOnly
                                value={4.5}
                                itemStyles={ratingstyles}
                                style={{ maxWidth: "60px" }}
                                />
                            </div>
                            </div>
                        </span>
                    </div>
                    <div className="card">
                        <div className="img">
                            <img src={car4} alt="" />
                        </div>
                        <span>
                            <p>Jeep</p>
                            <p>Rs. 500000</p>
                            <div className="carRating-bar">
                            <span id="carRating-box">
                                4.9 <StarIcon />
                            </span>
                            <div id="carRating-info">
                                <span>Excellent</span>
                                <Rating
                                readOnly
                                value={4.5}
                                itemStyles={ratingstyles}
                                style={{ maxWidth: "60px" }}
                                />
                            </div>
                            </div>
                        </span>
                    </div>
                    <div className="card">
                        <div className="img">
                            <img src={car4} alt="" />
                        </div>
                        <span>
                            <p>Jeep</p>
                            <p>Rs. 500000</p>
                            <div className="carRating-bar">
                            <span id="carRating-box">
                                4.9 <StarIcon />
                            </span>
                            <div id="carRating-info">
                                <span>Excellent</span>
                                <Rating
                                readOnly
                                value={4.5}
                                itemStyles={ratingstyles}
                                style={{ maxWidth: "60px" }}
                                />
                            </div>
                            </div>
                        </span>
                    </div>
                    <div className="card">
                        <div className="img">
                            <img src={car4} alt="" />
                        </div>
                        <span>
                            <p>Jeep</p>
                            <p>Rs. 500000</p>
                            <div className="carRating-bar">
                            <span id="carRating-box">
                                4.9 <StarIcon />
                            </span>
                            <div id="carRating-info">
                                <span>Excellent</span>
                                <Rating
                                readOnly
                                value={4.5}
                                itemStyles={ratingstyles}
                                style={{ maxWidth: "60px" }}
                                />
                            </div>
                            </div>
                        </span>
                    </div>
                    <div className="card">
                        <div className="img">
                            <img src={car4} alt="" />
                        </div>
                        <span>
                            <p>Jeep</p>
                            <p>Rs. 500000</p>
                            <div className="carRating-bar">
                            <span id="carRating-box">
                                4.9 <StarIcon />
                            </span>
                            <div id="carRating-info">
                                <span>Excellent</span>
                                <Rating
                                readOnly
                                value={4.5}
                                itemStyles={ratingstyles}
                                style={{ maxWidth: "60px" }}
                                />
                            </div>
                            </div>
                        </span>
                    </div>
                    <div className="card">
                        <div className="img">
                            <img src={car4} alt="" />
                        </div>
                        <span>
                            <p>Jeep</p>
                            <p>Rs. 500000</p>
                            <div className="carRating-bar">
                            <span id="carRating-box">
                                4.9 <StarIcon width={15} height={15} />
                            </span>
                            <div id="carRating-info">
                                <span>Excellent</span>
                                <Rating
                                readOnly
                                value={4.5}
                                itemStyles={ratingstyles}
                                style={{ maxWidth: "60px" }}
                                />
                            </div>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Cars