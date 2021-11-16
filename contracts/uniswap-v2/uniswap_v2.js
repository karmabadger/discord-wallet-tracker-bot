import getTokenInfo from "../erc20/token_info.js";

import { searchToken } from "../../src/dextools/api.js";

import contracts from "../contracts.js";

async function get_uni_v2_swap_info(web3Provider, tx, chain) {
  const decoded = await contracts.uniswap_v2.decoder.decodeData(tx.input);

  let swap_info = {};
  if (decoded.method === "swapETHForExactTokens") {
    swap_info.input_token = "0x" + decoded.inputs[1][0];
    swap_info.output_token = "0x" + decoded.inputs[1][1];
    let token_info = await getTokenInfo(web3Provider, swap_info.output_token);

    // let dextools_token_info = await searchToken(swap_info.output_token)
    console.log(
      "factory:", contracts.uniswap_v2.factory.address[chain])
    let factoryInstance = new web3Provider.eth.Contract(
      contracts.uniswap_v2.factory.abi,
      contracts.uniswap_v2.factory.address[chain]
    );
    console.log("factoryInstance:", factoryInstance.methods)
    let pairAddress = await factoryInstance.methods
      .getPair(swap_info.input_token, swap_info.output_token)
      .call();

    let chainChoice = (chain == "mainnet")? "": chain + "."; 

    swap_info.msg = `swapped ETH for exact tokens ${token_info.name} (${token_info.symbol})
tx: https://${chainChoice}etherscan.io/tx/${tx.hash}

Token Info:
contract: https://${chainChoice}etherscan.io/token/${swap_info.output_token}
pair address: ${pairAddress}
dextools: https://www.dextools.io/app/ether/pair-explorer/${pairAddress}
uniswap: https://app.uniswap.org/#/swap?outputCurrency=${swap_info.output_token}
uniswap info: https://v2.info.uniswap.org/token/${swap_info.output_token}
uniswap pair info: https://v2.info.uniswap.org/pair/${pairAddress}`;
  } else if (decoded.method == "swapExactETHForTokens") {
    swap_info.input_token = "0x" + decoded.inputs[1][0];
    swap_info.output_token = "0x" + decoded.inputs[1][1];
    let token_info = await getTokenInfo(web3Provider, swap_info.output_token);

    // let dextools_token_info = await searchToken(swap_info.output_token)
    console.log(
      "factory:", contracts.uniswap_v2.factory.address[chain])
    let factoryInstance = new web3Provider.eth.Contract(
      contracts.uniswap_v2.factory.abi,
      contracts.uniswap_v2.factory.address[chain]
    );
    console.log("factoryInstance:", factoryInstance.methods)
    let pairAddress = await factoryInstance.methods
      .getPair(swap_info.input_token, swap_info.output_token)
      .call();

    let chainChoice = (chain == "mainnet")? "": chain + "."; 

    swap_info.msg = `swapped ETH for exact tokens ${token_info.name} (${token_info.symbol})
tx: https://${chainChoice}etherscan.io/tx/${tx.hash}

Token Info:
contract: https://${chainChoice}etherscan.io/token/${swap_info.output_token}
pair address: ${pairAddress}
dextools: https://www.dextools.io/app/ether/pair-explorer/${pairAddress}
uniswap: https://app.uniswap.org/#/swap?outputCurrency=${swap_info.output_token}
uniswap info: https://v2.info.uniswap.org/token/${swap_info.output_token}
uniswap pair info: https://v2.info.uniswap.org/pair/${pairAddress}`;
  } else if (
    decoded.method == "swapExactETHForTokensSupportingFeeOnTransferTokens"
  ) {
    swap_info.input_token = "0x" + decoded.inputs[1][0];
    swap_info.output_token = "0x" + decoded.inputs[1][1];
    let token_info = await getTokenInfo(web3Provider, swap_info.output_token);

    // let dextools_token_info = await searchToken(swap_info.output_token)
    console.log(
      "factory:", contracts.uniswap_v2.factory.address[chain])
    let factoryInstance = new web3Provider.eth.Contract(
      contracts.uniswap_v2.factory.abi,
      contracts.uniswap_v2.factory.address[chain]
    );
    console.log("factoryInstance:", factoryInstance.methods)
    let pairAddress = await factoryInstance.methods
      .getPair(swap_info.input_token, swap_info.output_token)
      .call();

    let chainChoice = (chain == "mainnet")? "": chain + "."; 

    swap_info.msg = `swapped ETH for exact tokens ${token_info.name} (${token_info.symbol})
tx: https://${chainChoice}etherscan.io/tx/${tx.hash}

Token Info:
contract: https://${chainChoice}etherscan.io/token/${swap_info.output_token}
pair address: ${pairAddress}
dextools: https://www.dextools.io/app/ether/pair-explorer/${pairAddress}
uniswap: https://app.uniswap.org/#/swap?outputCurrency=${swap_info.output_token}
uniswap info: https://v2.info.uniswap.org/token/${swap_info.output_token}
uniswap pair info: https://v2.info.uniswap.org/pair/${pairAddress}`;

  } else if (decoded.method == "swapExactTokensForETH") {
    swap_info.input_token = "0x" + decoded.inputs[2][0];
    swap_info.output_token = "0x" + decoded.inputs[2][1];
    let token_info = await getTokenInfo(web3Provider, swap_info.input_token);

    let factoryInstance = new web3Provider.eth.Contract(
      contracts.uniswap_v2.factory.abi,
      contracts.uniswap_v2.factory.address[chain]
    );
    let pairAddress = await factoryInstance.methods
      .getPair(swap_info.input_token, swap_info.output_token)
      .call();

    let chainChoice = (chain == "mainnet")? "": chain + "."; 

    swap_info.msg = `SOLD exact tokens ${token_info.name} (${token_info.symbol}) for ETH
tx: https://${chainChoice}etherscan.io/tx/${tx.hash}

Token Info:
contract: https://${chainChoice}etherscan.io/token/${swap_info.input_token}
pair address: ${pairAddress}
dextools: https://dextools.io/token/${pairAddress}
uniswap: https://app.uniswap.org/#/swap?outputCurrency=${swap_info.input_token}
uniswap info: https://v2.info.uniswap.org/token/${swap_info.input_token}
uniswap pair info: https://v2.info.uniswap.org/pair/${pairAddress}`;
  } else if (
    decoded.method == "swapExactTokensForETHSupportingFeeOnTransferTokens"
  ) {
    swap_info.input_token = "0x" + decoded.inputs[2][0];
    swap_info.output_token = "0x" + decoded.inputs[2][1];
    let token_info = await getTokenInfo(web3Provider, swap_info.input_token);

    let factoryInstance = new web3Provider.eth.Contract(
      contracts.uniswap_v2.factory.abi,
      contracts.uniswap_v2.factory.address[chain]
    );
    let pairAddress = await factoryInstance.methods
      .getPair(swap_info.input_token, swap_info.output_token)
      .call();

    let chainChoice = (chain == "mainnet")? "": chain + "."; 

    swap_info.msg = `SOLD exact tokens ${token_info.name} (${token_info.symbol}) for ETH
tx: https://${chainChoice}etherscan.io/tx/${tx.hash}

Token Info:
contract: https://${chainChoice}etherscan.io/token/${swap_info.input_token}
pair address: ${pairAddress}
dextools: https://dextools.io/token/${pairAddress}
uniswap: https://app.uniswap.org/#/swap?outputCurrency=${swap_info.input_token}
uniswap info: https://v2.info.uniswap.org/token/${swap_info.input_token}
uniswap pair info: https://v2.info.uniswap.org/pair/${pairAddress}`;
  } else if (decoded.method == "swapExactTokensForTokens") {
    swap_info.input_token = "0x" + decoded.inputs[2][0];
    swap_info.output_token = "0x" + decoded.inputs[2][1];
    let token_info1 = await getTokenInfo(web3Provider, swap_info.input_token);
    let factoryInstance = new web3Provider.eth.Contract(
      contracts.uniswap_v2.factory.abi,
      contracts.uniswap_v2.factory.address[chain]
    );
    let pairAddress = await factoryInstance.methods
      .getPair(swap_info.input_token, swap_info.output_token)
      .call();

    let token_info2 = await getTokenInfo(web3Provider, swap_info.output_token);
    // let dextools_token_info2 = await searchToken(swap_info.output_token);

    let chainChoice = (chain == "mainnet")? "": chain + "."; 
    
    swap_info.msg = `SOLD exact tokens ${token_info1.name} (${token_info1.symbol}) for ${token_info2.name} (${token_info2.symbol})
tx: https://${chainChoice}etherscan.io/tx/${tx.hash}

Pair Info:
pair address: ${pairAddress}
dextools: https://dextools.io/token/${pairAddress}
uniswap: https://app.uniswap.org/#/swap?inputCurrency=${swap_info.input_token}&outputCurrency=${swap_info.output_token}
uniswap pair info: https://v2.info.uniswap.org/pair/${pairAddress}

Token ${token_info1.name} (${token_info1.symbol}) Info:
contract: https://${chainChoice}etherscan.io/token/${swap_info.input_token}
uniswap: https://app.uniswap.org/#/swap?outputCurrency=${swap_info.input_token}
uniswap info: https://uniswap.info/trade/${swap_info.input_token}_${swap_info.output_token}

Token ${token_info2.name} (${token_info2.symbol}) Info:
contract: https://${chainChoice}etherscan.io/token/${swap_info.output_token}
uniswap: https://app.uniswap.org/#/swap?outputCurrency=${swap_info.output_token}
uniswap info: https://uniswap.info/trade/${swap_info.input_token}_${swap_info.output_token}`;
  } else if (
    decoded.method == "swapExactTokensForTokensSupportingFeeOnTransferTokens"
  ) {
    swap_info.input_token = "0x" + decoded.inputs[2][0];
    swap_info.output_token = "0x" + decoded.inputs[2][1];
    let token_info1 = await getTokenInfo(web3Provider, swap_info.input_token);
    let factoryInstance = new web3Provider.eth.Contract(
      contracts.uniswap_v2.factory.abi,
      contracts.uniswap_v2.factory.address[chain]
    );
    let pairAddress = await factoryInstance.methods
      .getPair(swap_info.input_token, swap_info.output_token)
      .call();

    let token_info2 = await getTokenInfo(web3Provider, swap_info.output_token);
    // let dextools_token_info2 = await searchToken(swap_info.output_token);

    let chainChoice = (chain == "mainnet")? "": chain + "."; 
    
    swap_info.msg = `SOLD exact tokens ${token_info1.name} (${token_info1.symbol}) for ${token_info2.name} (${token_info2.symbol})
tx: https://${chainChoice}etherscan.io/tx/${tx.hash}

Pair Info:
pair address: ${pairAddress}
dextools: https://dextools.io/token/${pairAddress}
uniswap: https://app.uniswap.org/#/swap?inputCurrency=${swap_info.input_token}&outputCurrency=${swap_info.output_token}
uniswap pair info: https://v2.info.uniswap.org/pair/${pairAddress}

Token ${token_info1.name} (${token_info1.symbol}) Info:
contract: https://${chainChoice}etherscan.io/token/${swap_info.input_token}
uniswap: https://app.uniswap.org/#/swap?outputCurrency=${swap_info.input_token}
uniswap info: https://uniswap.info/trade/${swap_info.input_token}_${swap_info.output_token}

Token ${token_info2.name} (${token_info2.symbol}) Info:
contract: https://${chainChoice}etherscan.io/token/${swap_info.output_token}
uniswap: https://app.uniswap.org/#/swap?outputCurrency=${swap_info.output_token}
uniswap info: https://uniswap.info/trade/${swap_info.input_token}_${swap_info.output_token}`;
  } else if (decoded.method == "swapTokensForExactETH") {
    swap_info.input_token = "0x" + decoded.inputs[2][0];
    swap_info.output_token = "0x" + decoded.inputs[2][1];
    let token_info = await getTokenInfo(web3Provider, swap_info.input_token);

    let factoryInstance = new web3Provider.eth.Contract(
      contracts.uniswap_v2.factory.abi,
      contracts.uniswap_v2.factory.address[chain]
    );
    let pairAddress = await factoryInstance.methods
      .getPair(swap_info.input_token, swap_info.output_token)
      .call();

    let chainChoice = (chain == "mainnet")? "": chain + "."; 

    swap_info.msg = `SOLD exact tokens ${token_info.name} (${token_info.symbol}) for ETH
tx: https://${chainChoice}etherscan.io/tx/${tx.hash}

Token Info:
contract: https://${chainChoice}etherscan.io/token/${swap_info.input_token}
pair address: ${pairAddress}
dextools: https://dextools.io/token/${pairAddress}
uniswap: https://app.uniswap.org/#/swap?outputCurrency=${swap_info.input_token}
uniswap info: https://v2.info.uniswap.org/token/${swap_info.input_token}
uniswap pair info: https://v2.info.uniswap.org/pair/${pairAddress}`;

  } else if (decoded.method == "swapTokensForExactTokens") {
    swap_info.input_token = "0x" + decoded.inputs[2][0];
    swap_info.output_token = "0x" + decoded.inputs[2][1];
    let token_info1 = await getTokenInfo(web3Provider, swap_info.input_token);
    let factoryInstance = new web3Provider.eth.Contract(
      contracts.uniswap_v2.factory.abi,
      contracts.uniswap_v2.factory.address[chain]
    );
    let pairAddress = await factoryInstance.methods
      .getPair(swap_info.input_token, swap_info.output_token)
      .call();

    let token_info2 = await getTokenInfo(web3Provider, swap_info.output_token);
    // let dextools_token_info2 = await searchToken(swap_info.output_token);

    let chainChoice = (chain == "mainnet")? "": chain + "."; 
    
    swap_info.msg = `SOLD exact tokens ${token_info1.name} (${token_info1.symbol}) for ${token_info2.name} (${token_info2.symbol})
tx: https://${chainChoice}etherscan.io/tx/${tx.hash}

Pair Info:
pair address: ${pairAddress}
dextools: https://dextools.io/token/${pairAddress}
uniswap: https://app.uniswap.org/#/swap?inputCurrency=${swap_info.input_token}&outputCurrency=${swap_info.output_token}
uniswap pair info: https://v2.info.uniswap.org/pair/${pairAddress}

Token ${token_info1.name} (${token_info1.symbol}) Info:
contract: https://${chainChoice}etherscan.io/token/${swap_info.input_token}
uniswap: https://app.uniswap.org/#/swap?outputCurrency=${swap_info.input_token}
uniswap info: https://uniswap.info/trade/${swap_info.input_token}_${swap_info.output_token}

Token ${token_info2.name} (${token_info2.symbol}) Info:
contract: https://${chainChoice}etherscan.io/token/${swap_info.output_token}
uniswap: https://app.uniswap.org/#/swap?outputCurrency=${swap_info.output_token}
uniswap info: https://uniswap.info/trade/${swap_info.input_token}_${swap_info.output_token}`;
  }

  return swap_info;
}

export default get_uni_v2_swap_info;
