# arbitrum-stylus-testing

## Quickstart Documentation

https://docs.arbitrum.io/stylus/quickstart

## Setup Nitro Node For Compilation

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
--endpoint=$STYLUS_RPC_URL \
--private-key=$devTestnetPrivateKey
``` 