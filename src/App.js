import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Ethereum, Polygon, Arbitrum } from "@thirdweb-dev/chains";
import { Channel, Feed, Header, Upload } from "./components";
import "./App.css";

const App = () => {
  return (
    <ThirdwebProvider
      activeChain="polygon"
      supportedChains={[Ethereum, Polygon, Arbitrum]}
      clientId={`${process.env.THIRDWEB_CLIENT_ID}`}
    >
      <BrowserRouter>
        <Container fluid="true" color="black">
          <Header />
          <Routes>
            <Route exact path="/" element={<Feed />} />
            <Route exact path="/upload" element={<Upload />} />
            <Route exact path="/channel/:id" element={<Channel />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThirdwebProvider>
  );
};

export default App;
