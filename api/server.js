const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');

const app = express();

// Middleware for CORS
app.use(cors({
  origin: ['https://atleticosanabria.com', 'https://www.atleticosanabria.com'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Middleware for parsing JSON
app.use(express.json());

// Routes
const clasificationdb = require('./routes/clasificationdb');
app.use('/clasificationdb', clasificationdb);

const matchesdb = require('./routes/matchesdb');
app.use('/matchesdb', matchesdb);

const authentication = require('./routes/authentication');
app.use('/authentication', authentication);

// Define the root URL route
app.get('/', (req, res) => {
  res.send('Welcome to your API');
});

// HTTPS options
const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/api.atleticosanabria.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/api.atleticosanabria.com/fullchain.pem'),
};

// Start the server with HTTPS
const port = process.env.PORT || 3001;
https.createServer(httpsOptions, app).listen(port, () => {
  console.log('Server is running on port ' + port + ' with HTTPS');
});
