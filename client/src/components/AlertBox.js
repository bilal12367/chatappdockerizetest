import React from "react";
import "./components.css";
const AlertBox = ({ alertType, alertMessage }) => {
  if (alertType == "success") {
    return (
      <div key={Math.random() * 1000}  className="successBox">
        {Object.values(alertMessage).map((item) => {
          return <div  key={Math.random() * 1000} >{item}</div>;
        })}
      </div>
    );
  } else {
    if (alertMessage.length == 1) {
      return(
        <div key={Math.random() * 1000}  className="warningBox" style={{padding: '8px 10px',paddingBottom: '10px',textAlign:'center'}}>
          <div>{alertMessage}</div>
        </div>
      )
    } else {
      return (
        <div className="warningBox">
          <ol>
            {Object.values(alertMessage).map((item) => {
              return <li  key={Math.random() * 1000} >{item}</li>;
            })}
          </ol>
        </div>
      );
    }
  }
};

export default AlertBox;
