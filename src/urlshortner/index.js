const { bootstrapComponent } = require('../_shared');
module.exports = ({ app }) => {
    const serviceLocator = bootstrapComponent(__dirname, {
      app
    });  
    app.use('/api/url-shortner/v1', require('./routes.v1')(serviceLocator));
  };