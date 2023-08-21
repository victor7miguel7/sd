const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path'); // Import the 'path' module

const app = express();
const port = 4000;

app.use(bodyParser.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

const databaseFile = 'database.json';
let database = [];

if (fs.existsSync(databaseFile)) {
  const data = fs.readFileSync(databaseFile, 'utf8');
  database = JSON.parse(data);
}

app.post('/api/orders', (req, res) => {
  const order = req.body;
  database.push(order);
  fs.writeFileSync(databaseFile, JSON.stringify(database, null, 2));
  res.status(201).json({ message: 'Order received and saved.' });
});

// Route for the homepage
app.get('/', (req, res) => {
  // Serve the 'index.html' file from the 'public' folder
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
