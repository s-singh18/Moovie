import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Videos } from "./";
import queryIrys from "../utils/queryIrys";
import getIrys from "../utils/getIrys";

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
  const [results, setResults] = useState([]);

  return (
    <Row>
      <Col>
        <Videos videos={results} />
      </Col>
    </Row>
  );
};

export default Feed;
