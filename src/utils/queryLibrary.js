import Query from "@irys/query";

import { currentIrysNode } from "./constants";

export const queryFeed = async (node, rootTx, prevTx) => {
  try {
    const myQuery = new Query({ url: `${node}/graphql` });

    console.log("Root-tx: ", rootTx);
    console.log("Prev-tx: ", prevTx);

    const txResults = await myQuery.search("irys:transactions").ids([prevTx]);
    // .tags([
    //   { name: "Content-Type", values: ["text/plain"] },
    //   { name: "application-id", values: ["Moovie"] },
    //   { name: "root-tx", values: [rootTx] },
    //   { name: "prev-tx", values: [prevTx] },
    // ]);

    console.log("Tx Results", txResults);
    const txList = txResults[0]["tags"][2]["value"].split(", ");

    const results = await queryTransaction(node, txList, "video/mp4");

    return results.reverse();
  } catch (e) {
    console.log("Feed query error", e);
    return [];
  }
};

export const queryTransaction = async (node, transactions, contentType) => {
  try {
    const myQuery = new Query({ url: `${node}/graphql` });
    const results = await myQuery
      .search("irys:transactions")
      .ids(transactions)
      .tags([
        { name: "Content-Type", values: [contentType] },
        { name: "application-id", values: ["Moovie"] },
      ]);

    return results;
  } catch (e) {
    console.log("User query error", e);
  }
};

export const queryUserFeed = async (node, user, rootTx, prevTx) => {
  try {
    const myQuery = new Query({ url: `${node}/graphql` });
    let userResults = [];
    const results = await queryFeed(node, rootTx, prevTx);
    results.map((result) => {
      if (result.address === user.toLowerCase()) {
        userResults.push(result);
      }
    });

    return userResults;
  } catch (e) {
    console.log("User query error", e);
  }
};
