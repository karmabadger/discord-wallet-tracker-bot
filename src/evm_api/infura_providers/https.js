import Web3 from "web3";
import dotenv_config from "../../../config/dotenv_config.js"

let https_url = `https://${process.env.ETH_NETWORK}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`

const web3Http = new Web3(new Web3.providers.HttpProvider(https_url));

export default web3Http;

export {https_url};
