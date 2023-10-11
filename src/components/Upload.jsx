// import { WebIrys } from "@irys/sdk";
import IRYS_NODE from "../App.js";

import { ethers } from "ethers";
import React, { useState, useEffect } from "react";

import { getIrys } from "../utils/getIrys.js";

// import getWebIrys from "../utils/getWebIrys";

const Upload = () => {
  const [account, setAccount] = useState("");
  const [webIrys, setWebIrys] = useState("");

  //   const getWebIrys = async () => {
  //     // Ethers5 provider
  //     await window.ethereum.enable();
  //     const provider = new providers.Web3Provider(window.ethereum);

  //     const url = "https://node1.irys.xyz";
  //     const token = "matic";
  //     const rpcURL = "https://rpc-mumbai.maticvigil.com"; // Optional parameter

  //     // Create a wallet object
  //     const wallet = { rpcUrl: rpcURL, name: "ethersv5", provider: provider };
  //     // Use the wallet object
  //     const webIrys = new WebIrys({ url, token, wallet });
  //     await webIrys.ready();

  //     return webIrys;
  //   };

  window.ethereum.on(
    "accountsChanged",
    async () => {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [],
      });

      const account = ethers.utils.getAddress(accounts[0]).toString();
      setAccount(account);
    },
    []
  );

  useEffect(() => {
    if (account) {
      //   const webIrys = getWebIrys();
      //   setWebIrys(webIrys);
      //   console.log(webIrys);
      console.log("WebIrys connect");
    } else {
      console.log("Connect account");
    }
  }, [account]);

  return (
    <div>
      {account ? (
        <p>Account connected: {account}</p>
      ) : (
        <p>Account not connected</p>
      )}
    </div>
  );
};

export default Upload;
