const { resolveModulesWithServiceLocator } = require('../../_shared');
module.exports = (serviceLocator) => {
  return resolveModulesWithServiceLocator(__dirname, serviceLocator);
};
