import Web3 from "web3";
import dotenv from "dotenv";
import { send } from "./src/discord/webhook/discord.js";
import fs from "fs";

import InputDataDecoder from "ethereum-input-data-decoder";

import contracts from "./contracts/contracts.js";




dotenv.config();

let wallets_json = fs.readFileSync("./wallets/wallets.json", "utf8");
let wallets = JSON.parse(wallets_json);


let network = "mainnet";

let wss_url = `wss://${network}.infura.io/ws/v3/${process.env.INFURA_PROJECT_ID}`
let https_url = `https://${network}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`


console.log(wss_url)
console.log(https_url)

const web3Http = new Web3(new Web3.providers.HttpProvider(https_url));

const account = wallets['catmaxi.eth'].toLowerCase();
let accounts = {};

accounts[account] = 'catmaxi.eth';

let txHash = '0xc2ea0d12dd1cd34074a00d3f5fa6b5dccee8dd8ff302c29b7650e270534ae303'
let tx = await web3Http.eth.getTransaction(txHash)
console.log(tx)


// const uni_v2_decoder = new InputDataDecoder(contracts.uniswap_v2.abi);

// const uni_v3_decoder = new InputDataDecoder(contracts.uniswap_v3.abi);

const result = contracts.uniswap_v2.decoder.decodeData("0xfb3bdb4100000000000000000000000000000000000000000000001b1ae4d6e2ef5000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000369c8db326a73d7860f8c58403ae552f3fa95ea600000000000000000000000000000b7abc627050305adf14a3d9e400000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000001f7219c3a7319bb0adf1face8a6dbc40cc59839b");


console.log(result)
const result2 = contracts.uniswap_v2.decoder.decodeData("0x791ac94700000000000000000000000000000000000000000000000480d5b39fe1b10a000000000000000000000000000000000000000000000000001280f2ec8e80d0fe00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000369c8db326a73d7860f8c58403ae552f3fa95ea60000000000000000000000000000000000000000000000000000000061930db10000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c50ef449171a51fbeafd7c562b064b6471c36caa000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2");
console.log(result2)

let link_to_trade = `https://app.uniswap.org/#/swap?outputCurrency=0x${result2.inputs[2][1]}`

console.log(link_to_trade)
// link_to_trade = `https://uniswap.info/trade/${result.args.fromToken.toLowerCase()}_${result.args.toToken.toLowerCase()}`
// console.log(link_to_trade)