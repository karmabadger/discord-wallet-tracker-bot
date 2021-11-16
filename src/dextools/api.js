import fetch from "node-fetch";


const searchToken = async (tokenAddress) => {
    const res = await fetch(`https://www.dextools.io/chain-ethereum/api/pair/search?s=${tokenAddress}`)
    return res
}

export { searchToken }