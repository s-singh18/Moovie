import getIrys from "./getIrys";

const fundNode = async ({ fundAmount }) => {
  try {
    const irys = await getIrys();
    const fundTx = await irys.fund(
      irys.utils.toAtomic(parseInt(`${fundAmount}`))
    );
    console.log(
      `Successfully funded ${irys.utils.fromAtomic(fundTx.quantity)} ${
        irys.token
      }`
    );
    return fundTx;
  } catch (e) {
    console.log("Error uploading data ", e);
  }
};

export default fundNode;
