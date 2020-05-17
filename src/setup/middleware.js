const bodyParser = require('body-parser');
module.exports = (app) => {
    app.enable('trust proxy');
    app.use(bodyParser.json());  
    app.use(bodyParser.urlencoded({ extended: true }));
}