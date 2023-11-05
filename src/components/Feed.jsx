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

  const [storedRootTx, setStoredRootTx] = useState(
    "RwIwPtCCMLmL660Oh_9aH__VZsQLk4SmLEfK5QtFris"
    // localStorage.getItem("root-tx")
  );

  const [storedPrevTx, setStoredPrevTx] = useState(
    "Vx2_fMgYuL8eYYM0N6Qs2VQNRGpFMR-L2HxRYU-ix_I"
    // localStorage.getItem("prev-tx")
  );
  console.log("Prev-tx: ", storedPrevTx);

  const getVideos = async (rootTx = null, prevTx = null) => {
    if (rootTx === null && prevTx === null) {
      rootTx = storedRootTx;
      prevTx = storedPrevTx;
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
    <Row>
      <Col>
        <Videos videos={videos} />
      </Col>
    </Row>
  );
};

export default Feed;
