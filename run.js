import Web3 from "web3";
import { send } from "./src/discord/webhook/discord.js";


import dotenv_config from "./config/dotenv_config.js";

import web3Http from "./src/evm_api/infura_providers/https.js";
import web3WSS from "./src/evm_api/infura_providers/wss.js";

import wallets from "./wallets/wallets.js"

import contracts from "./contracts/contracts.js";

const accounts = wallets['addresses_to_names']


function watchEtherTransfers(accounts) {

  // Instantiate subscription object
  const subscription = web3WSS.eth.subscribe('pendingTransactions', (err, result) => {
    if (err) {
      console.log("subscription:", err);

      console.log("result:", result)
      return;
    }
  });


  // Subscribe to pending transactions
  subscription.on('data', async (txHash) => {
      try {
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

            // if (tx.to.toLowerCase() === ) {
              
            // }
              console.log("tx to catmaxi", tx);
              send(`${accounts[tx.from.toLowerCase()]} sent ${tx.value} to ${accounts[tx.to.toLowerCase()]}`)
            
          }

          if (accounts[tx.to.toLowerCase()]) {
            console.log("tx to catmaxi", tx);
          }
        }

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
