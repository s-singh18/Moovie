import { WebIrys } from "@irys/sdk";

const getWebIrys = async ({ token }) => {
  // Ethers5 provider
  await window.ethereum.enable();
  const provider = new providers.Web3Provider(window.ethereum);

  const url = "https://devnet.irys.xyz";
  const token = token;

  // Create a wallet object
  const wallet = { name: "ethersv5", provider: provider };
  // Use the wallet object
  const webIrys = new WebIrys({ url, token, wallet });
  await webIrys.ready();

  return webIrys;
};
