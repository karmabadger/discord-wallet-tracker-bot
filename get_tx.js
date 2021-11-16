import Web3 from "web3";
import dotenv from "dotenv";
import { send } from "./src/discord/webhook/discord.js";
import fs from "fs";




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

let txHash = '0x89fc80d480ee3683c5d12bb268c588ebe17b3464279c2e48b4425b84c3618a01'
let tx = await web3Http.eth.getTransaction(txHash)
console.log(tx)