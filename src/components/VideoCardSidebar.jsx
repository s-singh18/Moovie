import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { AiFillMessage } from "react-icons/ai";

const VideoCardSidebar = ({ likes, comments, shares }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div style={{ height: "100%", paddingLeft: "10px", paddingTop: "400px" }}>
      <div>
        {liked ? (
          <AiFillHeart
            style={{ color: "red" }}
            fontSize="large"
            onClick={(e) => setLiked(false)}
          />
        ) : (
          <AiFillHeart fontSize="large" onClick={(e) => setLiked(true)} />
        )}
        <p>{liked ? (parseInt(likes) + 1).toString() : likes}</p>
      </div>
      <div>
        <AiFillMessage fontSize="large" />
        <p>{comments}</p>
      </div>
    </div>
  );
};

export default VideoCardSidebar;
