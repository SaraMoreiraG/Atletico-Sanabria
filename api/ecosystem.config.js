module.exports = {
	apps: [
	  {
		name: 'api.atleticosanabria.com',
		script: 'server.js',
		instances: 1,
		autorestart: true,
		watch: false,
		max_memory_restart: '1G',
		env: {
		  NODE_ENV: 'development',
		  // Add other environment variables if needed
		},
		env_production: {
		  NODE_ENV: 'production',
		  // Add other environment variables for production
		},
		// Load .env file
		env_file: '.env',
	  },
	],
  };
