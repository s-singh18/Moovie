import { ethers } from "ethers";
import React, { useState, CSSProperties, useEffect } from "react";

import getIrys from "../utils/getIrys.js";
import BigNumber from "bignumber.js";
import ClipLoader from "react-spinners/ClipLoader";
// import fundNode from "../utils/fundNode.js";
// import uploadVideo from "../utils/uploadVideo.js";
import { Stack, Row, Form, Button, Col } from "react-bootstrap";
import {
  irysNodes,
  chainAlias,
  testnetChains,
  mainnetChains,
} from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { loadBalance } from "../store/interactions.js";
import { storeUpdate, storeUpdateTier } from "../utils/storeVideoTx.js";
import { shortenEthereumAddress } from "../utils/shortenEthereumAddress.js";
import { Link } from "react-router-dom";

const tiers = ["Tier1", "Tier2", "Tier3"];

const Upload = () => {
  const [nodeBalance, setNodeBalance] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [price, setPrice] = useState(0);
  const [fundAmount, setFundAmount] = useState(0);
  const [title, setTitle] = useState("");
  const [tier, setTier] = useState("");
  const [tierId, setTierId] = useState("");
  const [tiers, setTiers] = useState([]);
  const [tierIds, setTierIds] = useState([]);
  const [nodeURL, setNodeURL] = useState("");
  const [uploading, setUploading] = useState(false);

  const provider = useSelector((state) => state.provider.provider);
  const chainId = useSelector((state) => state.provider.chainId);
  const account = useSelector((state) => state.provider.account);

  const token = useSelector((state) => state.irys.token);
  const node = useSelector((state) => state.irys.node);
  const irys = useSelector((state) => state.irys.irys);
  const balance = useSelector((state) => state.irys.balance);

  const moovieTierNFTContract = useSelector(
    (state) => state.moovieTierNFT.contract
  );

  const dispatch = useDispatch();

  const handleFileChange = async (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    setSelectedFile(selectedFile);

    const price = await irys.getPrice(selectedFile.size);
    setPrice(irys.utils.fromAtomic(price));
  };

  const handleFund = async () => {
    // Implement your fund action here, e.g., sending the fundAmount to your server.

    console.log(`Funding ${fundAmount}`);
    // const selectedFileSize = selectedFile.size;
    try {
      const fundTx = await irys.fund(
        irys.utils.toAtomic(new BigNumber(fundAmount))
      );
      alert(
        `Successfully funded ${irys.utils.fromAtomic(fundTx.quantity)} ${
          irys.token
        }`
      );
      loadBalance(irys, dispatch);

      return fundTx;
    } catch (error) {
      setUploading(false);
      console.log("Error funding node", error);
    }
  };

  const handleWithdraw = async () => {
    const response = await irys.withdrawBalance(
      irys.utils.toAtomic(new BigNumber(fundAmount))
    );
    alert(
      `Successfully withdrew ${irys.utils.fromAtomic(fundAmount)} ${irys.token}`
    );

    loadBalance(irys, dispatch);
  };

  const uploadVideo = async () => {
    console.log("Video upload Irys", irys);
    console.log("Video upload fileToUpload", selectedFile);
    console.log("Video upload title", title);
    console.log("Video upload user", account);
    console.log(`Uploading ${selectedFile.name} with title: ${title}`);

    const tags = [
      { name: "Content-Type", value: "video/mp4" },
      { name: "application-id", value: "Moovie" },
      { name: "title", value: title },
      { name: "user", value: account },
    ];

    try {
      console.log("Tags: ", tags);
      const receipt = await irys.uploadFile(selectedFile, { tags });

      let txId;
      console.log("Tier compare: ", tier);
      tier === ""
        ? (txId = await storeUpdate(receipt.id, irys, node))
        : (txId = await storeUpdateTier(
            receipt.id,
            tierId,
            tier,
            irys,
            node,
            moovieTierNFTContract,
            provider
          ));

      console.log("Updated list tx: ", txId);

      alert(`File uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
      window.location.href = "/#/upload";
      return receipt;
    } catch (e) {
      setUploading(false);
      console.log("Error uploading file ", e);
    }
  };

  const fundNodeAndUploadVideo = async () => {
    try {
      setUploading(true);
      console.log("Node balance: ", nodeBalance);
      if (nodeBalance < price) {
        const fundAmount = price;
        await handleFund(fundAmount);
      }
      const receipt = await uploadVideo();
      console.log("Reciept: ", receipt);
    } catch (error) {
      setUploading(false);
      alert(`Fund node and upload video error... \n${error}`);
    }
  };

  const getCreatorTierIDs = async () => {
    try {
      const data = await moovieTierNFTContract.getCreatorTierIDs(account);
      let tiers = [];
      let tierIds = [];
      data.map((id) => {
        tierIds.push(id.toNumber());
      });
      setTierIds(tierIds);

      for (const id in tierIds) {
        const tier = await moovieTierNFTContract.tiers(tierIds[id]);
        tiers.push(tier);
      }
      setTiers(tiers);
    } catch (error) {
      console.log("Get creator tiers error \n", error);
    }
  };

  const handleTier = async (index) => {
    try {
      setTier(tiers[index]);
      setTierId(tierIds[index]);
    } catch (error) {
      console.log("Handle tier error", error);
    }
  };

  useEffect(() => {
    try {
      getCreatorTierIDs();
    } catch (error) {
      console.log("Error loading video data", error);
    }
  }, [node, moovieTierNFTContract]);

  return (
    <div className="h-100 w-100">
      <Stack className="mt-4 align-items-center h-100 w-100">
        {account ? (
          <div>
            <div>
              <div style={{ padding: "" }}>
                <h3 style={{ color: "white" }}>Video Upload</h3>
              </div>

              <p>Account connected: {shortenEthereumAddress(account)}</p>
              <Row>
                <Col>
                  <p>Node balance: {balance}</p>
                </Col>
                <Col>
                  <Form>
                    <Form.Group className="mb-2 mr-sm-2 w-50">
                      <Form.Label
                        style={{ color: "white" }}
                        htmlFor="fundAmount"
                        className="sr-only"
                      >
                        Amount
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="fundAmountInput"
                        placeholder="Fund Amount"
                        value={fundAmount}
                        onChange={(e) => setFundAmount(e.target.value)}
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      onClick={handleFund}
                      className="mb-2"
                      style={{ backgroundColor: "#FDD600", color: "#FDD600" }}
                    >
                      Fund
                    </Button>
                    <Button
                      variant="outline-light"
                      onClick={handleWithdraw}
                      className="mb-2"
                      style={{ color: "#FDD600" }}
                    >
                      Withdraw
                    </Button>
                  </Form>
                </Col>
              </Row>
            </div>
            <Form>
              <Form.Group className="mb-2" controlId="fileCost">
                <Form.Label style={{ color: "white" }} column sm="2">
                  Price
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    style={{ color: "white" }}
                    plaintext
                    readOnly
                    value={price}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mb-2" controlId="fileInput">
                <Form.Control
                  type="file"
                  // onChange={(e) => setSelectedFile(e.target.files[0])}
                  onChange={handleFileChange}
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="titleInput">
                <Form.Control
                  type="text"
                  placeholder="Enter a title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                className="mb-2"
                controlId="tierInput"
                onChange={(e) => handleTier(e.target.value)}
              >
                <Form.Select>
                  <option value="">Select Tier</option>
                  {console.log("Tier: ", tier)}
                  {tiers &&
                    tiers.map((tier, index) => (
                      <option key={tierIds[index]} value={index}>
                        {tier.name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
              <Button
                style={{ backgroundColor: "#FDD600", color: "#FDD600" }}
                variant="primary"
                onClick={uploadVideo}
              >
                Upload
              </Button>
              {/* <ClipLoader
                color={"#FDD600"}
                loading={uploading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
                style={{
                  display: "block",
                  margin: "0 auto",
                  borderColor: "red",
                }}
              /> */}
            </Form>
          </div>
        ) : (
          <p>Account not connected</p>
        )}
      </Stack>
    </div>
  );
};

export default Upload;
