const {ethers} = require("ethers");


async function connectWallet(){
    if (window.ethereum) {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        });

        setAccounts(accounts);
    }
}