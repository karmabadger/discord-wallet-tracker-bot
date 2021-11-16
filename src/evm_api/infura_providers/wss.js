import Web3 from "web3";
import dotenv_config from "../../../config/dotenv_config.js"

const wss_url = `wss://${process.env.ETH_NETWORK}.infura.io/ws/v3/${process.env.INFURA_PROJECT_ID}`

const web3WSS = new Web3(new Web3.providers.WebsocketProvider(wss_url));

export default web3WSS;

export {wss_url};