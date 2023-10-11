import getIrys from "./getIrys";

const fundNode = async ({ fundAmount }) => {
  const webIrys = await getIrys();
  try {
    const fundTx = await webIrys.fund(
      webIrys.utils.toAtomic(parseInt(fundAmount))
    );
    console.log(
      `Successfully funded ${webIrys.utils.fromAtomic(fundTx.quantity)} ${
        webIrys.token
      }`
    );
  } catch (e) {
    console.log("Error uploading data ", e);
  }
};

export default fundNode;
