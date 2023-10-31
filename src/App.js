import { useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  HashRouter,
  BrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { createHashRouter, RouterProvider } from "react-router-dom";
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
// import * as LitJsSdk from "@lit-protocol/lit-node-client";
import "./App.css";

import { useDispatch } from "react-redux";
import {
  loadAccount,
  loadBalance,
  loadChainId,
  loadIrys,
  loadMoovieTierNFT,
  loadNode,
  loadProvider,
  loadToken,
} from "./store/interactions";

// const router = createHashRouter([
//   {
//     path: "/",
//     element: <Feed />,
//     children: [
//       {
//         path: "upload",
//         element: <Upload />,
//       },
//       {
//         path: "user/:id",
//         element: <User />,
//       },
//     ],
//   },
// ]);

function App() {
  const dispatch = useDispatch();

  const loadBlockchainData = async () => {
    const provider = await loadProvider(dispatch);
    const chainId = await loadChainId(provider, dispatch);
    const account = await loadAccount(dispatch);

    const token = await loadToken(chainId, dispatch);
    const node = await loadNode(chainId, dispatch);
    const irys = await loadIrys(provider, node, token, dispatch);

    const balance = await loadBalance(irys, dispatch);

    const moovieTierNFT = await loadMoovieTierNFT(provider, chainId, dispatch);
    // console.log("App MoovieTierNFT: ", moovieTierNFT);
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
      clientId={`${process.env.REACT_APP_THIRDWEB_CLIENT_ID}`}
    >
      <Container fluid="true" style={{ backgroundColor: "black" }}>
        <Header />

        {/* <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Feed />} />
            <Route exact path="/upload" element={<Upload />} />
            <Route exact path="/user/:id" element={<User />} />
          </Routes>
        </BrowserRouter> */}
      </Container>
    </ThirdwebProvider>
  );
}

export default App;
