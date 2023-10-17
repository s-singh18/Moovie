import React, { useEffect, useState } from "react";
import { Stack, Row, Col, Card, Button, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

import Videos from "./Videos";
import queryIrys from "../utils/queryIrys";
import { shortenEthereumAddress } from "../utils/shortenEthereumAddress";

const User = () => {
  const [videos, setVideos] = useState([]);
  const location = useLocation();

  const currentRoute = location.pathname;
  const myArray = currentRoute.split("/");
  const user = myArray[2];
  console.log(user);

  const getVideos = async () => {
    const videos = await queryIrys();
    setVideos(videos);
    return videos;
  };

  useEffect(() => {
    try {
      getVideos();
    } catch (error) {
      console.log("Error loading video data", error);
    }
  }, []);

  return (
    <Stack className="align-items-center">
      <Row style={{ marginTop: "20px", marginBottom: "20px", width: "25%" }}>
        <Col xs={2} style={{ marginRight: "20px", padding: "0px" }}>
          <img
            className="rounded-circle shadow-4-strong"
            style={{ height: "60px", width: "60px" }}
            alt="avatar1"
            src="/images/Asset-2.svg"
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
              to={`/user/${user}`}
            >
              {shortenEthereumAddress(user)}
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
        <Videos videos={videos} />
      </Row>
    </Stack>
  );
};

export default User;
