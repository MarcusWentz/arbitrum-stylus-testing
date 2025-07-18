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
--private-key=$devTestnetPrivateKey \
--no-verify
``` 

Note: `cargo stylus deploy` uses flag `--no-verify` to skip using Docker for reproducible builds to avoid this error:

https://github.com/OffchainLabs/nitro-devnode/issues/15

## Verify Rust contract WASM binary on Etherscan

Guide:

https://docs.arbitrum.io/stylus/how-tos/verifying-contracts-arbiscan

Rust contract to compare compiled WASM binary with:

https://github.com/MarcusWentz/arbitrum-stylus-testing/blob/main/src/lib.rs