const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const apiTags = require('./apiDocs/apiTags');
const config = require('./config');

const swaggerDocOptions = {
  swaggerDefinition: {
    info: {
      title: 'Url Shorten',
      version: '1.0.0',
      description: 'API for theUrl Shorten',
    },
    host: config.apiBaseUrl,
    basepath: '/',
    // If schemes are not specified,
    // the scheme used to serve the API specification will be used for API calls.
    // schemes: ['http', 'https'],
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Please enter JWT with Bearer into field',
      },
    },
    security: [{ Bearer: [] }],
    tags: apiTags,
  },
  apis: ['./apiDocs/*.yaml'],
};

const swaggerDoc = swaggerJsDoc(swaggerDocOptions);
module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
};
