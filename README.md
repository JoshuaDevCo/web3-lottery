A learning web3 project with both front-end (with react) and contract part.
Players can join a lottery, and the person who deployed the contract can pick a winner
and transfer all contract balances to that user.

I'm following this tutorial if you are interested too:
[Etherium and Solidity: The Complete Developer's Guire](https://www.udemy.com/share/101rjU3@oLYMhtAXpufYyulbb8C11K8PUiscrdXuOr5Nf_NPSekIlg0jw2iLf0SlNnoWvzbFdA==/)

This project has two separate parts, with two different `package.json` and everything. Make sure to install npm in both of them.

Here are a couple of links that I used during this tutorial:

* [Etherium and Solidity: The Complete Developer's Guire](https://www.udemy.com/share/101rjU3@oLYMhtAXpufYyulbb8C11K8PUiscrdXuOr5Nf_NPSekIlg0jw2iLf0SlNnoWvzbFdA==/)
* [Infure](https://app.infura.io/dashboard)
* [Goerli testnet](https://goerli.etherscan.io/)
* [Mnemonic BIP39](https://iancoleman.io/bip39/)
* [Gas costs yellow paper](https://docs.google.com/spreadsheets/d/1n6mRqkBz3iWcOlRem_mO09GtSKEKrAsfO7Frgx18pNU/edit#gid=0)
* [Remix](https://remix.ethereum.org/)
* [Ethereum Block time](https://etherscan.io/chart/blocktime)
* [Goerli Faucet](https://goerlifaucet.com/)
* [Chainlink Faucet](https://faucets.chain.link/)
* [Ethereum unit converter](https://converter.murkin.me/)

# Contract part

## Install

cd inside the `contract` folder, and run `npm i`.

> Make sure to not run the `npm audit` or any other updates that will break all the dependencies.

Then copy the `.env.example` to `.env` and populate it with your data.

Run `npm run deploy`. copy the contract `abi` and address, use these in `front-end/src/lotter.js`.

# Frontend part

## Getting Started with Create React App
cd inside `front-end` folder and run `npm i`.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

please copy `src/lottery.js.example` to `src/lottery.js` and modify the contents based on what you got from lottery project. (abi, address)

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

