import React, { useRef, useState } from "react";
import VideoCardFooter from "./VideoCardFooter";

import { Card } from "react-bootstrap";

const VideoCard = ({ title, url }) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const onVideoClick = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <Card
      className="mb-4"
      style={{
        position: "relative",
        borderRadius: "20px",
        backgroundColor: "black",
        width: "100%",
        height: "80%",
        scrollSnapAlign: "start",
      }}
    >
      <video
        style={{ objectFit: "fill", height: "100%", width: "100%" }}
        src={url}
        alt={title}
        ref={videoRef}
        onClick={onVideoClick}
        loop
      />
      <VideoCardFooter />
    </Card>
  );
};

export default VideoCard;
