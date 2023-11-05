import React, { useRef, useState } from "react";
import VideoCardFooter from "./VideoCardFooter";

import { Card } from "react-bootstrap";
import { Player } from "@livepeer/react";

import VideoCardSidebar from "./VideoCardSidebar";

const VideoCard = ({ id, title, url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
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
      {/* <Player
        title={title}
        style={{ objectFit: "fill", height: "100%", width: "100%" }}
        src={url}
        onClick={onVideoClick}
        loop
      /> */}
      {/* <VideoCardFooter creator={creator} title={title} song={song} /> */}
    </Card>
  );
};

export default VideoCard;
