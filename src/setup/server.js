const http = require('http');
const config = require('../config');

module.exports = (app) => {
    const host = '0.0.0.0'
    const { port } = config;
    const server = http.createServer(app);
    server.listen(port, host, () => {    
        console.log(`server listening on ${host}:${port}`);
    });
    return server;
}