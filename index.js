import watchEtherTransfers from './src/core/eth.js'
import wallets from "./wallets/wallets.js";


const accounts = wallets["addresses_to_names"];


watchEtherTransfers(accounts);