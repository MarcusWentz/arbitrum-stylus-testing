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
Modify the Docker file in folder `???` to be
```
ARG NITRO_NODE_VERSION=v3.6.4-28199cd
FROM offchainlabs/nitro-node:$NITRO_NODE_VERSION AS nitro-node-stylus-dev
USER root
RUN apt-get update && \
    apt-get install -y git python3 make g++ curl pkg-config libssl-dev
# Install Rust with nightly toolchain that supports edition2024
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain nightly
ENV PATH="/root/.cargo/bin:${PATH}"
# Add required targets separately
RUN rustup target add x86_64-unknown-linux-gnu wasm32-unknown-unknown wasm32-wasip1
# Install Foundry
RUN curl -L https://foundry.paradigm.xyz | bash && . ~/.bashrc && ~/.foundry/bin/foundryup
ENV PATH="/root/.foundry/bin:${PATH}"
# Install older version of cargo-stylus that doesn't require edition2024
RUN cargo install --force cargo-stylus --version 0.5.7
```
Use the Docker file to build the image for your platform
```shell
docker build --platform linux/arm64 stylus-dev
```
Launch your devnode
```shell
./run-dev-node.sh
```

## Compile

```shell
cargo stylus check
```

## Deploy

```shell
cargo stylus deploy \
--endpoint=$arbitrumSepoliaHTTPS \
--private-key=$devTestnetPrivateKey
``` 