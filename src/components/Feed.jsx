import React from "react";
import { Row, Col } from "react-bootstrap";
import { Videos } from "./";

const VIDEOS = [
  {
    id: 1,
    title: "Video 1",
    channel: "User1",
    url: "/videos/tiktok-vid-1.mp4",
  },
  {
    id: 2,
    title: "Video 2",
    url: "/videos/yt-short-1.mp4",
    channel: "User2",
  },
  {
    id: 3,
    title: "Video 3",
    url: "/videos/yt-short-2.mp4",
    channel: "User3",
  },
  // Add more video objects as needed
];

const Feed = () => {
  return (
    <Row>
      <Col>
        <Videos videos={VIDEOS} />
      </Col>
    </Row>
  );
};

export default Feed;
