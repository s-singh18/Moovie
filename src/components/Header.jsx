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
import moovieLogo from "../moovie_logo.png";

const Header = () => {
  return (
    <Row>
      <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
        <Col>
          <Navbar.Brand href="/">
            <img
              src={moovieLogo}
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
              hasValidation="true"
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
          <Button variant="dark">Login</Button>
        </Col>
      </Navbar>
    </Row>
  );
};

export default Header;
