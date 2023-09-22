const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const config = require("config");
const port = config.get("port");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Sello.uz",
      version: "1.0.0",
      description: "Swagger documentation for Sello.uz",
    },
    components: {
      securitySchemas: {
        cookieAuth: {
          type: "api-key",
          in: "cookie",
          name: "Token",
        },
      },
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./src/api/routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
