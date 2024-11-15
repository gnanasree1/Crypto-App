import React, { useState } from 'react';
import axios from 'axios';

function InsertCoin() {
  const [coinData, setCoinData] = useState({
    name: '',
    image: '',
    symbol: '',
    market_cap: 0,
    current_price: 0,
    price_change_percentage_24h: 0,
  });

  const handleChange = (e) => {
    setCoinData({ ...coinData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/coins', coinData)
  .then(res => {
    console.log('Response from server:', res.data);
    alert('Coin added successfully!');
  })
  .catch(error => {
    // Check if there's a response from the server
    if (error.response) {
      // The request was made, and the server responded with a status code outside the 2xx range
      console.error('Error response from server:', error.response.data);
      alert(`Error adding coin: ${error.response.data.message || 'Unknown server error'}`);
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No response received:', error.request);
      alert('No response from server. Please try again later.');
    } else {
      // Something else caused the error (e.g., an issue with setting up the request)
      console.error('Request error:', error.message);
      alert(`Error adding coin: ${error.message}`);
    }
  });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Coin Name" onChange={handleChange} required />
      
      
      <input type="number" name="market_cap" placeholder="Market Cap" onChange={handleChange} required />
      <input type="number" name="current_price" placeholder="Current Price" onChange={handleChange} required />
      <input type="number" name="price_change_percentage_24h" placeholder="24h Change (%)" onChange={handleChange} required />
      <button type="submit">Add Coin</button>
    </form>
  );
}

export default InsertCoin;
