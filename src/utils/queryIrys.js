import Query from "@irys/query";

import { currentIrysNode } from "./constants";

const queryIrys = async () => {
  try {
    const myQuery = new Query({ url: `${currentIrysNode}/graphql` });
    const results = await myQuery
      .search("irys:transactions")
      .ids(["ABSDFSEFWFDSFa6969669"]);
    // .ids(["53lQEqgB0iJXqWjwLly_dvdPUo_eTSrjG3ppxdZPxm8"]);
    // tags([
    //   { name: "Content-Type", values: ["video/mp4"] },
    //   { name: "application-id", values: ["Moovie"] },
    // ]);
    //   .ids(["5Qn0dZoaLu0UZMLvsUnvgXkauEDurphlD4Brbbtn6As"]);
    //   .tags([
    //     { name: "Content-Type", values: ["video/mp4"] },
    //     { name: "application-id", values: ["Moovie"] },
    //   ])
    //   .limit(20);

    console.log("Query Results:", results);
    return results;
  } catch (e) {
    console.log("Irys query error", e);
  }
};

export default queryIrys;
