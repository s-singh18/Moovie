import { ethers } from "ethers";
import { queryTransaction } from "./queryLibrary";

// Stores the root transaction and returns the transaction id
export const storeRoot = async (txId, irys) => {
  const tags = [
    { name: "Content-Type", value: "text/plain" },
    { name: "application-id", value: "Moovie" },
    { name: "moovies", value: txId },
  ];
  const tx = await irys.upload("", { tags });
  localStorage.setItem("root-tx", tx.id);
  localStorage.setItem("prev-tx", tx.id);

  return tx.id;
};

export const storeUpdate = async (txId, irys, node) => {
  try {
    const rootTx = localStorage.getItem("root-tx");
    const prevTx = localStorage.getItem("prev-tx");

    const results = await queryTransaction(node, [prevTx], "text/plain");
    const moovies = results[0]["tags"][2]["value"] + ", " + txId;

    const tags = [
      { name: "Content-Type", value: "text/plain" },
      { name: "application-id", value: "Moovie" },
      { name: "moovies", value: moovies },
      { name: "root-tx", value: rootTx },
      { name: "prev-tx", value: prevTx },
    ];

    const tx = await irys.upload("", { tags });
    localStorage.setItem("prev-tx", tx.id);
    return tx.id;
  } catch (error) {
    console.log("Unable to find root. Creating a new root...");
    storeRoot(txId, irys);
  }
};

export const storeRootTier = async (
  txId,
  tierId,
  irys,
  moovieTierNFTContract,
  signer
) => {
  const tags = [
    { name: "Content-Type", value: "text/plain" },
    { name: "application-id", value: "Moovie" },
    { name: "moovies", value: txId },
  ];
  const tx = await irys.upload("", { tags });

  // Set root-tx and prev-tx in smart contract
  const result = await moovieTierNFTContract
    .connect(signer)
    .changeTransactionIds(tierId, tx.id, tx.id);

  return tx.id;
};

export const storeUpdateTier = async (
  txId,
  tierId,
  tier,
  irys,
  node,
  moovieTierNFTContract,
  provider
) => {
  const signer = await provider.getSigner();
  try {
    console.log("Store Update Tier: ", tier);
    console.log("Store Update Tier Id: ", tierId);

    // Get root-tx & prev-tx from smart contract
    let rootTx = tier.oldTransactionId;
    let prevTx = tier.newTransactionId;

    const tierPrice = ethers.utils.formatEther(tier[1]);
    const tierCreator = tier[0];

    if (rootTx === "" && prevTx === "") {
      let transacId = storeRootTier(
        txId,
        tierId,
        irys,
        moovieTierNFTContract,
        signer
      );
      return transacId;
    } else {
      const results = await queryTransaction(node, [prevTx], "text/plain");
      const moovies = results[0]["tags"][2]["value"] + ", " + txId;
      const tags = [
        { name: "Content-Type", value: "text/plain" },
        { name: "application-id", value: "Moovie" },
        { name: "moovies", value: moovies },
        { name: "root-tx", value: rootTx },
        { name: "prev-tx", value: prevTx },
        // Defining UDL
        {
          name: "License",
          value: "yRj4a5KMctX_uOmKWCFJIjmY8DeJcusVk6-HzLiM_t8",
        },
        { name: "License-Fee", value: "One-Time-" + tierPrice },
        { name: "Currency", value: "MATIC" },
        {
          name: "Payment-Address",
          value: tierCreator,
        },
      ];
      const tx = await irys.upload("", { tags });
      await moovieTierNFTContract
        .connect(signer)
        .changeTransactionIds(tierId, tx.id, rootTx);

      return tx.id;
    }
  } catch (error) {
    console.log("Unable to find root. Creating a new root...");
    let transacId = storeRootTier(
      txId,
      tierId,
      irys,
      moovieTierNFTContract,
      signer
    );
    return transacId;
  }
};
