import React, { useEffect } from "react";
import { Link ,useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
const Landing = () => {
  const navigate = useNavigate();
  const {user} = useAppContext();
  const goto = () => {
  };
  useEffect(()=>{
    if(user){
      navigate('/dashboard')
    }
  },[user])
  return (
    <div className="d-flex flex-column">
      <section id="header">
        <div className="d-flex flex-row imgScrim">
          <img
            className="imgClass"
            src="https://wallpaperaccess.com/full/1489353.jpg"
          />
          <div className="d-flex flex-column justify-content-between aboveScrim">
            <div>
              <h1 className="headerTxt">Welcome To Our Website</h1>
              <p className="sideTxt">Get Started By Organizing Yourselves Using Todos</p>
            </div>
            <div>
              <Link to='/register'><button className="btn landingButton">Login/Register</button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
