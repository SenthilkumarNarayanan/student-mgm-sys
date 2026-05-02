const swaggerJsDoc = require("swagger-jsdoc");
const path = require('path');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Student Management API",
      version: "1.0.0",
      description: "API for managing students with JWT authentication",
    },
    components: {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
},
security: [
  {
    bearerAuth: [],
  },
],
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ]
  },
    apis:  [ path.join(__dirname, "../routes/**/*.js"),
  path.join(__dirname, "../controllers/**/*.js"),]
, // adjust path if needed
};

module.exports = swaggerJsDoc(options);

