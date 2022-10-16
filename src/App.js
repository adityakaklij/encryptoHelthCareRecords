import './App.css';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route, HashRouter,} from "react-router-dom";
import CreateCerti from './components/CreateCerti';
import VerifyCerti from './components/VerifyCerti';
import Deploy from './components/Deploy';
import Home from './components/Home';
// import CreateCerti from './components/CreateCerti';


function App() {
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const [account, setAccount] = useState(null);


  useEffect( () =>{
      setIsWalletInstalled(true);
      // connectWallet()
  }, []);

      const connectWallet = async() => {
        window.ethereum.request({ method:"eth_requestAccounts"})
        .then( (accounts) => {
          setAccount(accounts[0]);
        }).catch( (e) => {
          alert(e)
        })
        
      }

    if(account === null){
      return(
        <div className="App">{
          isWalletInstalled ? (<> 
          <button className='connectBtn' onClick={connectWallet}> Connect </button> 
          </>)  : (
            <p>Please Install Metamask Wallet :) </p>
          )
        }
        </div>
      )
    }
    else {

      return(
        <div className="App">
          {/* <p> Connected as : {account}</p>         */}
          <p></p>
          
          <Router basename='/'>
          {/* <HashRouter > */}
          <div className="App">
            <Navbar/>

          <Switch>

              <Route  exact path="/" component={Home}>
              </Route>

              <Route exact path="/VerifyCerti" component={VerifyCerti}>
              </Route>

              <Route exact path="/CreateCerti" component={CreateCerti}> 
              </Route>
              
              <Route exact path="/Deploy" component={Deploy}> 
              </Route>

            </Switch>

          </div>
          </Router>
        </div>
      )
    }
  
}

export default App;
