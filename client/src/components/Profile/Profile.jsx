import React, { useRef, useState } from "react";
import "./Profile.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import FilePicker from "../FilePicker";
import Circle from "../Circle";
import { toast } from "react-toastify";

const Profile = () => {
  const { currentUser, logout, update, uploadPhoto } = useAuth();
  const navigate = useNavigate();
  const userNameRef = useRef();
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState([]);
  const [error, setError] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();

    let user = {
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
    };
    try {
      if (
        userNameRef.current.value !== "" ||
        userNameRef.current.value !== currentUser.displayName
      ) {
        setLoading(true);
        user.displayName = userNameRef.current.value;
      }
      if (profilePhoto.length !== 0) {
        setLoading(true);
        console.log(profilePhoto);
        const photo = await uploadPhoto(profilePhoto[0], "userPhoto");
        user.photoURL = photo;
      }
      console.log(user);
      await update(user);
      toast.success("Profile Updated");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }

    setLoading(false);
  }

  return (
    <div className="profileContainer">
      <Circle
        className="circle1"
        top="50vh"
        left="-100vh"
        backgroundColor="#FEB06Eff"
      />
      <Circle
        className="circle2"
        top="-60vh"
        right="-60vh"
        backgroundColor="#FEB06Eff"
      />

      <div className="profileWrapper">
        <div className="profileWrapper1">
          <img src={currentUser.photoURL} alt="" />
        </div>
        <form className="profileWrapper2" onSubmit={handleSubmit}>
          <span className="span1">
            UserName
            <input
              type="text"
              ref={userNameRef}
              placeholder={currentUser.displayName}
            />
          </span>
          <span className="span2">
            Email
            <input type="text" ref={emailRef} placeholder={currentUser.email} />
          </span>
          <span className="span3">
            Update Photo
            <FilePicker
              files={profilePhoto}
              setFiles={setProfilePhoto}
              label="Profile Photo"
              maxFiles={1}
            />
          </span>
          <span className="span4">
            <button disabled={loading}>Update Profile</button>
          </span>
          <span className="span5">
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Sign Out
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Profile;
