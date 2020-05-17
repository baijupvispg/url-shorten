const bootstrapComponent = require('./bootstrapComponent');
const serviceLocator = require('./serviceLocator');
const resolveModulesWithServiceLocator = require('./resolveModulesWithServiceLocator');
const middleware = require('./middleware');

module.exports = {
    serviceLocator,
    bootstrapComponent,
    resolveModulesWithServiceLocator,
    middleware
}