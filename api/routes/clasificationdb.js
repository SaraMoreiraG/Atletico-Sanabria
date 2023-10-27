const express = require('express');
const AWS = require('aws-sdk');
const router = express.Router();


// Configure AWS SDK
AWS.config.update({
  region: 'us-east-1', // AWS region
  accessKeyId: 'Access key ID', // IAM user access key
  secretAccessKey: 'Secret access key', // IAM user secret key
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

// Fetch all data
router.get('/full', (req, res) => {
  const params = {
    TableName: 'clasification', // DynamoDB table name
  };

  dynamodb.scan(params, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server Error');
    } else {
		const transformedData = data.Items.map(item => {
			// Include the 'id' attribute in the response
			item.id = item.id || ''; // Assuming 'id' is the primary key
			return item;
		  });
		  res.json(transformedData);
    }
  });
});

// Route to fetch the first 5 items
router.get('/onlyfive', (req, res) => {
	const params = {
	  TableName: 'clasification', // Specify your DynamoDB table name
	  Limit: 5, // Limit the number of items to 5
	};

	dynamodb.scan(params, (err, data) => {
	  if (err) {
		console.error(err);
		res.status(500).send('Server Error');
	  } else {
		res.status(200).json(data.Items);
	  }
	});
  });



module.exports = router;
