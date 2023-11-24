const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Middleware for CORS
app.use(cors({
  origin: ['https://atleticosanabria.com', 'https://www.atleticosanabria.com', 'http://atleticosanabria.com.s3-website-us-east-1.amazonaws.com/', 'http://production-atletico-sanabria.s3-website-us-east-1.amazonaws.com/', 'http://10.0.2.4'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send("Sorry, can't find that!");
});

// Allow CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

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
  key: fs.readFileSync('/etc/letsencrypt/archive/api.atleticosanabria.com/privkey1.pem', 'utf8'),
  cert: fs.readFileSync('/etc/letsencrypt/archive/api.atleticosanabria.com/fullchain1.pem', 'utf8'),
};

// Start the server with HTTPS
const port = process.env.PORT || 3001;
https.createServer(httpsOptions, app).listen(port, () => {
  console.log('Server is running on port ' + port + ' with HTTPS');
});
