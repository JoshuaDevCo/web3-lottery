import React from "react";
import web3 from './web3';
import lottery from './lottery';

class App extends React.Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: '',
  };

  async syncWithBlockchain() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({
      manager,
      players,
      balance,
      value: '',
    });
  }
  
  async componentDidMount() {
    await this.syncWithBlockchain();
  }

  onEnterFormSubmit = async (event) => {
    event.preventDefault();

    this.setState({ message: 'Waiting on transaction success...' });

    // We are just getting the first account and assuming that this
    // is the user account
    const [account,] = await web3.eth.getAccounts();

    await lottery.methods.enter().send({
      from: account,
      value: web3.utils.toWei(this.state.value, 'ether'),
    });
    this.setState({ message: 'You have been entered!' });
    await this.syncWithBlockchain();
  }

  onPickWinnerClick = async (event) => {
    event.preventDefault();

    this.setState({ message: 'Waiting for contract to pick a winner!' });

    // We are just getting the first account and assuming that this
    // is the user account
    const [account,] = await web3.eth.getAccounts();

    await lottery.methods.pickWinner().send({
      from: account,
    });

    this.setState({ message: 'Winner picked, contract is resetted to its initial state!' });
    await this.syncWithBlockchain();
  } 

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
        <p>
          There are currently {this.state.players.length} people entered,<br/>
          competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>
        <hr />
        <form
          onSubmit={this.onEnterFormSubmit}
        >
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr />
        <h4>Time to pick a winner?</h4>
        <button
          onClick={this.onPickWinnerClick}
        >Pick a winner</button>
        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}
export default App;
