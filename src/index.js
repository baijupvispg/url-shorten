const express = require('express');
const swaggerDoc = require('./swaggerDoc.js');
const app = express();
const path = require('path');
swaggerDoc(app);
require('./setup/server')(app);
require('./setup/middleware')(app);
const globalComponentDependencies = {
    app
  };
require('./urlshortner')(globalComponentDependencies);

app.use('/', function(req, res) {
        res.sendFile(path.join(__dirname+'/public/index.html'))
});
 