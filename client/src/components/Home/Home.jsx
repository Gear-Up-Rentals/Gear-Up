import React, { useRef, useState } from "react";
import "./Home.css";
import Circle from "../Circle";
import Car from "../../assets/car2.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Home = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      const redirect =
        new URLSearchParams(location.search).get("redirect") || "/search";
      navigate(redirect);
    } catch (err) {
      setError("Failed to sign in");
      toast.error(err.message);
    }
    setLoading(false);
  }
  return (
    <div className="homeContainer">
      <Circle
        className="circle1"
        top="-100vh"
        left="-100vh"
        backgroundColor="#FEB06Eff"
      />
      <Circle
        className="circle2"
        top="-25vh"
        right="-30vh"
        backgroundColor="#FEB06Eff"
      />
      <img className="car" src={Car} alt="car" />
      <div className="wrapper">
        <div className="wrapper1">
          <span>
            Welcome To <br /> <h1>GearUp</h1>
          </span>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              className="emailInput"
              required
              ref={emailRef}
            />
            <input
              type="password"
              placeholder="Password"
              className="passwordInput"
              required
              ref={passwordRef}
            />
            <div className="btns">
              <button disabled={loading} className="btn_submit">
                Submit
              </button>
              <button className="btn_guest" onClick={() => navigate("/search")}>
                Guest
              </button>
            </div>
          </form>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
        <div className="wrapper2"></div>
      </div>
      <div className="footer">
        <ul className="footerList">
          <li>Privacy Policy</li>
          <li>Terms And Conditions</li>
        </ul>
        <p className="tagline">
          "Gear Up And Go, <br /> let your adventures FLOW"{" "}
        </p>
      </div>
    </div>
  );
};

export default Home;
