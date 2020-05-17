const express = require('express');
const swaggerDoc = require('./swaggerDoc.js');
const app = express();
swaggerDoc(app);
require('./setup/server')(app);
require('./setup/middleware')(app);
const globalComponentDependencies = {
    app
  };
require('./urlshortner')(globalComponentDependencies);