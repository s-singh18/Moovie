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
  console.log("Node: ", node);

  const getVideos = async (rootTx = null, prevTx = null) => {
    if (rootTx === null && prevTx === null) {
      rootTx = localStorage.getItem("root-tx");
      prevTx = localStorage.getItem("prev-tx");
    }
    const videos = await queryFeed(node, rootTx, prevTx);
    setVideos(videos);
    return videos;
  };

  useEffect(() => {
    try {
      getVideos();
    } catch (error) {
      console.log("Error loading video data", error);
    }
  }, [node]);

  return (
    <Link to={"/"}>
      <Row>
        <Col>
          <Videos videos={videos} />
        </Col>
      </Row>
    </Link>
  );
};

export default Feed;
