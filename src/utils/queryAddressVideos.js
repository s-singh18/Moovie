import Query from "@irys/query";

import { currentIrysNode } from "./constants";

const queryAddressVideos = async ({ address }) => {
  try {
    const myQuery = new Query({ url: `${currentIrysNode}/graphql` });
    const results = await myQuery
      .search("irys:transactions")
      .from(address.toLowerCase())
      .tags([
        { name: "Content-Type", values: ["video/mp4"] },
        { name: "application-id", values: ["Moovie"] },
      ])
      .limit(20);

    console.log("Query Results:", results);
    return results;
  } catch (e) {
    console.log("Irys query address videos error", e);
  }
};

export default queryAddressVideos;
