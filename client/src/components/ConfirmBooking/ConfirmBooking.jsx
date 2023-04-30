import Circle from "../Circle";
import { React, useEffect } from "react";
import "./ConfirmBooking.css";
import { PrintIcon } from "evergreen-ui";
import CarInfo from "./CarInfo";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import MapboxMap from "../Map";
const ConfirmBooking = () => {
  const { currentUser } = useAuth();
  return (
    <>
      <div className="confirmBookingContainer">
        <div className="confirmBookingWrapper1">
          <h1 className="heading">Car Details</h1>
          <CarInfo />
          <div
            style={{
              height: "30px",
            }}
          />

          <h1 className="heading">Location</h1>
          <MapboxMap center={[72.877426, 19.07609]} />
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
                  <span className="date">30 Apr 2023</span>
                  <span className="time">3:00 Pm</span>
                </div>
                <hr className="divider" />
                <span>Price per hour</span>
                <span>GST</span>
                <span>Total</span>
              </div>
              {/* values */}
              <div className="values">
                <span>LIGMA</span>
                <span>5 Hours</span>
                <span>Mumbai</span>
                <hr className="divider" />
                <div className="date-time">
                  <span className="title">TO</span>
                  <span className="date">2 May 2023</span>
                  <span className="time">1:00 Pm</span>
                </div>
                <hr className="divider" />
                <span>Rs 250</span>
                <span>Rs 225</span>
                <span id="total-cost">Rs 1475</span>
              </div>
            </div>
            <div className="btn-wrapper">
              <Link
                className="btn-link"
                to={
                  currentUser.email
                    ? "/payment"
                    : `/?redirect=${encodeURIComponent(
                        window.location.pathname
                      )}`
                }
              >
                <button id="confirm-continue">Continue</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="circleContainer">
        <Circle
          className="circle1"
          top="0vh"
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
