import { WebIrys } from "@irys/sdk";
import { ethers } from "ethers";

import BigNumber from "bignumber.js";
import getRpcUrl from "./getRpcUrl";

const getIrys = async (
  url = process.env.PUBLIC_NODE || "",
  token = process.env.PUBLIC_TOKEN || ""
) => {
  await window.ethereum.enable();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const rpcURL = getRpcUrl("token");
  const wallet = { rpcUrl: rpcURL, name: "ethersv5", provider: provider };
  const webIrys = new WebIrys({ url, token, wallet });
  await webIrys.ready();

  console.log(`Conected to webIrys from ${webIrys.address}`);
  return webIrys;
};

export default getIrys;
