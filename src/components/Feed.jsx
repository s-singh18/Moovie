import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Videos } from "./";
import getIrys from "../utils/getIrys";
import { queryFeed } from "../utils/queryLibrary";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Feed = () => {
  const [videos, setVideos] = useState([]);
  const node = useSelector((state) => state.irys.node);
  const moovieTierNFTContract = useSelector(
    (state) => state.moovieTierNFT.contract
  );

  const getVideos = async (rootTx = null, prevTx = null) => {
    try {
      if (rootTx === null && prevTx === null) {
        rootTx = await moovieTierNFTContract.feedRootTx();
        prevTx = await moovieTierNFTContract.feedPrevTx();
      }
      const videos = await queryFeed(node, rootTx, prevTx);
      setVideos(videos);
      return videos;
    } catch (error) {
      console.log("Get Videos Error ", error);
    }
  };

  useEffect(() => {
    try {
      getVideos();
    } catch (error) {
      console.log("Error loading video data", error);
    }
  }, [node, moovieTierNFTContract]);

  return (
    <Row>
      <Col>
        <Videos videos={videos} />
      </Col>
    </Row>
  );
};

export default Feed;
