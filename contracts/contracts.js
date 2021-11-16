import fs from "fs";

import InputDataDecoder from "ethereum-input-data-decoder";


let uni_v2_file = fs.readFileSync("./contracts/uniswap-v2/contractABI.json", "utf8");
let uni_v2_abi_json = JSON.parse(uni_v2_file);

let uni_v3_file = fs.readFileSync("./contracts/uniswap-v3/contractABI.json", "utf8");
let uni_v3_abi_json = JSON.parse(uni_v3_file);


const contracts = {
    uniswap_v2: {
        address: {
            mainnet: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'.toLowerCase(),
            rinkeby: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'.toLowerCase(),
        },
        abi: uni_v2_abi_json,
        decoder: new InputDataDecoder(uni_v2_abi_json)
    },
    uniswap_v3: {
        address: {
            mainnet:'0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'.toLowerCase(),
            rinkeby:'0xe592427a0aece92de3edee1f18e0157c05861564'.toLowerCase(),
        },
        abi: uni_v3_abi_json,
        decoder: new InputDataDecoder(uni_v3_abi_json)
    },
    weth: {
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'.toLowerCase(),
    }
}


export default contracts;