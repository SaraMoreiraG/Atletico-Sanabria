const express = require('express');
const { DynamoDBClient, ScanCommand } = require('@aws-sdk/client-dynamodb'); // Import the AWS SDK for JavaScript (v3)
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb'); // Utility functions for DynamoDB data
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

const dynamodbClient = new DynamoDBClient({
	region: 'us-east-1', // Set your desired AWS region
	credentials: {
	  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
  });


// Fetch all data and sort by 'position'
router.get('/full', async (req, res) => {
  const params = {
    TableName: 'clasification', // DynamoDB table name
  };

  try {
    const command = new ScanCommand(params);
    const data = await dynamodbClient.send(command);

    const items = data.Items.map((item) => unmarshall(item));
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Fetch the first 5 items
router.get('/onlyfive', async (req, res) => {
  const params = {
    TableName: 'clasification', // Specify your DynamoDB table name
    Limit: 5, // Limit the number of items to 5
  };

  try {
    const command = new ScanCommand(params);
    const data = await dynamodbClient.send(command);

    const items = data.Items.map((item) => unmarshall(item));
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
