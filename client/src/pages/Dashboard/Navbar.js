import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../../context/AppContext.js";

const Navbar = () => {
  const { logout, user, getImage, profileImage } = useAppContext();
  const logoutUser = () => {
    logout();
  };
  const toggleNavbar = () => {
    var bg = document.getElementsByClassName("bg")[0];
    var navbar = document.getElementsByClassName("navbar")[0];
    bg.classList.toggle("bg-anim");
    navbar.classList.toggle("navbar-anim");
  };
  useEffect(() => {
      getImage();
  }, []);
  if (user != null) {
    return (
      <div className="nav-header card shadow-sm">
        <div className="d-flex flex-row justify-content-between nav-header-row">
          <img
            className="nav-header-pic col-4"
            id="nav-header-pic"
            src={profileImage}
          />
          <FontAwesomeIcon
            className="closeButton"
            onClick={toggleNavbar}
            icon={faXmark}
          />
          <div className="col-8 profDetailsRight">
            <div style={{ fontWeight: "500" }}>{user.name}</div>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="col profDetailsDown">
          <div style={{ fontWeight: "500" }}>{user.name}</div>
          <p>{user.email}</p>
        </div>
        <hr />
        <div className="d-flex flex-row justify-content-stretch">
          <button
            type="button"
            className="col btn btn-outline-dark navbar-btn"
            data-bs-toggle="modal"
            data-bs-target="#editProfileModal"
          >
            Edit Profile
          </button>
          <button
            className="col btn btn-outline-dark navbar-btn"
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Navbar;
