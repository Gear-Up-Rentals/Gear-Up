import React, { useEffect, useState } from "react";
import blob1 from "../../assets/blob1.svg";
import blob2 from "../../assets/blob2.svg";
import { useAuth } from "../../context/AuthContext";
import carApi from "../../api/modules/car.api";
import { PrintIcon, EnvelopeIcon } from "evergreen-ui";
import { cities } from "../../consts/appData";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./Receipt.css";
const Receipt = () => {
  const { currentUser, getMongoUser } = useAuth();
  const searchInfo = JSON.parse(Cookies.get("searchInfo"));
  const startDate = new Date(searchInfo.start_time);
  const endDate = new Date(searchInfo.end_time);
  const differenceInMilliseconds = endDate - startDate; // difference in milliseconds
  const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60)); // difference in hours
  const { carId } = useParams();
  const [carInfo, setCarInfo] = useState(null);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const navigate = useNavigate();
  const [carLocation, setCarLocation] = useState(null);
  const getMyUser = async () => {
    const data = await getMongoUser();
    if (data.length !== 0) {
      setCurrentUserInfo(data[0]);
    }
  };
  const getCarInfo = async () => {
    const { response, err } = await carApi.getCar({
      carId,
    });

    if (err) {
      toast.error(err.message);
    }
    if (response) {
      setCarInfo(response.data);
      const city = response.data.carLocation;
      const cityMp = cities.find((el) => el.cityName == city);
      setCarLocation(cityMp.coord);
    }
  };
  useEffect(() => {
    getCarInfo();
    getMyUser();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    navigate("/search");
  };
  return (
    <>
      <div className="blobContainer-receipt">
        <img className="blob1" src={blob1} alt="" />
        <img className="blob2" src={blob2} alt="" />
      </div>
      <div className="receiptWrapper">
        <div className="receipt">
          {/* Heading Section */}
          <div className="heading-section">
            <div>
              <h2>Receipt</h2>
              <span>
                Payment Successfull. Exact Car Details will be mailed to you.
              </span>
            </div>
            <PrintIcon id="print-icon"></PrintIcon>
          </div>
          <div className="receipt-details">
            {/* terms */}
            <div className="terms">
              <span>Receipt For</span>
              <span>Car</span>
              <span>Duration</span>
              <span>Location</span>
              <hr className="divider" />
              <div className="date-time">
                <span className="title">FROM</span>
                <span className="date">
                  {startDate.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="time">
                  {startDate.toLocaleTimeString("en-IN", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </span>
              </div>
              <hr className="divider" />
              <span>Price/Hour</span>
              <span>Fare</span>
              <span>GST(18%)</span>
              <span>Total</span>
            </div>
            {/* values */}
            <div className="values">
              <span>
                {currentUserInfo ? `${currentUserInfo.name}` : "UNKNOWN"}
              </span>
              <span>{carInfo && `${carInfo.make} ${carInfo.model}`}</span>
              <span>{`${hours} Hours`}</span>
              <span>{carInfo && carInfo.carLocation}</span>
              <hr className="divider" />
              <div className="date-time">
                <span className="title">TO</span>
                <span className="date">
                  {endDate.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="time">
                  {endDate.toLocaleTimeString("en-IN", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </span>
              </div>
              <hr className="divider" />
              <span>{carInfo && `Rs ${carInfo.hourlyPrice}`}</span>
              <span>{carInfo && `Rs ${carInfo.hourlyPrice * hours}`}</span>
              <span>
                {" "}
                {carInfo && `Rs ${carInfo.hourlyPrice * hours * 0.18} `}
              </span>
              <span id="total-cost">
                {carInfo && `Rs ${carInfo.hourlyPrice * hours * 1.18} `}
              </span>
            </div>
          </div>
          <div className="btn-wrapper">
            <Link className="btn-link" onClick={submitHandler}>
              <button id="confirm-continue">Book More</button>
            </Link>
          </div>
          <span className="contact-us">
            Contact Us : <EnvelopeIcon className="icon" />{" "}
            gearupsupport@gmail.com
          </span>
        </div>
      </div>
    </>
  );
};

export default Receipt;
