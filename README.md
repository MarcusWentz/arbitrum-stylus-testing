# arbitrum-stylus-testing

## Quickstart Documentation

https://docs.arbitrum.io/stylus/quickstart

## Setup Nitro Node For Compilation

Note: make sure you have docker installed before running the Nitro Node.

Install your devnode
```
git clone https://github.com/OffchainLabs/nitro-devnode.git
cd nitro-devnode
```
Launch your devnode
```
./run-dev-node.sh
```

## Compile

```
cargo stylus check
```

## Deploy

```
cargo stylus deploy \
--endpoint=$arbitrumSepoliaHTTPS \
--private-key=$devTestnetPrivateKey
``` 