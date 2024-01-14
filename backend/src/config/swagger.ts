const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0", // Specify the OpenAPI version
    info: {
      title: "Authentication API", // Title of your API
      version: "1.0.0", // Version of your API
      description: "API documentation for user authentication.", // Description of your API
    },
    basePath: "/", // Base path for your API (if applicable)
  },
  apis: [
    path.join(__dirname, "../routes/auth/login.ts"),
    path.join(__dirname, "../routes/auth/register.ts"),
  ], // Path to the file containing your route handlers
};
const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
