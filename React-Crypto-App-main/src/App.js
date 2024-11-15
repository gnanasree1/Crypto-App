import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import Coin from './Coin';
import InsertCoin from './InsertCoin';


function App() {
  const [coins,setCoins] = useState([])
  const [search,setSearch] = useState('')
  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res=>{
       setCoins(res.data)
       console.log(res.data)
    }).catch(error=>console.log(error))
  }, [])
  const handleChange = e =>{
    setSearch(e.target.value)
  }
  const filteredCoins = coins.filter(coin=>
    coin.name.toLowerCase().includes(search.toLowerCase())
    )
  return (
    
    <div className="coin-app">
      <div className="coin-search">
        {/* <h1 className="coin-text">Search your desired coin</h1> */}
        <form action="">
          <input type="text" className="coin-input" placeholder="Provide the coin name" onChange={handleChange}/>

        </form>

      </div>
      {/* Add Column Headings */}
      <div className="coin-row headings">
        <div className="coin">
          <h2>Coin</h2>
        </div>
        <div className="coin-data">
          <h2>Price</h2>
          
          <h2>24h Change</h2>
          <h2>Market Cap</h2>
        </div>
      </div>
      <div className="App">
      <h1>Coin Management</h1>
      <InsertCoin /> {/* Render the InsertCoin component */}
    </div>
      {filteredCoins.map(coin=>{
        return(
          <Coin 
          key={coin.id} 
          name={coin.name} 
          image={coin.image} 
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          price={coin.current_price}
          pricechange={coin.price_change_percentage_24h}
          //volume={coin.total_volume}
          />
        );
      })}


    </div>
    
  );
  
}

//export default InsertCoin;
export default App;
