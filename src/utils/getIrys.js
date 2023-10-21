import { WebIrys } from "@irys/sdk";
import { ethers } from "ethers";

// import BigNumber from "bignumber.js";

import { rpcURLs, currentIrysNode } from "./constants";

// const URL = currentIrysNode;
// const TOKEN = "matic";

const getIrys = async ({ provider, url, token }) => {
  try {
    console.log("Token: ", token);
    const rpcURL = rpcURLs[token];
    const wallet = { rpcUrl: rpcURL, name: "ethersv5", provider: provider };
    const webIrys = new WebIrys({ url, token, wallet });
    await webIrys.ready();

    console.log(`Conected to webIrys from ${webIrys.address}`);
    return webIrys;
  } catch (error) {
    console.log("Error getting irys", error);
    return "";
  }
};

export default getIrys;
