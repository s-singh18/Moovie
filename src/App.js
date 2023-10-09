import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Ethereum, Polygon, Arbitrum } from "@thirdweb-dev/chains";
import { Feed, Header } from "./components";
import "./App.css";

const App = () => {
  return (
    <ThirdwebProvider
      activeChain="ethereum"
      supportedChains={[Ethereum, Polygon, Arbitrum]}
      clientId={`${process.env.THIRDWEB_CLIENT_ID}`}
    >
      <BrowserRouter>
        <Container fluid="true">
          <Header />
          <Routes>
            <Route exact path="/" element={<Feed />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThirdwebProvider>
  );
};

export default App;
