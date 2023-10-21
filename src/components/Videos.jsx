import React, { useState } from "react";
import { Stack, Row, Col, Card, Button } from "react-bootstrap";

import VideoCard from "./VideoCard";
import VideoCardSidebar from "./VideoCardSidebar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { shortenEthereumAddress } from "../utils/shortenEthereumAddress";

const Videos = ({ videos }) => {
  const node = useSelector((state) => state.irys.node);

  return (
    <Stack className="mt-4 align-items-center">
      {console.log("Videos: ", videos)}
      {videos.map((video) => (
        <Row
          key={video.id}
          style={{
            width: "800px",
            position: "relative",
            overflow: "hidden",
            scrollSnapType: "y mandatory",
            objectFit: "contain",
          }}
        >
          <Col xs={1} style={{ marginRight: "20px" }}>
            <img
              className="rounded-circle shadow-4-strong"
              style={{ height: "60px", width: "60px" }}
              alt="avatar1"
              src="/images/m-logo.png"
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
                to={`/user/${video.address}`}
              >
                {shortenEthereumAddress(video.address)}
              </Link>
            </h4>
            <h6>
              <span style={{ color: "white" }}>{video.tags[2]["value"]}</span>
              {console.log("Title: ", video.tags[2]["value"])}
            </h6>
            <VideoCard
              id={video.id}
              title={video.tags[2].title}
              url={node + "/" + video.id}
            />
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
