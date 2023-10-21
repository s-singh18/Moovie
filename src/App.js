import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  HashRouter,
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import {
  // Ethereum,
  // Polygon,
  // Arbitrum,
  // Sepolia,
  // ArbitrumGoerli,
  Mumbai,
} from "@thirdweb-dev/chains";
import { Feed, Header, Upload, User } from "./components";
import "./App.css";

import { useDispatch } from "react-redux";
import {
  loadAccount,
  loadBalance,
  loadIrys,
  loadMoovieTierNFT,
  loadNetwork,
  loadNode,
  loadProvider,
  loadToken,
} from "./store/interactions";

function App() {
  const dispatch = useDispatch();

  const loadBlockchainData = async () => {
    let provider;
    let chainId;
    let account;

    let token;
    let node;
    let irys;
    let balance;
    try {
      const provider = await loadProvider(dispatch);
      const chainId = await loadNetwork(provider, dispatch);
      const account = await loadAccount(dispatch);

      const token = await loadToken(chainId, dispatch);
      const node = await loadNode(chainId, dispatch);
      const irys = await loadIrys(node, token, dispatch);
      const balance = await loadBalance(irys, dispatch);

      // Switch 80001 with chainId
      const moovieTierNFT = await loadMoovieTierNFT(provider, 80001, dispatch);
    } catch (error) {
      // If error set to mumbai and default to devnet
      const chainId = 80001;
      const token = await loadToken(chainId, dispatch);
      const node = await loadNode(chainId, dispatch);
    }
  };

  window.onload = async () => {
    try {
      await loadBlockchainData();
    } catch (error) {
      console.log("Error loading blockchain data on window", error);
    }
  };

  window.ethereum.on(
    "accountsChanged",
    async () => {
      try {
        await loadBlockchainData();
      } catch (error) {
        console.log("Error loading blockchain data on window", error);
      }
    },
    []
  );

  window.ethereum.on("chainChanged", async (chainId) => {
    try {
      await loadBlockchainData();
    } catch (error) {
      console.log("Error loading blockchain data on window", error);
    }
  });

  // const connectIrys = async ({ chainId }) => {};

  return (
    <ThirdwebProvider
      activeChain="mumbai"
      supportedChains={[
        // Ethereum,
        // Polygon,
        // Arbitrum,
        // Sepolia,
        // ArbitrumGoerli,
        Mumbai,
      ]}
      clientId={`${process.env.THIRDWEB_CLIENT_ID}`}
    >
      <Container fluid="true" style={{ backgroundColor: "black" }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path="/" element={<Feed />} />
            <Route exact path="/upload" element={<Upload />} />
            <Route exact path="/user/:id" element={<User />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </ThirdwebProvider>
  );
}

export default App;
