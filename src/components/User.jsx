import React, { useEffect, useState } from "react";
import { Stack, Row, Col, Card, Button, Nav, Form } from "react-bootstrap";
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
import { ethers } from "ethers";

const User = () => {
  const provider = useSelector((state) => state.provider.provider);
  const chainId = useSelector((state) => state.provider.chainId) ?? 80001;
  const account = useSelector((state) => state.provider.account);

  const token = useSelector((state) => state.irys.token);
  const node = useSelector((state) => state.irys.node);
  const irys = useSelector((state) => state.irys.irys);
  const balance = useSelector((state) => state.irys.balance);

  const moovieTierNFTContract = useSelector(
    (state) => state.moovieTierNFT.contract
  );

  const [videos, setVideos] = useState([]);
  const [tierName, setTierName] = useState("");
  const [tierPrice, setTierPrice] = useState("");
  const [tier, setTier] = useState([]);
  const [tierId, setTierId] = useState([]);
  const [tiers, setTiers] = useState([]);
  const [tierIds, setTierIds] = useState([]);

  const contractAccount = account ? account.toLowerCase() : "";
  const location = useLocation();
  const currentRoute = location.pathname;
  const myArray = currentRoute.split("/");
  const user = myArray[2];

  const [showVideoMainFeed, setShowVideoMainFeed] = useState(true);
  const [showVideoTierFeed, setShowVideoTierFeed] = useState(false);
  const [showMintButton, setShowMintButton] = useState(false);
  const [userIsAccount, setUserIsAccount] = useState(
    account && user === account.toLowerCase()
  );
  const [storedRootTx, setStoredRootTx] = useState(
    localStorage.getItem("root-tx")
  );
  const [storedPrevTx, setStoredPrevTx] = useState(
    localStorage.getItem("prev-tx")
  );

  console.log("User is account", userIsAccount);

  const handleNavLinkSelect = async (key) => {
    if (key === "videoMainFeed") {
      setShowVideoMainFeed(true);
      getVideos();
    } else {
      setShowVideoMainFeed(false);
      const curTierId = tierIds[key];
      const curTier = tiers[key];
      const rootTx = curTier.oldTransactionId;
      const prevTx = curTier.newTransactionId;
      setTierId(curTierId);
      setTier(curTier);

      if (!account) {
        setShowMintButton(true);
      } else {
        const balanceOf = await moovieTierNFTContract.balanceOf(
          account,
          curTierId
        );
        const balanceOfInt = balanceOf.toNumber();

        if (balanceOfInt > 0) {
          setShowMintButton(false);
          const videos = await getVideos(rootTx, prevTx);
          setVideos(videos);
        } else {
          setShowMintButton(true);
        }
      }
    }
  };

  const handleMintTier = async () => {
    try {
      const signer = await provider.getSigner();
      // const data = await moovieTierNFTContract.connect(signer).mint(tierId, 1);
      const data = await moovieTierNFTContract
        .connect(signer)
        .mint(tierId, 1, { value: ethers.utils.parseEther("1.0") });
      console.log(data);
    } catch (error) {
      console.log("Handle Mint Error:\n", error);
    }
  };

  const handleCreateTier = async () => {
    console.log(`Handle Create Tier, ${tierName}, ${tierPrice}`);
    try {
      if (tierName !== "" && tierPrice >= 0) {
        const signer = await provider.getSigner();
        const ethTierPrice = ethers.utils.parseEther(tierPrice);
        const data = await moovieTierNFTContract
          .connect(signer)
          .createTier(ethTierPrice, tierName);
      }
      window.location.href = `/user/${user}`;
    } catch (error) {
      console.log("Create tier error", error);
    }
  };

  const getCreatorTierIDs = async () => {
    try {
      const data = await moovieTierNFTContract.getCreatorTierIDs(user);
      let tiers = [];
      let tierIds = [];
      data.map((id) => {
        tierIds.push(id.toNumber());
      });
      setTierIds(tierIds);

      for (const id in tierIds) {
        console.log("Id: ", tierIds[id]);
        const tier = await moovieTierNFTContract.tiers(tierIds[id]);
        tiers.push(tier);
      }
      setTiers(tiers);
    } catch (error) {
      console.log("Get creator tiers error \n", error);
    }
  };

  const getVideos = async (rootTx = null, prevTx = null) => {
    if (rootTx === null && prevTx === null) {
      rootTx = storedRootTx;
      prevTx = storedPrevTx;
    }
    const videos = await queryUserFeed(node, user, rootTx, prevTx);
    setVideos(videos);
    return videos;
  };

  useEffect(() => {
    try {
      getVideos();
      getCreatorTierIDs();
    } catch (error) {
      console.log("Error loading video data", error);
    }
  }, [node, moovieTierNFTContract]);

  return (
    <Stack className="align-items-center">
      <Row style={{ marginTop: "20px", marginBottom: "20px", width: "50%" }}>
        <Col xs={1} style={{ marginRight: "0px", padding: "0px" }}>
          <img
            className="rounded-circle shadow-4-strong"
            style={{ height: "60px", width: "60px" }}
            alt="avatar1"
            src="/images/m-logo.png"
          />
        </Col>
        <Col
          xs={2}
          style={{
            width: "40%",
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
        <Col
          xs={2}
          style={{
            width: "40%",
            maxWidth: "600px",
          }}
        >
          {!account ? (
            <></>
          ) : contractAccount === user ? (
            <Form>
              <Form.Group className="mb-2 mr-sm-2 w-50">
                <Form.Control
                  type="text"
                  id="tierName"
                  placeholder="Tier Name"
                  value={tierName}
                  onChange={(e) => setTierName(e.target.value)}
                />
                <Form.Control
                  type="number"
                  id="tierPrice"
                  placeholder="Tier Price"
                  value={tierPrice}
                  onChange={(e) => setTierPrice(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={handleCreateTier}
                className="mb-2"
                style={{ backgroundColor: "#FDD600", color: "#FDD600" }}
              >
                Create Tier
              </Button>
            </Form>
          ) : (
            <></>
          )}
        </Col>
      </Row>
      <Row style={{ width: "50%" }}>
        <Nav
          // fill
          variant="tabs"
          onSelect={(selectedKey) => handleNavLinkSelect(selectedKey)}
          defaultActiveKey="videoMainFeed"
        >
          <Nav.Item key="videoMainFeed">
            <Nav.Link eventKey="videoMainFeed" style={{ color: "#FDD600" }}>
              Videos
            </Nav.Link>
          </Nav.Item>
          {console.log("Tier Ids: ", tierIds)}
          {console.log("Account Tiers: ", tiers)}
          {tiers &&
            tiers.map((tier, index) => (
              <Nav.Item key={index}>
                <Nav.Link eventKey={index} style={{ color: "#FDD600" }}>
                  {tier.name}
                </Nav.Link>
              </Nav.Item>
            ))}
        </Nav>
      </Row>
      <Row style={{ width: "50%" }}>
        {showVideoMainFeed ? (
          <Videos videos={videos ?? []} />
        ) : !showVideoMainFeed && !showMintButton ? (
          <Videos videos={videos ?? []} />
        ) : showMintButton ? (
          <>
            <Button
              variant="primary"
              onClick={handleMintTier}
              className="m-auto mt-2 w-25"
              style={{ backgroundColor: "#FDD600", color: "#FDD600" }}
            >
              Mint Tier
            </Button>
          </>
        ) : (
          <></>
        )}
      </Row>
    </Stack>
  );
};

export default User;
