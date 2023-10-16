import React, { useState } from "react";
import { Stack, Row, Col, Card, Button } from "react-bootstrap";

import VideoCard from "./VideoCard";
import VideoCardSidebar from "./VideoCardSidebar";
import { Link } from "react-router-dom";

const Videos = ({ videos }) => {
  return (
    <Stack className="mt-4 align-items-center">
      {videos.map(({ id, title, url, channel }) => (
        <Row
          key={id}
          style={{
            width: "800px",
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
            <p>
              <span style={{ color: "white" }}>{title}</span>
            </p>
            <VideoCard id={id} title={title} url={url} channel={channel} />
          </Col>
          {/* <Col xs={1} style={{ padding: "0px" }}>
              <VideoCardSidebar
                likes={likes}
                comments={comments}
                shares={shares}
              />
            </Col> */}
        </Row>
      ))}
    </Stack>
  );
};

export default Videos;
