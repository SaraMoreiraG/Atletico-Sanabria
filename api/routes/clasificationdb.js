const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const {
  DynamoDBClient,
  ScanCommand,
  UpdateItemCommand,
  DeleteItemCommand,
  PutItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

dotenv.config();
const router = express.Router();

router.use(cors());
router.use(express.json());

const dynamodbClient = new DynamoDBClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// GET route to retrieve all items from the table
router.get("/full", (req, res) => {
  const scanParams = {
    TableName: "clasification",
  };

  dynamodbClient
    .send(new ScanCommand(scanParams))
    .then((data) => {
      // Process the items to convert attribute values to plain JavaScript types
      const items = data.Items.map((item) => {
        const unmarshalledItem = unmarshall(item);
        // Convert attribute values to plain JavaScript types
        Object.keys(unmarshalledItem).forEach((key) => {
          const value = unmarshalledItem[key];
          if (value && typeof value === "object" && value.hasOwnProperty("N")) {
            unmarshalledItem[key] = parseInt(value.N);
          } else if (value.hasOwnProperty("S")) {
            unmarshalledItem[key] = value.S;
          }
        });
        return unmarshalledItem;
      });

      res.json(items);
    })
    .catch((err) => {
      console.error("DynamoDB scan error:", err);
      res.status(500).send("Server Error");
    });
});

// GET route to retrieve the first 5 items from the table
router.get("/onlyfive", (req, res) => {
  const scanParams = {
    TableName: "clasification",
    Limit: 5, // Limit the result to the first 5 items
  };

  dynamodbClient
    .send(new ScanCommand(scanParams))
    .then((data) => {
      // Process the items to convert attribute values to plain JavaScript types
      const items = data.Items.map((item) => {
        const unmarshalledItem = unmarshall(item);
        // Convert attribute values to plain JavaScript types
        Object.keys(unmarshalledItem).forEach((key) => {
          const value = unmarshalledItem[key];
          if (value && typeof value === "object" && value.hasOwnProperty("N")) {
            unmarshalledItem[key] = parseInt(value.N);
          } else if (value.hasOwnProperty("S")) {
            unmarshalledItem[key] = value.S;
          }
        });
        return unmarshalledItem;
      });

      res.json(items);
    })
    .catch((err) => {
      console.error("DynamoDB scan error:", err);
      res.status(500).send("Server Error");
    });
});

// Update items
router.put("/update/:itemId", (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const name = req.body.name;

  if (!name) {
    res.status(400).send("Name is missing in the request body");
    return;
  }

  const updatedData = req.body;
  const updateExpression = [];
  const expressionAttributeNames = {};
  const expressionAttributeValues = {};

  // Check and update multiple attributes
  if (typeof updatedData.pe === "number") {
    updateExpression.push("#pe = :pe");
    expressionAttributeNames["#pe"] = "pe";
    expressionAttributeValues[":pe"] = { N: updatedData.pe.toString() };
  }

  if (typeof updatedData.pg === "number") {
    updateExpression.push("#pg = :pg");
    expressionAttributeNames["#pg"] = "pg";
    expressionAttributeValues[":pg"] = { N: updatedData.pg.toString() };
  }

  if (typeof updatedData.pj === "number") {
    updateExpression.push("#pj = :pj");
    expressionAttributeNames["#pj"] = "pj";
    expressionAttributeValues[":pj"] = { N: updatedData.pj.toString() };
  }

  if (typeof updatedData.pp === "number") {
    updateExpression.push("#pp = :pp");
    expressionAttributeNames["#pp"] = "pp";
    expressionAttributeValues[":pp"] = { N: updatedData.pp.toString() };
  }

  if (typeof updatedData.pts === "number") {
    updateExpression.push("#pts = :pts");
    expressionAttributeNames["#pts"] = "pts";
    expressionAttributeValues[":pts"] = { N: updatedData.pts.toString() };
  }

  const updateCommand = {
    TableName: "clasification",
    Key: {
      id: { N: itemId.toString() },
      name: { S: name },
    },
    UpdateExpression: "SET " + updateExpression.join(", "),
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: marshall(expressionAttributeValues),
  };

  dynamodbClient
    .send(new UpdateItemCommand(updateCommand))
    .then((data) => {
      console.log("Item successfully updated in DynamoDB.");
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error("DynamoDB update error:", err);
      res.status(500).send("Server Error");
    });
});

// Delete items
router.delete("/delete/:itemId/:itemName", (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const itemName = req.params.itemName;

  const deleteParams = {
    TableName: "clasification",
    Key: {
      id: { N: itemId.toString() },
      name: { S: itemName.toString() },
    },
  };

  dynamodbClient
    .send(new DeleteItemCommand(deleteParams))
    .then(() => {
      console.log("Item deleted successfully.");
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error("DynamoDB delete error:", err);
      res.status(500).send("Server Error");
    });
});

// Create Item
router.post("/add", async (req, res) => {
	const newTeam = req.body;

	if (!newTeam || !newTeam.name) {
	  return res.status(400).json({ error: "Name is required" });
	}

	try {
	  // Generate a random unique ID
	  const uniqueId = Date.now() + Math.floor(Math.random() * 1000);

	  const newTeamParams = {
		TableName: "clasification",
		Item: {
		  id: { N: uniqueId.toString() },
		  name: { S: newTeam.name },
		},
	  };

	  // Optional attributes
	  if (newTeam.pj) {
		newTeamParams.Item.pj = { N: newTeam.pj.toString() };
	  }
	  if (newTeam.pg) {
		newTeamParams.Item.pg = { N: newTeam.pg.toString() };
	  }
	  if (newTeam.pe) {
		newTeamParams.Item.pe = { N: newTeam.pe.toString() };
	  }
	  if (newTeam.pp) {
		newTeamParams.Item.pp = { N: newTeam.pp.toString() };
	  }
	  if (newTeam.pts) {
		newTeamParams.Item.pts = { N: newTeam.pts.toString() };
	  }

	  // Use DynamoDBClient to send the PutItemCommand
	  dynamodbClient
		.send(new PutItemCommand(newTeamParams))
		.then(() => {
		  res.status(201).json({
			message: "New team created successfully",
		  });
		})
		.catch((err) => {
		  console.error("Error adding new team:", err);
		  res
			.status(500)
			.json({ error: "An error occurred while creating the team" });
		});
	} catch (error) {
	  console.error("Error adding item:", error);
	  res.status(500).json({ error: "Adding Error" });
	}
  });


module.exports = router;
