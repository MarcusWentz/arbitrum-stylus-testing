const ethers = require("ethers") // npm i ethers@5.7.2 https://github.com/smartcontractkit/full-blockchain-solidity-course-js/discussions/5139#discussioncomment-5444517

const rpcURL = process.env.arbitrumSepoliaHTTPS // Your RPC URL goes here
// const rpcURL = process.env.sepoliaInfuraWSS // Your RPC URL goes here

// const rpcURL = "http://localhost:8545"// Your RPC URL goes here

// const provider = new ethers.providers.WebSocketProvider("wss://ws.test.taiko.xyz")
// const contractAddress = '0x090b750b9B5251828E16360Fd69100dc4c674e71'

const provider = new ethers.providers.JsonRpcProvider(rpcURL)
const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);

// Contract to generate ABI from to interact with Rust contract:
// // SPDX-License-Identifier: MIT
// pragma solidity 0.8.30;
//
// interface Counter {
//     function number() external view returns (uint256);
//     function setNumber(uint256 newNumber) external;
//     function sqrt() external view returns (uint256);
//     function exp() external view returns (uint256);
//     function ln() external view returns (uint256);
//     function log10() external view returns (uint256);
//     function log2() external view returns (uint256);
// }

const contractAddress = '0x5ece667d03f29695937f23178abad9b89434d630'
const contractABI = [{"inputs":[],"name":"exp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ln","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"log10","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"log2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newNumber","type":"uint256"}],"name":"setNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sqrt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
// const contractDeployed = new web3.eth.Contract(contractABI, contractAddress)

const contractDeployed = new ethers.Contract(contractAddress, contractABI, signer);

let arbitrum_sepolia_chain_id = 421614;

createAndSendTx()

async function getStoredData() {  
  const storedData = await contractDeployed.number()
  console.log("storedData: "+ storedData)
  const squareRoot = await contractDeployed.sqrt()
  console.log("squareRoot: "+ squareRoot)
  const ln = await contractDeployed.ln()
  console.log("ln: "+ ln)
  const log10 = await contractDeployed.log10()
  console.log("log10: "+ log10)
  const log2 = await contractDeployed.log2()
  console.log("log2: "+ log2)
  const exp = await contractDeployed.exp()
  console.log("exp: "+ exp)
}

async function createAndSendTx() {

  const connectedNetworkObject = await provider.getNetwork();
  const chainIdConnected = connectedNetworkObject.chainId;
  console.log("chainIdConnected: "+ chainIdConnected)

  if(chainIdConnected != arbitrum_sepolia_chain_id){
    console.log("RPC endpoint not connected to Arbitrum Sepolia (chainId: " + arbitrum_sepolia_chain_id + ").");
    console.log("Switch to Arbitrum Sepolia then try again.");
    return;
  }

  await getStoredData();

  // const unixTime = Date.now();

  // console.log("CURRENT UNIX TIME: " + unixTime);

  // //Simple contract transaction.
  // const txSigned = await contractDeployed.setNumber(unixTime); //Will compute the gas limit opcodes automatically and get the oracle gas price per gas unit.

  // //Tune transaction with custom arguments: https://github.com/ethers-io/ethers.js/issues/40#issuecomment-841749793.
  // // const txSigned = await contractDeployed.
  // //   set(
  // //     unixTime,
  // //   {
  // //    value: 0,                                          
  // //    gasPrice: ethers.utils.parseUnits('200', 'gwei'),  
  // //   }
  // // );

  // // Raw transaction (harder to use since the contract calls will automatically calculate the gas limit for you.)

  // // const txCount = await provider.getTransactionCount(signer.address); 

  // // const callDataObject = await contractDeployed.populateTransaction.set(unixTIme);
  // // const txData = callDataObject.data;

  // // const txSigned = await signer.sendTransaction({
  // //   chainId: chainIdConnected,
  // //   to: contractAddress,
  // //   nonce:    txCount,
  // //   gasLimit: ethers.utils.hexlify(210000), // Raise the gas limit to a much higher amount
  // //   gasPrice: ethers.utils.hexlify(10000000000),
  // //   data: txData
  // // });

  // console.log("Tx submitted: " + txSigned.hash)

}

// contractDeployed.on("setEvent", (eventDetected) => {

//   console.log("EVENT DETECTED!")

//   console.log(eventDetected)

//   console.log("NEW STATE VALUE: ")

//   getStoredData()

// });