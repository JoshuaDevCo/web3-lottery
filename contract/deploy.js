const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');
const { config } = require('dotenv');

config();

const provider = new HDWalletProvider(
  process.env.ACCOUNT_MNEMONIC,
  process.env.NETWORK_URL,
);
const web3 = new Web3(provider);

const deploy = async () => {
  const [account,] = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', account);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: '1000000', from: account });

  console.log(JSON.stringify(abi));
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
