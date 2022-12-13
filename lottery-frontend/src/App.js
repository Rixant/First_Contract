import React from 'react';
import './App.css';
import web3 from './web3';
import lottery from './lottery';


function App() {
  const [manager, setManager] = React.useState('');
  const [players, setPlayers] = React.useState([]);
  const [balance, setBalance] = React.useState('');
  const [amount, setAmount] = React.useState(0);
  const [message, setMessage] = React.useState('Welcome');

  React.useEffect( () => {
    const fetchManager = async () => {
      const manager = await lottery.methods.manager().call();
      setManager(manager);
    }

    const fetchPlayers = async () => {
      const players = await lottery.methods.getPlayers().call();
      setPlayers(players);
    }
    
    const fetchBalance = async () => {
      const balance = await web3.eth.getBalance(lottery.options.address);
      setBalance(balance);
    }

    fetchManager().catch(console.error);
    fetchPlayers().catch(console.error);
    fetchBalance().catch(console.error);
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    setMessage('Waiting on transaction success...')

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(amount, 'ether')
    });

    setMessage('You have been entered!')
  };

  const onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    setMessage('Waiting on transaction success...')

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    })

    setMessage('A winner has been picked!')
  }

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p> 
        This contract is managed by {manager}. There are currently{''} {players.length} people enterred,
        competing to {web3.utils.fromWei(balance, 'ether')} ether!
      </p>

      <hr></hr>

      <form onSubmit={onSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input value={amount} onChange={event => setAmount(event.target.value)} />
        </div>
        <button>Enter</button>
      </form>

      <hr></hr>
      <h4> Ready to pick a winner? </h4>
      <button onClick={onClick}>Pick a winner</button>

      <hr></hr>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
