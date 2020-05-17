const bootstrapComponent = require('./bootstrapComponent');
const serviceLocator = require('./serviceLocator');
const resolveModulesWithServiceLocator = require('./resolveModulesWithServiceLocator');
const middleware = require('./middleware');
const generateError =  require('./generateError');

module.exports = {
    serviceLocator,
    bootstrapComponent,
    resolveModulesWithServiceLocator,
    middleware,
    generateError
}