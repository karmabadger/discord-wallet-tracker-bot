import fs from "fs";

let erc20_file = fs.readFileSync("./contracts/erc20/contractABI.json", "utf8");
let erc20_abi_json = JSON.parse(erc20_file);

export default erc20_abi_json;