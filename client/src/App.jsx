import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import Search from "./components/Search/Search";
import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from "./context/PrivateRoute";
import "@smastrom/react-rating/style.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { ToastContainer } from "react-toastify";
import Profile from "./components/Profile/Profile";
import BecomeHost from "./components/BecomeHost/BecomeHost";
import ConfirmBooking from "./components/ConfirmBooking/ConfirmBooking";
import AboutUs from "./components/AboutUS/AboutUs";
const App = () => {
  return (
    <>
      <AuthProvider>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
        />
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" Component={Home} />
            <Route path="/signup" Component={Signup} />
            <Route path="/search" Component={Search} />
            <Route path="/becomehost" Component={BecomeHost} />
            <Route path = "/aboutUs" Component={AboutUs} />
            <Route path="/confirm" Component={ConfirmBooking} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
};

export default App;
