import React from "react";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";
import { Link, Navigate } from "react-router-dom";

const Navbar = () => {
  const { currentUser } = useAuth();
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">GearUp</Link>
      </div>
      <div className="links">
        <ul className="linklist">
          <li>
            <Link to="/becomehost">Become a host</Link>
          </li>
          <li>
            <Link to="/about">About GearUp</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/profile" className="user_profile">
              <img src={currentUser?.photoURL} className="userImage" alt="" />
              {currentUser?.displayName}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
