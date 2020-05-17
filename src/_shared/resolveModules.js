const fs = require('fs');

module.exports = (directory) => {
  const resolvedModules = {};

  /* eslint security/detect-non-literal-fs-filename: off */
  fs.readdirSync(directory).forEach((file) => {
    if (
      file !== 'index.js' &&
      file.endsWith('.js') &&
      !file.startsWith('_') &&
      !file.endsWith('spec.js')
    ) {
      const fileName = file.split('.js')[0];
      /* eslint import/no-dynamic-require: off */
      /* eslint security/detect-non-literal-require: off */
      resolvedModules[fileName] = require(`${directory}/${file}`);
    }
  });
  return resolvedModules;
};
