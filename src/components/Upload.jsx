import { ethers } from "ethers";
import React, { useState, useEffect } from "react";

import getIrys from "../utils/getIrys.js";
// import getIrysNodeBalance from "../utils/getIrysNodeBalance.js";
import getRpcUrl from "../utils/getRpcUrl";

const Upload = () => {
  const [account, setAccount] = useState("");
  const [irys, setIrys] = useState("");
  const [irysNodeBalance, setIrysNodeBalance] = useState("");

  const getAccount = async () => {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
      params: [],
    });

    const account = ethers.utils.getAddress(accounts[0]).toString();
    setAccount(account);
  };

  const connectIrys = async () => {
    const irys = await getIrys("matic");
    setIrys(irys);
    console.log(irys);

    const atomicBalance = await irys.getLoadedBalance();
    console.log(`Node balance (atomic units) = ${atomicBalance}`);

    // Convert balance to standard
    const convertedBalance = irys.utils.fromAtomic(atomicBalance);
    console.log(`Node balance (converted) = ${convertedBalance}`);
    setIrysNodeBalance(convertedBalance.toString());
    return convertedBalance;

    return irys;
  };

  window.onload = async () => {
    await getAccount();
  };

  window.ethereum.on(
    "accountsChanged",
    async () => {
      await getAccount();
    },
    []
  );

  useEffect(() => {
    if (account) {
      connectIrys();
    } else {
      getAccount();
    }
  }, [account]);

  return (
    <div>
      {account ? (
        <div>
          <p>Account connected: {account}</p>
          <p>Node balance: {irysNodeBalance}</p>
        </div>
      ) : (
        <p>Account not connected</p>
      )}
    </div>
  );
};

export default Upload;
