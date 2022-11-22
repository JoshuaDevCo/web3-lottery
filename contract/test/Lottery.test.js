const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const { abi, evm } = require('../compile');

let lottery;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(abi)
        .deploy({
            data: evm.bytecode.object,
        })
        .send({
            from: accounts[0],
            gas: '1000000',
        });
})

describe('Lottery Contract', () => {
    it('deploys a contract', async () => {
        assert.ok(lottery.options.address);
    });

    it('allows one account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.011', 'ether'),
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0],
        });
        assert.equal(players[0], accounts[0]);
        assert.equal(players.length, 1);
    });

    it('allows multiple account to enter', async () => {
        await Promise.all(accounts.slice(0, 4).map(account => lottery.methods.enter().send({
            from: account,
            value: web3.utils.toWei('0.011', 'ether'),
        })));

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0],
        });

        assert.equal(players.length, 4);
        accounts.slice(0, 4).map(account => {
            assert.ok(players.find(p => p == account));
        });
    });

    it('requires a minimum amount of ether', async() => {
        await assert.rejects(lottery.methods.enter().send({
            from: accounts[0],
            value: 1,
        }));
    });

    it('only manager can call pickWinner', async() => {
        await assert.rejects(
            lottery.methods.pickWinner().send({
                from: accounts[1],
            })
        );
    });

    it('sends money to the winner and resets the player', async() => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether'),
        });
        let contractBalance = await web3.eth.getBalance(lottery.options.address);
        assert.ok(contractBalance > web3.utils.toWei('1.8', 'ether'));

        const playerInitialBalance = await web3.eth.getBalance(accounts[0]);

        await lottery.methods.pickWinner().send({
            from: accounts[0],
        });

        const playerFinalBalance = await web3.eth.getBalance(accounts[0]);

        assert.notEqual(playerFinalBalance, playerInitialBalance);
        assert((playerFinalBalance - playerInitialBalance) > web3.utils.toWei('1.8', 'ether'));

        const players = await lottery.methods.getPlayers().call();
        assert.equal(players.length, 0);

        contractBalance = await web3.eth.getBalance(lottery.options.address);
        assert.equal(contractBalance, 0);
    });
});