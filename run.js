import Web3 from "web3";
import { send } from "./src/discord/webhook/discord.js";


import dotenv_config from "./config/dotenv_config.js";

import web3Http from "./src/evm_api/infura_providers/https.js";
import web3WSS from "./src/evm_api/infura_providers/wss.js";

import wallets from "./wallets/wallets.js"

// let wss_url = `wss://${process.env.ETH_NETWORK}.infura.io/ws/v3/${process.env.INFURA_PROJECT_ID}`
// let https_url = `https://${process.env.ETH_NETWORK}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`

// console.log(wss_url)
// console.log(https_url)


// const account = wallets['catmaxi.eth'].toLowerCase();
// let accounts = {};

// accounts[account] = 'catmaxi.eth';


let accounts = wallets['addresses_to_names']


function watchEtherTransfers(accounts) {
  // Instantiate web3 with WebSocket provider
  // const web3 = new Web3(new Web3.providers.WebsocketProvider(wss_url));
  // const web3Http = new Web3(new Web3.providers.HttpProvider(https_url));

  console.log("accounts", accounts)

  // Instantiate subscription object
  const subscription = web3WSS.eth.subscribe('pendingTransactions', (err, result) => {
    if (err) {
      console.log("subscription:", err);

      console.log("result:", result)
      return;
    }
    // console.log("result", result);
  });


  // Subscribe to pending transactions
  subscription.on('data', async (txHash) => {
      try {
        // Instantiate web3 with HttpProvider
        
        

        // console.log("txhash", txHash);
        // Get transaction details
        const tx = await web3Http.eth.getTransaction(txHash)

        // console.log("tx", tx);

        // const valid = validateTransaction(tx)

        // console.log("valid", valid);
        // // If transaction is not valid, simply return
        // if (!valid) return


        if (tx && tx.to){
          if (accounts[tx.from.toLowerCase()]) {
            console.log("tx from catmaxi", tx);
          }

          if (accounts[tx.to.toLowerCase()]) {
            console.log("tx to catmaxi", tx);
          }
        }

        // console.log('Found incoming Ether transaction from ' + process.env.WALLET_FROM + ' to ' + process.env.WALLET_TO);
        // console.log('Transaction value is: ' + process.env.AMOUNT)
        // console.log('Transaction hash is: ' + txHash + '\n')

        // // Initiate transaction confirmation
        // confirmEtherTransaction(txHash)

        // // Unsubscribe from pending transactions.
        // subscription.unsubscribe()
      }
      catch (error) {
        console.log(error)
      }
    })
}
watchEtherTransfers(accounts);
