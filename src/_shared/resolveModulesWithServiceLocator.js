const fs = require('fs');

module.exports = (directory, svcLoc) => {
  const resolvedModules = {};

  
  fs.readdirSync(directory).forEach((file) => {
    if (
      file !== 'index.js' &&
      file.endsWith('.js') &&
      !file.startsWith('_') &&
      !file.endsWith('spec.js')
    ) {
      const fileName = file.split('.js')[0];     
      resolvedModules[fileName] = require(`${directory}/${file}`)(svcLoc);
    }
  });
  return resolvedModules;
};
