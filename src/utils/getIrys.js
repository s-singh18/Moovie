import { WebIrys } from "@irys/sdk";
import { ethers } from "ethers";

import BigNumber from "bignumber.js";
import getRpcUrl from "./getRpcUrl";

const url = "https://devnet.irys.xyz";
const TOKEN = "matic";

const getIrys = async (token = TOKEN || "") => {
  console.log("Token: ", token);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const rpcURL = getRpcUrl("token");
  const wallet = { rpcUrl: rpcURL, name: "ethersv5", provider: provider };
  const webIrys = new WebIrys({ url, token, wallet });
  await webIrys.ready();

  console.log(`Conected to webIrys from ${webIrys.address}`);
  return webIrys;
};

export default getIrys;
