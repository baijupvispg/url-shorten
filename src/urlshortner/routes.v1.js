const express = require('express');
const { catchErrors, handleErrors } = require('../_shared').middleware;
module.exports = ( serviceLocator ) => {
    const api = require('./api')(serviceLocator); 
    const router = express.Router();  
    router.post('/', catchErrors(api.createUrlShorten.controller))   
    router.get('/analytics',catchErrors(api.urlAnalytics.controller));
    router.get('/', catchErrors(api.urlShorten.controller));  
    router.use(handleErrors);
    return router;
}