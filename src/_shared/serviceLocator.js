

module.exports = () => {
    const factories = {};
    const dependencies = {};
    const serviceLocator = {};
  
    
    serviceLocator.factory = (name, factory) => {
      factories[name] = factory;
    };
  
    
    serviceLocator.set = (name, instance) => {
      dependencies[name] = instance;
    };
  
    
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
  