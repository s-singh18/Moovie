import getIrys from "./getIrys";

const getIrysNodeBalance = async ({ irys }) => {
  if (irys === null || irys === undefined) {
    const irys = await getIrys();
  }

  // Get loaded balance in atomic units
  const atomicBalance = await irys.getLoadedBalance();
  console.log(`Node balance (atomic units) = ${atomicBalance}`);

  // Convert balance to standard
  const convertedBalance = irys.utils.fromAtomic(atomicBalance);
  console.log(`Node balance (converted) = ${convertedBalance}`);
  return convertedBalance;
};

export default getIrysNodeBalance;
