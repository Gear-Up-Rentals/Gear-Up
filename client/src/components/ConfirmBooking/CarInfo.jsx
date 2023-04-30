import React from "react";
import "./CarInfo.css";
import { Rating, Star } from "@smastrom/react-rating";
import star from "../../assets/star.svg";
import {
  CogIcon,
  DriveTimeIcon,
  LabTestIcon,
  BuggyIcon,
  HeatmapIcon,
} from "evergreen-ui";
import carInfoApi from "../../api/modules/car_info.api";
const ratingstyles = {
  itemShapes: Star,
  activeFillColor: "#ffb700",
  inactiveFillColor: "grey",
};
const CarInfo = () => {
  return (
    <div className="main-wrapper">
      <img
        className="car-image"
        src={carInfoApi.getImage({ make: "Audi", model: "a4", year: 2017 })}
        alt="Car Img"
      />

      <div className="car-details">
        <h1 id="car-name">
          Audi A4 2017
          <div className="price">
            <span id="cost">Rs 250</span>
            <span>/Hour</span>
          </div>
        </h1>
        <div id="host">
          <span id="host-name">Varun Dhavan</span>
          <span id="host-contact">+91 917382338</span>
        </div>
        {/* Ratings Bar */}
        <div className="rating-bar">
          <span id="rating-box">
            4.9 <img src={star} alt="star" />
          </span>
          <div id="rating-info">
            <span>Excellent</span>
            <Rating
              readOnly
              value={4.5}
              itemStyles={ratingstyles}
              style={{ maxWidth: "60px" }}
            />
          </div>
        </div>
        {/* Features */}
        <h5>Features</h5>
        <div className="car-features">
          <div className="car-feature">
            <LabTestIcon className="icon"></LabTestIcon>
            <span>Fuel Type - Petrol</span>
          </div>
          <div className="car-feature">
            <CogIcon className="icon"></CogIcon>
            <span>Transmission - Automatic</span>
          </div>
          <div className="car-feature">
            <BuggyIcon className="icon"></BuggyIcon>
            <span>Seats - 4</span>
          </div>
          <div className="car-feature">
            <HeatmapIcon className="icon"></HeatmapIcon>
            <span>Color - Grey</span>
          </div>
          <div className="car-feature">
            <DriveTimeIcon className="icon"></DriveTimeIcon>
            <span>Type - Sedan, Luxury</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarInfo;
