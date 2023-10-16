import { ethers } from "ethers";
import getIrys from "../utils/getIrys.js";

import { setAccount, setNetwork, setProvider } from "./reducers/provider";
import { chainAlias, irysNodes, mainnetChains } from "../utils/constants.js";
import { setBalance, setIrys, setNode, setToken } from "./reducers/irys.js";

export const loadProvider = async (dispatch) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  dispatch(setProvider(provider));

  return provider;
};

export const loadNetwork = async (provider, dispatch) => {
  const { chainId } = await provider.getNetwork();
  dispatch(setNetwork(chainId));

  return chainId;
};

export const loadAccount = async (dispatch) => {
  let accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
    params: [],
  });

  const account = ethers.utils.getAddress(accounts[0]).toString();
  dispatch(setAccount(account));
  return account;
};

// ---------------------------------------------------------------------------------
// LOAD IRYS

export const loadIrys = async (url, token, dispatch) => {
  const irys = await getIrys({ url, token });

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
  const atomicBalance = await irys.getLoadedBalance();
  // Convert balance to standard
  const convertedBalance = irys.utils.fromAtomic(atomicBalance).toString();
  dispatch(setBalance(convertedBalance));
  return convertedBalance;
};
