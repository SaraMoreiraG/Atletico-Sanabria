import {
	SecretsManagerClient,
	GetSecretValueCommand,
  } from "@aws-sdk/client-secrets-manager";

  const secretName = "instagram/api"; // Replace with your secret name

  const client = new SecretsManagerClient({
	region: "us-east-1", // Specify your AWS region
  });

  // Function to fetch the secret value
  async function fetchInstagramSecretValue() {
	try {
	  const response = await client.send(
		new GetSecretValueCommand({
		  SecretId: secretName,
		  VersionStage: "AWSCURRENT",
		})
	  );

	  if (response.SecretString) {
		// Parse the secret string (JSON) into an object or use it as needed
		const secret = JSON.parse(response.SecretString);

		// Now, you can use the secret data in your application
		console.log(secret);

		return secret;
	  } else {
		throw new Error("Secret string is empty.");
	  }
	} catch (error) {
	  console.error("Failed to fetch secret value:", error);
	  throw error;
	}
  }

  export { fetchInstagramSecretValue };
