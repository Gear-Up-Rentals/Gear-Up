import Circle from "../Circle";
import { React, useEffect, useState } from "react";
import "./ConfirmBooking.css";
import { PrintIcon } from "evergreen-ui";
import CarInfo from "./CarInfo";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import carApi from "../../api/modules/car.api";
import MapboxMap from "../Map";
import { cities } from "../../consts/appData";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import PaymentApi from "../../api/modules/payment_info";

const ConfirmBooking = () => {
  const { currentUser, getMongoUser } = useAuth();
  const searchInfo = JSON.parse(Cookies.get("searchInfo"));
  const startDate = new Date(searchInfo.start_time);
  const endDate = new Date(searchInfo.end_time);
  const differenceInMilliseconds = endDate - startDate; // difference in milliseconds
  const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60)); // difference in hours
  const { carId } = useParams();
  const [carInfo, setCarInfo] = useState(null);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
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
    if (currentUser.name === "Guest" || currentUserInfo === null) {
      toast.error("User Must be Logged In.");
    }
    const { response, err } = await PaymentApi.createPayment(carId);
    if (response) {
      window.location.href = response;
    }
    if (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="confirmBookingContainer">
        <div className="confirmBookingWrapper1">
          <h1 className="heading">Car Details</h1>
          <CarInfo carDetails={carInfo} />
          <div
            style={{
              height: "30px",
            }}
          />

          <h1 className="heading">Location</h1>
          {carLocation && <MapboxMap center={carLocation} />}
        </div>
        <div className="confirmBookingWrapper2">
          <div className="receipt">
            {/* Heading Section */}
            <div className="heading-section">
              <div>
                <h2>Fare Summary</h2>
                <span>This will your final fare, login to continue.</span>
              </div>
              <PrintIcon id="print-icon"></PrintIcon>
            </div>
            <div className="receipt-details">
              {/* terms */}
              <div className="terms">
                <span>User</span>
                <span>Hours</span>
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
                <button id="confirm-continue">Continue</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="circleContainer">
        <Circle
          className="circle1"
          top="50vh"
          left="-100vh"
          backgroundColor="#FEB06Eff"
        />
        <Circle
          className="circle2"
          top="-100vh"
          right="-20vh"
          backgroundColor="#FEB06Eff"
        />
      </div>
    </>
  );
};

export default ConfirmBooking;
