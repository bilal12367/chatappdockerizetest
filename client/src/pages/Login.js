import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';
import AlertBox from '../components/AlertBox';
const initialState = {
  email: '',
  password: ''
}

const Login = () => {
  const { user, loginUser, showAlert, alertType, alertMessage } = useAppContext();
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();


  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000)
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser({
      email: state.email,
      password: state.password,
    });
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div className="vh-100 login-back d-flex justify-content-center align-items-center" style={{ backgroundColor: 'var(--accent-color)' }}>
      <div className="card col-xl-3 col-lg-4 col-md-5 col-sm-7 col-12 loginCard p-4">
        <div className="d-flex flex-column justify-content-center align-items-center" style={{backgroundColor: 'white'}}>
          <div>
            <h1 style={{ fontWeight: "700" }}>Login</h1>
          </div>
          <hr />
          <form className="d-flex flex-column" style={{ width: "100%" }}>
            {showAlert && (
              <AlertBox alertType={alertType} alertMessage={alertMessage} />
            )}
            <h5 className="textPadding">Email</h5>
            <input name='email' onChange={handleChange} type="email" placeholder="Enter Email" />
            <h5 className="textPadding">Password</h5>
            <input name='password' onChange={handleChange} type="password" placeholder="Enter Password" />
            <Link to="/register">
              <p className="textButton">Don't Have an Account?? Register</p>
            </Link>
            <button className="btn1" onClick={handleSubmit}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login