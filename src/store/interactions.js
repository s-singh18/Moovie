import { ethers } from "ethers";
import getIrys from "../utils/getIrys.js";

import { setAccount, setChainId, setProvider } from "./reducers/provider";
import { chainAlias, irysNodes, mainnetChains } from "../utils/constants.js";
import { setBalance, setIrys, setNode, setToken } from "./reducers/irys.js";
import { setMoovieTierNFTContract } from "./reducers/moovieTierNFT.js";

import config from "../config.json";
import MOOVIE_TIER_NFT_ABI from "../abi/MoovieTierNFT.json";

export const loadProvider = async (dispatch) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  dispatch(setProvider(provider));

  return provider;
};

export const loadChainId = async (provider, dispatch) => {
  const defaultChainId = 80001; // mumbai
  const { chainId } = (await provider.getNetwork()) ?? defaultChainId;
  dispatch(setChainId(chainId));
  return chainId;
};

export const loadAccount = async (dispatch) => {
  let account;
  try {
    console.log("Window ethereum: ", window.ethereum);
    if (typeof window.ethereum !== "undefined") {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [],
      });
      account = ethers.utils.getAddress(accounts[0]).toString();
    }
  } catch (error) {
    account = "";
  } finally {
    dispatch(setAccount(account));
    return account;
  }
};

// ---------------------------------------------------------------------------------
// LOAD IRYS

export const loadIrys = async (provider, url, token, dispatch) => {
  const irys = await getIrys({ provider, url, token });

  dispatch(setIrys(irys));
  return irys;
};

export const loadNode = async (chainId, dispatch) => {
  let url;
  mainnetChains.has(`${chainId}`)
    ? (url = irysNodes["node1"])
    : (url = irysNodes["devnet"]);

  dispatch(setNode(url));
  return url;
};

export const loadToken = async (chainId, dispatch) => {
  const token = chainAlias[chainId];
  dispatch(setToken(token));
  return token;
};

export const loadBalance = async (irys, dispatch) => {
  try {
    const atomicBalance = await irys.getLoadedBalance();
    // Convert balance to standard
    const convertedBalance = irys.utils.fromAtomic(atomicBalance).toString();
    dispatch(setBalance(convertedBalance));
    return convertedBalance;
  } catch (error) {
    return 0;
  }
};

// ---------------------------------------------------------------------------------
// LOAD moovieTierNFT
export const loadMoovieTierNFT = async (provider, chainId, dispatch) => {
  const moovieTierNFT = new ethers.Contract(
    config[chainId].moovieTierNFT.address,
    MOOVIE_TIER_NFT_ABI,
    provider
  );

  dispatch(setMoovieTierNFTContract(moovieTierNFT));
  return moovieTierNFT;
};
