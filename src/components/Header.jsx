import {
  Row,
  Col,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  InputGroup,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { Web3Button } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";
import { useContract } from "@thirdweb-dev/react";
import { darkTheme } from "@thirdweb-dev/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import config from "../config.json";
import { loadProvider } from "../store/interactions";
import { useSelector } from "react-redux";
import MOOVIE_TIER_NFT_ABI from "../abi/MoovieTierNFT.json";

const customDarkTheme = darkTheme({
  fontFamily: "Inter, sans-serif",
  colors: {
    primaryButtonBg: "#FDD600",
    primaryButtonText: "white",
    connectedButtonBg: "#FDD600",
  },
});

const Header = () => {
  const provider = useSelector((state) => state.provider.provider);
  const chainId = useSelector((state) => state.provider.chainId);

  const address = useAddress();
  console.log("Chain id: ", chainId);
  console.log("Config chainId: ", config[chainId]);
  const { contract, isLoading, error } = useContract(
    config[`${chainId}`].moovieTierNFT.address,
    MOOVIE_TIER_NFT_ABI
  );

  return (
    <Navbar
      color="black"
      expand="md"
      variant="dark"
      sticky="top"
      style={{ backgroundColor: "black" }}
    >
      <Navbar.Brand href="/">
        <img
          src="/images/moovie-logo.png"
          height="100px"
          alt="Moovie"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <InputGroup className="d-flex w-25 m-auto justify-content-center">
        <Form.Control
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon2"
          size="sm"
          style={{ outline: "none" }}
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          enable-rounded="true"
        >
          <BsSearch />
        </Button>
      </InputGroup>
      {/* <Button variant="dark">Login</Button> */}
      <Button
        variant="outline-light"
        style={{ borderColor: "#FDD600" }}
        href="/upload"
      >
        Upload
      </Button>
      {/* <Button variant="dark">Login</Button> */}
      <ConnectWallet
        theme={customDarkTheme}
        style={{ fontWeight: "bold" }}
        switchToActiveChain={true}
      />
    </Navbar>
  );
};

export default Header;
