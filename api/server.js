const express = require('express');
const app = express();
const cors = require('cors');

// Middleware for CORS
app.use(cors());
// Middleware for parsing JSON
app.use(express.json());

// Routes
const clasificationdb = require('./routes/clasificationdb');
app.use('/clasificationdb', clasificationdb);

// Define the root URL route
app.get('/', (req, res) => {
  res.send('Welcome to your API');
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
