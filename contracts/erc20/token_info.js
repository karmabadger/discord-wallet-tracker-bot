import abi from "./abi.js";

const getTokenInfo = async (web3Provider, tokenAddress) => {
  const tokenInst = new web3Provider.eth.Contract(abi, tokenAddress);

  const tokenName = await tokenInst.methods.name().call();
  const tokenSymbol = await tokenInst.methods.symbol().call();
  const tokenDecimals = await tokenInst.methods.decimals().call();

  let token_info = {
    name: tokenName,
    symbol: tokenSymbol,
    decimals: tokenDecimals,
    buy_link: `https://app.uniswap.org/#/swap?outputCurrency=0x${tokenAddress}`,
    sell_link: `https://app.uniswap.org/#/swap?inputCurrency=0x${tokenAddress}`,
    dextool_link: `https://dextool.com/trade/${tokenAddress}`,
  };

  return token_info;
};

export default getTokenInfo;
