const express = require("express");
const cors = require("cors");
const router = express.Router();
const dotenv = require("dotenv");
const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const jwt = require("jsonwebtoken"); // Add this line

dotenv.config();

router.use(cors());
router.use(express.json());
// Create a DynamoDB client
const dynamodbClient = new DynamoDBClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const params = {
      TableName: "users", // Replace with your DynamoDB table name
      Key: {
        username: { S: username },
      },
    };

    // Use DynamoDBClient to send the GetItemCommand
    const response = await dynamodbClient.send(new GetItemCommand(params));

    if (response.Item) {
      // User found, compare the stored hashed password with the provided password
      const storedPassword = response.Item.password.S; // Assuming the password is stored as a string
      // You should compare the hashed password here using a secure method
      if (storedPassword === password) {
        // Password matches, consider the user authenticated
        // Create a JWT token
        const token = jwt.sign({ username }, process.env.SECRET_KEY_JWT, {
          expiresIn: "1h", // Set the token expiration time as needed
        });

        return res.status(200).json({ token }); // Send the token to the client
      }
    }

    // User not found or password does not match
    return res.status(401).json({ error: "Authentication failed" });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "An error occurred during login" });
  }
});

module.exports = router;
