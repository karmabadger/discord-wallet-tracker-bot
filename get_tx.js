import Web3 from "web3";
import dotenv from "dotenv";
import { send } from "./src/discord/webhook/discord.js";
import fs from "fs";

import InputDataDecoder from "ethereum-input-data-decoder";

import contracts from "./contracts/contracts.js";

import get_uni_v2_swap_info from "./contracts/uniswap-v2/uniswap_v2.js";

import getTokenInfo from "./contracts/erc20/token_info.js";

dotenv.config();

let wallets_json = fs.readFileSync("./wallets/wallets.json", "utf8");
let wallets = JSON.parse(wallets_json);

let network = "mainnet";

let wss_url = `wss://${network}.infura.io/ws/v3/${process.env.INFURA_PROJECT_ID}`;
let https_url = `https://${network}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;

console.log(wss_url);
console.log(https_url);

const web3Http = new Web3(new Web3.providers.HttpProvider(https_url));

const account = wallets["catmaxi.eth"].toLowerCase();
let accounts = {};

accounts[account] = "catmaxi.eth";

let txHash =
  "0xd116d64a977e253078334ad984a7e011c2d6f076213e3164f67fafb42e460796";
let tx = await web3Http.eth.getTransaction(txHash);
console.log(tx);

const decoded = contracts.uniswap_v2.decoder.decodeData(tx.input);
console.log(decoded);
console.log(decoded.inputs[0].toString());

const tokenAddress = decoded.inputs[1][1];

let web3Provider = web3Http
console.log(tokenAddress);
const tokenInst = new web3Http.eth.Contract(contracts.erc20.abi, tokenAddress);

const tokenName = await tokenInst.methods.name().call();
const tokenSymbol = await tokenInst.methods.symbol().call();
const tokenDecimals = await tokenInst.methods.decimals().call();

console.log(tokenName, tokenSymbol, tokenDecimals);

// let swap_info = {}
// swap_info.input_token = decoded.inputs[1][0];
// swap_info.output_token = decoded.inputs[1][1];
// let token_info = await getTokenInfo(web3Provider, swap_info.output_token);

// // let dextools_token_info = await searchToken(swap_info.output_token)
// let factoryInstance = new web3Provider.eth.Contract(
//   contracts.uniswap_v2.factory.abi,
//   contracts.uniswap_v2.factory.address[network]
// );
// let pairAddress = await factoryInstance.methods
//   .getPair("0x"+swap_info.input_token, "0x"+swap_info.output_token)
//   .call();

// console.log(pairAddress);

let swap_info = await get_uni_v2_swap_info(web3Http, tx, network)

console.log(swap_info)
console.log(swap_info.msg)
