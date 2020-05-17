const path = require('path');
const fs = require('fs');
const serviceLocatorFactory = require('./serviceLocator');

module.exports = (componentDirectory, globalDependencies) => {
    const serviceLocator = serviceLocatorFactory();
    const { app } = globalDependencies;
    serviceLocator.set('app', app);
    return serviceLocator;
}