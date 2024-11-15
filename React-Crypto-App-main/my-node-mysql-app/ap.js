const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace with your MySQL username
  password: 'Jayasree@123', // replace with your MySQL password
  database: 'react' // replace with your database name
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

// API endpoint to insert data into the database
app.post('/api/coins', (req, res) => {
  console.log('Received data:', req.body); // This is where req is defined

  const { name, market_cap, current_price, price_change_percentage_24h } = req.body;
  if (!name || market_cap == null || current_price == null || price_change_percentage_24h == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Optional: Validate that numeric values are indeed numbers
  if (isNaN(market_cap) || isNaN(current_price) || isNaN(price_change_percentage_24h)) {
    return res.status(400).json({ message: 'Market cap, current price, and 24h change must be numbers' });
  }

  // If validation passes, proceed with inserting into the database
  connection.query('INSERT INTO coins SET ?', { name, market_cap, current_price, price_change_percentage_24h }, (err, results) => {
    if (err) {
      console.error('Database error:', err); // Log the error for debugging
      return res.status(500).json(err);
    }
    res.json({ message: 'Data inserted successfully', id: results.insertId });
  });
});

// Get coins from the database
app.get('/api/coins', (req, res) => {
  connection.query('SELECT * FROM coins', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
