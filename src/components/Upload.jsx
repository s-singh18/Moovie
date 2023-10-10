import { ethers } from "ethers";
import React, { useState, useEffect } from "react";

const Upload = () => {
  const [account, setAccount] = useState("");

  window.ethereum.on(
    "accountsChanged",
    async () => {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [],
      });

      const account = ethers.utils.getAddress(accounts[0]).toLowerCase();
      setAccount(account);
    },
    []
  );

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
