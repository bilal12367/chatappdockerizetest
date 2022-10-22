import React, { useEffect, useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import AlertBox from "../components/AlertBox";
import { useAppContext } from "../context/AppContext";
const initialState = {
  name: "",
  email: "",
  password: "",
  nameStyle: { normalStyle: "", errorStyle: "errorStyle", title: "" },
  emailStyle: { normalStyle: "", errorStyle: "errorStyle", title: "" },
  passwordStyle: { normalStyle: "", errorStyle: "errorStyle", title: "" },
};


const Register = () => {
  const {user, showAlert, alertType, alertMessage, registerUser } = useAppContext();
  const [state, setState] = useState(initialState);  
  const navigate = useNavigate();

  useEffect(()=>{
    if(user){
      setTimeout(()=>{
        navigate('/dashboard');
      },2000)
    }
  },[user,navigate])
  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser({
      name: state.name,
      email: state.email,
      password: state.password,
    });
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="vh-100 d-flex flex-row justify-content-center align-items-center"
      style={{ backgroundColor: "var(--accent-color)" }}
    >
      <div className="loginCard col-xl-3 col-lg-4 col-md-5 col-sm-7 col-12 card p-4">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div>
            <h1 style={{ fontWeight: "700" }}>Register</h1>
          </div>
          <hr />
          {showAlert && (
            <AlertBox alertType={alertType} alertMessage={alertMessage} />
          )}
          <form className="d-flex flex-column" style={{ width: "100%" }}>
            <h5
              className="textPadding"
              style={{ color: state.nameStyle.title }}
            >
              Full Name
            </h5>
            <input
              className={state.nameStyle.normalStyle}
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Enter Full Name"
            />
            <h5
              className="textPadding"
              style={{ color: state.emailStyle.title }}
            >
              Email
            </h5>
            <input
              className={state.emailStyle.normalStyle}
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="Enter Email"
            />
            <h5
              className="textPadding"
              style={{ color: state.passwordStyle.title }}
            >
              Password
            </h5>
            <input
              className={state.passwordStyle.normalStyle}
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Enter Password"
            />

            <Link to="/login">
              <p className="textButton">Already Have an Account?? Login</p>
            </Link>
            <button className="btn1" type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
