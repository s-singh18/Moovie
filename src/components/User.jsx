import React, { useEffect, useState } from "react";
import { Stack, Row, Col, Card, Button, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

import Videos from "./Videos";
import { shortenEthereumAddress } from "../utils/shortenEthereumAddress";
import { Web3Button } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";
import { useContract } from "@thirdweb-dev/react";
import { useSelector } from "react-redux";
import { queryUserFeed } from "../utils/queryLibrary";

import MOOVIE_TIER_NFT_ABI from "../abi/MoovieTierNFT.json";
import config from "../config.json";

const User = () => {
  const provider = useSelector((state) => state.provider.provider);
  const chainId = useSelector((state) => state.provider.chainId);

  const [videos, setVideos] = useState([]);
  const location = useLocation();

  const node = useSelector((state) => state.irys.node);

  const currentRoute = location.pathname;
  const myArray = currentRoute.split("/");
  const user = myArray[2];
  const address = useAddress() ?? "";
  const { contract, isLoading, error } = useContract(
    config[`${chainId}`].moovieTierNFT.address,
    MOOVIE_TIER_NFT_ABI
  );
  console.log("Contract: ", contract);
  const [showMint, setShowMint] = useState(false);

  const handleNavLinkSelect = (key) => {
    if (key === "link-2") {
      setShowMint(true);
    } else {
      setShowMint(false);
    }
  };

  const getVideos = async () => {
    const videos = await queryUserFeed(node, user);
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
        <Nav
          fill
          variant="tabs"
          onSelect={(selectedKey) => handleNavLinkSelect(selectedKey)}
        >
          <Nav.Item>
            <Nav.Link eventKey="link-1" style={{ color: "#FDD600" }}>
              Videos
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2" style={{ color: "#FDD600" }}>
              Exclusives
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Row>
      {!showMint && (
        <Row style={{ width: "50%" }}>
          <Videos videos={videos} />
        </Row>
      )}
      <Row style={{ width: "50%" }}>
        {showMint && (
          <Col>
            <Web3Button
              contractAddress={config[`${chainId}`].moovieTierNFT.address}
              contractAbi={MOOVIE_TIER_NFT_ABI}
              action={() => {
                contract.call("mint", [1, 1]);
              }}
            >
              Mint Tier
            </Web3Button>
          </Col>
        )}
      </Row>
    </Stack>
  );
};

export default User;
