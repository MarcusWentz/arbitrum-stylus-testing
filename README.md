# arbitrum-stylus-testing

## Quickstart Documentation

https://docs.arbitrum.io/stylus/quickstart

## Setup Nitro Node For Compilation

Note: make sure you have docker installed before running the Nitro Node.

Install your devnode
```shell
git clone https://github.com/OffchainLabs/nitro-devnode.git
cd nitro-devnode
```
Launch your devnode
```shell
./run-dev-node.sh
```

Note: the Docker file for the Nitro node is located in folder `stylus-dev` for reference. 

## Compile

```shell
cargo stylus check
```

## Deploy

```shell
cargo stylus deploy \
--endpoint=$arbitrumSepoliaHTTPS \
--private-key=$PRIVATE_KEY \
--no-verify
``` 

Note: `cargo stylus deploy` uses flag `--no-verify` to skip using Docker for reproducible builds to avoid this error:

https://github.com/OffchainLabs/nitro-devnode/issues/15

## Test Rust WASM contract with ethers.js

Read and write to the Rust contract Solidity ABI interface:

```shell
cd javascript
node testRustContract.js
```

## Verify Rust contract WASM binary on Etherscan

Guide:

https://docs.arbitrum.io/stylus/how-tos/verifying-contracts-arbiscan

Rust contract to compare compiled WASM binary with:

https://github.com/MarcusWentz/arbitrum-stylus-testing/blob/main/src/lib.rs

Etherscan API Stylus Verification:

https://docs.etherscan.io/etherscan-v2/api-endpoints/contracts#verify-stylus-source-code

### Verify after deployment

```shell
curl -X POST "https://api.etherscan.io/v2/api?chainid=421614&module=contract&action=verifysourcecode&apikey=${arbiscanApiKey}" \
-d "codeformat=stylus" \
-d "sourceCode=${GITHUB_PROJECT_URL_LINK}" \
-d "contractaddress=${CONTRACT_ADDRESS}" \
-d "contractname=${CONTRACT_NAME}" \
-d "compilerversion=stylus:0.6.1" \
-d "licenseType=3"
```

which should return a verification job ID to check verification status.

### Check Verification Status

The field `guid` should be the return job ID value from the verification job request.

```shell
curl "https://api.etherscan.io/v2/api?\
chainid=421614&\
module=contract&\
action=checkverifystatus&\
guid=zddsxmdisghjzbt9qstscfrb2yi1djgjmbjfmaqrmkns1grqak&\
apikey=${arbiscanApiKey}"
```