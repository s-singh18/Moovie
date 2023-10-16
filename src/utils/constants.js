import { BsCode, BsEmojiSunglasses } from "react-icons/bs";
import { GiCakeSlice, GiGalaxy, GiLipstick } from "react-icons/gi";
import { FaPaw, FaMedal, FaGamepad } from "react-icons/fa";

export const topics = [
  {
    name: "development",
    icon: <BsCode />,
  },
  {
    name: "comedy",
    icon: <BsEmojiSunglasses />,
  },
  {
    name: "gaming",
    icon: <FaGamepad />,
  },
  {
    name: "food",
    icon: <GiCakeSlice />,
  },
  {
    name: "dance",
    icon: <GiGalaxy />,
  },
  {
    name: "beauty",
    icon: <GiLipstick />,
  },
  {
    name: "animals",
    icon: <FaPaw />,
  },
  {
    name: "sports",
    icon: <FaMedal />,
  },
];

export const footerList1 = [
  "About",
  "Newsroom",
  "Store",
  "Contact",
  "Carrers",
  "ByteDance",
  "Creator Directory",
];
export const footerList2 = [
  "TikTik for Good",
  "Advertise",
  "Developers",
  "Transparency",
  "TikTik Rewards",
];
export const footerList3 = [
  "Help",
  "Safety",
  "Terms",
  "Privacy",
  "Creator Portal",
  "Community Guidelines",
];

export const irysNodes = {
  devnet: "https://devnet.irys.xyz",
  node1: "https://node1.irys.xyz",
  node2: "https://node2.irys.xyz",
};

export const currentIrysNode = irysNodes["devnet"];

export const rpcURLs = {
  matic: "https://rpc-mumbai.maticvigil.com",
  arbitrum: "https://arb1.arbitrum.io/rpc",
  avalanche: "https://api.avax.network/ext/bc/C/rpc",
  ethereum: "https://rpc.sepolia.dev",
  fantom: "https://rpcapi.fantom.network",
  near: "https://rpc.mainnet.near.org",
  solana: "https://api.mainnet-beta.solana.com",
};

export const chainAlias = {
  1: "ethereum", // ethereum mainnet
  137: "matic", // polygon mainnet
  42161: "arbitrum", // arbitrum
  11155111: "ethereum", // sepolia
  80001: "matic", // mumbai
  421613: "arbitrum", // arbitrum goerli
};

export const testnetChains = new Set(["11155111", "80001", "421613"]);
export const mainnetChains = new Set(["1", "137", "42161"]);
