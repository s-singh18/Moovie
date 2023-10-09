import React, { useState } from "react";
import { Stack, Row, Col, Card, Button } from "react-bootstrap";

import logo from "../logo.svg";

import VideoCard from "./VideoCard";

const Videos = () => {
  const videos = [
    {
      id: 1,
      title: "Video 1",
      url: "/videos/tiktok-vid-1.mp4",
      user: "User1",
    },
    { id: 2, title: "Video 2", url: "/videos/yt-short-1.mp4", user: "User2" },
    { id: 3, title: "Video 3", url: "/videos/yt-short-2.mp4", user: "User3" },
    // Add more video objects as needed
  ];
  return (
    <Stack className="mt-4 align-items-center">
      {videos.map((video) => (
        <Row
          key={video.id}
          style={{
            width: "600px",
            position: "relative",
            overflow: "hidden",
            scrollSnapType: "y mandatory",
          }}
        >
          <Col xs={1} style={{ marginRight: "20px" }}>
            <img
              className="rounded-circle shadow-4-strong"
              style={{ height: "60px", width: "60px" }}
              alt="avatar1"
              src={"https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"}
            />
          </Col>
          <Col
            style={{
              height: "800px",
              width: "80%",
              maxWidth: "600px",
            }}
          >
            <h4 className="mb-0">{video.user}</h4>
            <p>
              <span>{video.title}</span>
            </p>
            <VideoCard title={video.title} url={video.url} />
          </Col>
        </Row>
      ))}
    </Stack>
  );
};

export default Videos;
