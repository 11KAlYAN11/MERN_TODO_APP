// Add a configuration file for port numbers
const config = {
  frontendPort: process.env.FRONTEND_PORT || 4200,
  backendPort: process.env.BACKEND_PORT || 3000
};

module.exports = config;