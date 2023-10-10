import React from "react";
import { Stack, Row, Col, Card, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Videos from "./Videos";

const channel = "User1";

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

const Channel = () => {
  return (
    <Stack className="align-items-center">
      <Row style={{ marginTop: "20px", marginBottom: "20px", width: "25%" }}>
        <Col xs={2} style={{ marginRight: "20px", padding: "0px" }}>
          <img
            className="rounded-circle shadow-4-strong"
            style={{ height: "60px", width: "60px" }}
            alt="avatar1"
            src={"https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"}
          />
        </Col>
        <Col
          xs={2}
          style={{
            width: "65%",
            maxWidth: "600px",
          }}
        >
          <h4 className="mb-0">
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={channel ? `/channel/${channel}` : `/channel/0`}
            >
              {channel}
            </Link>
          </h4>
        </Col>
      </Row>
      <Row style={{ width: "50%" }}>
        <Nav fill variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="link-1">Videos</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2">Exclusives</Nav.Link>
          </Nav.Item>
        </Nav>
      </Row>
      <Row style={{ width: "50%" }}>
        <Videos videos={VIDEOS} />
      </Row>
    </Stack>
  );
};

export default Channel;
