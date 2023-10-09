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

import { darkTheme } from "@thirdweb-dev/react";
import { ConnectWallet } from "@thirdweb-dev/react";

const customDarkTheme = darkTheme({
  fontFamily: "Inter, sans-serif",
  colors: {
    primaryButtonBg: "#d4af37",
    primaryButtonText: "white",
    connectedButtonBg: "#d4af37",
  },
});

const Header = () => {
  return (
    <Row>
      <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
        <Col>
          <Navbar.Brand href="/">
            <img
              src="/images/moovie-logo.png"
              height="100px"
              alt="Moovie"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
        </Col>
        <Col xs={8}>
          <InputGroup className="d-flex m-auto w-50">
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
        </Col>
        <Col>
          {/* <Button variant="dark">Login</Button> */}
          <ConnectWallet theme={customDarkTheme} />
        </Col>
      </Navbar>
    </Row>
  );
};

export default Header;
