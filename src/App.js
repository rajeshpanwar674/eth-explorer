import logo from './logo.svg';
import './App.css';
import Web3 from 'web3'
import { useEffect } from 'react';
function App() {

  useEffect(() => {
    watchEtherTransfers()
  }, [])

  function watchEtherTransfers() {
    // Instantiate web3 with WebSocket provider
    const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/')

    // Instantiate subscription object
    const subscription = web3.eth.subscribe('pendingTransactions')

    // Subscribe to pending transactions
    subscription.subscribe((error, result) => {
      if (error) console.log(error)
    })
      .on('data', async (txHash) => {
        try {
          // Instantiate web3 with HttpProvider
          const web3Http = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/')

          // Get transaction details
          const trx = await web3Http.eth.getTransaction(txHash)
          console.log({ trx });
          // const valid = validateTransaction(trx)
          // // If transaction is not valid, simply return
          // if (!valid) return

          // console.log('Found incoming Ether transaction from ' + process.env.WALLET_FROM + ' to ' + process.env.WALLET_TO);
          // console.log('Transaction value is: ' + process.env.AMOUNT)
          // console.log('Transaction hash is: ' + txHash + '\n')

          // Initiate transaction confirmation
          // confirmEtherTransaction(txHash)

          // Unsubscribe from pending transactions.
          subscription.unsubscribe()
        }
        catch (error) {
          console.log(error)
        }
      })
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
