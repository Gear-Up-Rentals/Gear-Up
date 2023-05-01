import React from "react";
import { EnvelopeIcon } from "evergreen-ui";
import "./CarInfo.css";
import { Rating, Star } from "@smastrom/react-rating";
import star from "../../assets/star.svg";
import { getRatingStr } from "../../consts/appData";

import {
  CogIcon,
  DriveTimeIcon,
  LabTestIcon,
  BuggyIcon,
  HeatmapIcon,
} from "evergreen-ui";
const ratingstyles = {
  itemShapes: Star,
  activeFillColor: "#ffb700",
  inactiveFillColor: "grey",
};
const CarInfo = (params) => {
  return params.carDetails ? (
    <div className="main-wrapper">
      <img
        className="car-image"
        src={params.carDetails.images[0]}
        alt="Car Img"
      />

      <div className="car-details">
        <h1 id="car-name">
          {`${params.carDetails.make} ${params.carDetails.model}`}
          <div className="price">
            <span id="cost">{`${params.carDetails.hourlyPrice}`}</span>
            <span>/Hour</span>
          </div>
        </h1>
        <div id="host">
          <span id="host-name">{`${params.carDetails.user.name}`}</span>
          <EnvelopeIcon />
          <span id="host-contact">{`${params.carDetails.user.email}`}</span>
        </div>
        {/* Ratings Bar */}
        <div className="rating-bar">
          <span id="rating-box">
            {params.carDetails.rating} <img src={star} alt="star" />
          </span>
          <div id="rating-info">
            <span>{getRatingStr(params.carDetails.rating)}</span>
            <Rating
              readOnly
              value={params.carDetails.rating}
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
            <span>Fuel Type - {params.carDetails.fuelType}</span>
          </div>
          <div className="car-feature">
            <CogIcon className="icon"></CogIcon>
            <span>Transmission - {params.carDetails.transmission}</span>
          </div>
          <div className="car-feature">
            <BuggyIcon className="icon"></BuggyIcon>
            <span>Seats - {params.carDetails.seats}</span>
          </div>
          <div className="car-feature">
            <HeatmapIcon className="icon"></HeatmapIcon>
            <span>Color - {params.carDetails.color}</span>
          </div>
          <div className="car-feature">
            <DriveTimeIcon className="icon"></DriveTimeIcon>
            <span>Type - {params.carDetails.bodyType.join(", ")}</span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div style={{ width: "100%" }}>
      <span>LOADING CAR INFO</span>
    </div>
  );
};

export default CarInfo;
