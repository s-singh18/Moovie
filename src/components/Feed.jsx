import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Videos } from "./";
import getIrys from "../utils/getIrys";
import { queryFeed } from "../utils/queryLibrary";
import { useSelector } from "react-redux";

// const VIDEOS = [
//   {
//     id: 1,
//     title: "Video 1",
//     channel: "User1",
//     url: "/videos/tiktok-vid-1.mp4",
//   },
//   {
//     id: 2,
//     title: "Video 2",
//     url: "/videos/yt-short-1.mp4",
//     channel: "User2",
//   },
//   {
//     id: 3,
//     title: "Video 3",
//     url: "/videos/yt-short-2.mp4",
//     channel: "User3",
//   },
// ];

const Feed = () => {
  const [videos, setVideos] = useState([]);
  const node = useSelector((state) => state.irys.node);
  console.log("Node: ", node);

  const getVideos = async () => {
    const videos = await queryFeed(node);
    setVideos(videos);
    return videos;
  };

  useEffect(() => {
    try {
      getVideos();
    } catch (error) {
      console.log("Error loading video data", error);
    }
  }, [node]);

  return (
    <Row>
      <Col>
        <Videos videos={videos} />
      </Col>
    </Row>
  );
};

export default Feed;
