import React from 'react'
import "./AboutUs.css"
import Circle from '../Circle'
import Car from "../../assets/car2.png"

const AboutUs = () => {
  return (
    <div className='homeContainer'>
      <Circle className = "circle1" top = "-100vh" left= "-100vh" backgroundColor="#FEB06Eff" />
      <Circle className = "circle2" top = "-25vh" right= "-30vh" backgroundColor="#FEB06Eff" />
      <img className='car' src={Car} alt="car" />
      <p className='about'>
        <h1>About Us</h1>
      Gear Up is a web-based car rental platform designed to provide a convenient and reliable car rental service to clients while offering a safe and profitable way for car owners to rent out their cars. <br />
      The platform is designed to connect car owners who want to provide cars for rental purposes with clients who need a car on a temporary basis. To achieve this, Gear Up provides a user-friendly interface 
      that makes it easy for clients to search for and book cars based on their preferences. Car owners who want to provide cars for rental purposes can register on the platform and provide information about 
      their cars. The platform has a document validation system that verifies the authenticity of the car owner's documents to ensure that only genuine car owners are allowed to rent out their cars. Once a car 
      owner's documents have been verified, their car is added to the list of available cars that clients can choose from. Gear Up includes a secure payment gateway that accepts various payment methods, making 
      it easy for clients to pay for their rentals. The platform also includes a booking system that allows clients to select the car they want to rent and book it for a specific period.
      </p>
      <div className="footer">
        <ul className='footerList'>
          <li>Privacy Policy</li>
          <li>Terms And Conditions</li>
        </ul>
        <p className='tagline'>"Gear Up And Go, <br /> let your adventures FLOW" </p>
      </div>
    </div>
  )
}

export default AboutUs