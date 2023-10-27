const express = require('express');
const AWS = require('aws-sdk');
const router = express.Router();


// Configure AWS SDK
AWS.config.update({
  region: 'us-east-1', // AWS region
  accessKeyId: '', // IAM user access key
  secretAccessKey: '', // IAM user secret key
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

// Fetch all data and sort by 'position'
router.get('/full', (req, res) => {
	const params = {
	  TableName: 'clasification', // DynamoDB table name
	};

	dynamodb.scan(params, (err, data) => {
	  if (err) {
		console.error(err);
		res.status(500).send('Server Error');
	  } else {
		res.json(data.Items);
	  }
	});
  });

// Fetch the first 5 items
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

// Handle item updates
router.put("/update/:itemId", (req, res) => {
	const itemId = parseInt(req.params.itemId, 10); // Parse the ID as a number
	console.log('Received request to update item with ID:', itemId);

	const updatedData = req.body;
	console.log("Updated data:", updatedData);

	// Construct the update operation for DynamoDB
	const updateExpression = [];
	const expressionAttributeValues = {};

	if (updatedData.name) {
	  updateExpression.push("#name = :name");
	  expressionAttributeValues[":name"] = updatedData.name;
	}

	// Add other fields you want to update in a similar manner

	const params = {
	  TableName: "clasification",
	  Key: {
		id: itemId, // ID is a number
	  },
	  UpdateExpression: "SET " + updateExpression.join(", "),
	  ExpressionAttributeNames: {
		"#name": "name",
		// Add other attribute names you use in your updateExpression
	  },
	  ExpressionAttributeValues: expressionAttributeValues,
	};

	console.log("Update params:", params);

	// Update the item in DynamoDB
	dynamodb.update(params, (err, data) => {
	  if (err) {
		console.error("DynamoDB update error:", err);
		res.status(500).send("Server Error");
	  } else {
		console.log("Item successfully updated in DynamoDB.");
		res.sendStatus(200); // Successfully updated
	  }
	});
  });




module.exports = router;
