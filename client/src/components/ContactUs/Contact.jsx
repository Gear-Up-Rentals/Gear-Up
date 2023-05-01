import React, { useEffect, useRef, useState } from "react";
import "./Contact.css";
import Navbar from "../Navbar/Navbar";
import Circle from "../Circle";


const Contact = () => {
  
  return (
    <div className="searchContainer">
      <div className="searchWrapper">
        <div className="searchWrapper2">
          <Circle
            className="circle1"
            top="75vh"
            left="-75vh"
            backgroundColor="#FEB06Eff"
          />
          <Circle
            className="circle2"
            top="-110vh"
            right="-10vh"
            backgroundColor="#FEB06Eff"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
