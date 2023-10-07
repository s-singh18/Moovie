import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";

import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Container fluid="true">
        <Header />
      </Container>
    </BrowserRouter>
  );
};

export default App;
