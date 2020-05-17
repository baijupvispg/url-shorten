/**
 * Service Locator Pattern Implementation
 * - a central service registry to keep track of all sharable dependencies.
 * - avoids manually hard coding dependencies using paths.
 * - lazy loads dependencies
 */

module.exports = () => {
    const factories = {};
    const dependencies = {};
    const serviceLocator = {};
  
    // register a dependency's factory. service locator will lazily create the
    // dependency's instance the first time any code block wants to use it.
    serviceLocator.factory = (name, factory) => {
      factories[name] = factory;
    };
  
    // directly store a dependency's instance/value;
    // useful for static dependencies where a factory registration might not be
    // necessary.
    serviceLocator.set = (name, instance) => {
      dependencies[name] = instance;
    };
  
    // try to get the dependency's instance from the cache else
    // ask it's factory to create one.
    serviceLocator.get = (name) => {
      if (!dependencies[name]) {
        const factory = factories[name];
        dependencies[name] = factory && factory(serviceLocator);
        if (!dependencies[name]) {
          return new Error(`Unable to resolve dependency "${name}"`);
        }
      }
      return dependencies[name];
    };
  
    // one time loading/bootstrapping of modules that makes use of dependencies
    // registered within serviceLocator.
    serviceLocator.load = (factory) => {
      if (typeof factory === 'function') {
        return factory(serviceLocator);
      }
      if (typeof factory === 'object' && factory instanceof Array) {
        return factory.forEach((f) => f(serviceLocator));
      }
      throw new Error('provide either a factory or an array of factories');
    };
  
    return serviceLocator;
  };
  