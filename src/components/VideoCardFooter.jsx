import React from "react";
import { BiCameraMovie } from "react-icons/bi";
import Ticker from "react-ticker";

const VideoCardFooter = ({ creator, title, song }) => {
  return (
    <div className="videoFooter">
      <div className="videoFooter__text">
        <h3>@{creator}</h3>
        <p>{title}</p>
        {/* <div className="videoFooter__ticker">
          <BiCameraMovie className="videoFooter__icon" />
          <p color="white">
            <span style={{ marginLeft: "20px" }}>moovie.film</span>
          </p>
          <Ticker style={{ color: "white" }} mode="smooth">
            {({ index }) => (
              <>
                <p>{song}</p>
              </>
            )}
          </Ticker>
        </div> */}
      </div>
      {/* <img
        className="videoFooter__record"
        src="https://static.thenounproject.com/png/934821-200.png"
        alt=""
      /> */}
    </div>
  );
};

export default VideoCardFooter;
