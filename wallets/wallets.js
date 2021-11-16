import fs from "fs";


let wallets_json_file = fs.readFileSync("./wallets/wallets.json", "utf8");
let wallets_json = JSON.parse(wallets_json_file);

let addresses_to_names = {};
let wallets_json_lower = {};
for (let wallet_name in wallets_json) {
    let wallet_lower = wallets_json[wallet_name].toLowerCase();

    wallets_json_lower[wallet_name] = wallet_lower;
    addresses_to_names[wallet_lower] = wallet_name;
}

const wallets = {
    names_to_addresses: wallets_json_lower,
    addresses_to_names: addresses_to_names,
}


export default wallets;