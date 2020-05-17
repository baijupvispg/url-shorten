const urldb = require('../../analytics/url')
const fileDb = require('../helper/fileDbTrans');
const boom = require('boom');

function validate(query) {
    if(!query || (query && !query.key)){
        throw boom.badRequest("Url key is required");
    }   
}

function getModelByKey(query) {
    const urlObj = urldb.filter((itm) => itm.key === query.key.toLowerCase())[0];
    if(!urlObj){      
        throw boom.badRequest("Requested url not found");       
    }
   urlObj.visit_count++;
   urlObj.visitedTime.push( new Date())
   return urlObj;
}

module.exports = () => {
    const api = {};
    api.controller = async (req, res) => {        
        const { query } = req;
        validate(query);       
        const urlObj = getModelByKey(query);
        fileDb(urldb);       
        return res.send(urlObj);
    }
    return api;
}