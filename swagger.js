// swagger.js
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Backend API",
      version: "1.0.0",
      description: "API Documentation",
    },
    servers: [
      {
        url: "https://my-backend-api-2-io7n.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.js"], // path to API docs
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerSpec };
