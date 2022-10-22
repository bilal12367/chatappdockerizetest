import React, { useEffect, useState } from "react";
const initialState = {
  isHovered: false,
};
const FlipCard = ({ title, imgSrc, skills }) => {
  const [state, setState] = useState(initialState);
  var styles;
  useEffect(() => {}, [state.isHovered]);
  const mouseEnter = () => {
    setState({ isHovered: true });
  };
  const mouseLeave = () => {
    setState({ isHovered: false });
  };
  return (
    <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <div
            className="d-flex flex-column w-100 p-3 align-items-center card shadow"
            style={{ borderRadius: "14px" }}
          >
            <h4 className="text-center sub2">{title}</h4>
            <hr />
            <div>
              <img src={imgSrc} height="100%" width="100%" />
            </div>
          </div>
        </div>
        <div class="flip-card-back">
          <div
            className="d-flex flex-column w-100 p-3 card shadow"
            style={{ borderRadius: "14px" }}
          >
            <h3 className="text-center sub2">{title}</h3>
            <hr />
            <div className="d-flex flex-column align-items-start">
              {skills != undefined &&
                Object.values(skills).map((item, idx) => {
                  if (state.isHovered == true) {
                    styles = {
                      width: "100%",
                      fontWeight: "bolder",
                      backgroundColor: item.color,
                      color: "white",
                      cursor: "pointer",
                      border: "4px solid " + item.color,
                    };
                  } else if (state.isHovered == false) {
                    styles = {
                      width: "100%",
                      fontWeight: "bolder",
                      cursor: "pointer",
                      color: item.color,
                      backgroundColor: "white",
                      border: "4px solid " + item.color,
                    };
                  }
                  return (
                    <div className="w-100" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
                      <div
                        className="trans card shadow-sm p-1 mb-3"
                        style={styles}
                      >
                        <h4 className="sub2 mt-2">{item.skill}</h4>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
