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

// export const storeRootTier = async (txId, irys) => {
//   const tags = [
//     { name: "Content-Type", value: "text/plain" },
//     { name: "application-id", value: "Moovie" },
//     { name: "moovies", value: txId },
//   ];
//   const tx = await irys.upload("", { tags });
//   // Set root-Tx in smart contract

//   return tx.id;
// };

// export const storeUpdateTier = async (txId, tier, irys, node) => {
//   try {
//     // Get root-tx from smart contract
//     // Get prev-tx from smart contract

//     const results = await queryTransaction(node, [prevTx], "text/plain");
//     const moovies = results[0]["tags"][2]["value"] + ", " + txId;

//     const tags = [
//       { name: "Content-Type", value: "text/plain" },
//       { name: "application-id", value: "Moovie" },
//       { name: "moovies", value: moovies },
//       { name: "root-tx", value: rootTx },
//       { name: "prev-tx", value: prevTx },
//     ];

//     const tx = await irys.upload("", { tags });

//     // Set prev-Tx in smart contract
//     return tx.id;
//   } catch (error) {
//     console.log("Unable to find root. Creating a new root...");
//     storeRoot(txId, irys);
//   }
// };
