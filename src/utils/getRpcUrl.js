/**
 * Helper function to return the RPC URL associated with the given currency.
 * All values are pulled from the .env.local file
 *
 * @param currency The name of the currency used.
 * @returns
 */
const getRpcUrl = (currency) => {
  const RPC_URLS = {
    aptos: process.env.PUBLIC_RPC_APTOS,
    arbitrum: process.env.PUBLIC_RPC_ARBITRUM,
    avalanche: process.env.PUBLIC_RPC_AVALANCHE,
    boba: process.env.PUBLIC_RPC_BOBA,
    chainlink: process.env.PUBLIC_RPC_ETHEREUM, // For Chainlink, return Ethereum RPC
    ethereum: process.env.PUBLIC_RPC_ETHEREUM,
    fantom: process.env.PUBLIC_RPC_FANTOM,
    near: process.env.PUBLIC_RPC_NEAR,
    matic: process.env.PUBLIC_RPC_MATIC,
    solana: process.env.PUBLIC_RPC_SOLANA,
  };

  return RPC_URLS[currency];
};

export default getRpcUrl;
