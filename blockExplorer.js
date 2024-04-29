
// blockExplorer.js
const Web3 = require('web3');
const contractABI = require('./CanopyBlock.json');

const web3 = new Web3('https://api.avax-test.network/ext/bc/C/rpc');
const contractAddress = '0x1234567890123456789012345678901234567890';
const canopyBlock = new web3.eth.Contract(contractABI, contractAddress);

async function getBlockDetails(blockNumber) {
    const block = await canopyBlock.methods.blocks(blockNumber).call();
    const transactionCount = await canopyBlock.methods.getBlockTransactionCount(blockNumber).call();

    console.log(`Block ${blockNumber}:`);
    console.log(`Block Hash: ${block.blockHash}`);
    console.log(`Parent Hash: ${block.parentHash}`);
    console.log(`Timestamp: ${block.timestamp}`);
    console.log(`Transactions: ${transactionCount}`);

    for (const transactionHash of block.transactionHashes) {
        const transaction = await canopyBlock.methods.transactions(transactionHash).call();
        console.log(`Transaction ${transactionHash}:`);
        console.log(`From: ${transaction.from}`);
        console.log(`To: ${transaction.to}`);
        console.log(`Value: ${transaction.value}`);
        console.log(`Gas Limit: ${transaction.gasLimit}`);
        console.log(`Gas Price: ${transaction.gasPrice}`);
        console.log(`Nonce: ${transaction.nonce}`);
        console.log(`Data: ${transaction.data}`);
    }
}

async function getLatestBlockNumber() {
    const latestBlockNumber = await canopyBlock.methods.latestBlockNumber().call();
    console.log(`Latest Block Number: ${latestBlockNumber}`);
    return latestBlockNumber;
}

async function getTransactionDetails(transactionHash) {
    const transaction = await canopyBlock.methods.transactions(transactionHash).call();
    console.log(`Transaction ${transactionHash}:`);
    console.log(`From: ${transaction.from}`);
    console.log(`To: ${transaction.to}`);
    console.log(`Value: ${transaction.value}`);
    console.log(`Gas Limit: ${transaction.gasLimit}`);
    console.log(`Gas Price: ${transaction.gasPrice}`);
    console.log(`Nonce: ${transaction.nonce}`);
    console.log(`Data: ${transaction.data}`);
}

async function main() {
    const latestBlockNumber = await getLatestBlockNumber();

    // Get details of the latest block
    await getBlockDetails(latestBlockNumber);

    // Get details of a specific transaction hash
    const transactionHash = '0x1234567890abcdef...'; // Replace with a valid transaction hash
    await getTransactionDetails(transactionHash);
}

main();
