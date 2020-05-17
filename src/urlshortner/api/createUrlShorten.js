const boom = require('boom');
const urldb = require('../../analytics/url')
const fileDb = require('../helper/fileDbTrans');


function validate(param, res){
    let errorMsg ="";
    if(!param){
        errorMsg = "Enter url shortnen value";       
    }
    if(!param.shorten_url){
        errorMsg = "Enter url shortnen value";       
    }
    if(!param.url){
        errorMsg = "Enter url for shorten";       
    }
    if(errorMsg){
        throw boom.badRequest(errorMsg)
    }
}

function generateModel(param){
   return {
    "key" : param.shorten_url,
    "value":param.url,
    "visit_count": 0,
    "createdAt": new Date(),
    "visitedTime": []    
   }
}

module.exports = (serviceLocator) => {
    const api = {};
    api.controller = async (req, res) => {          
        const { body:param } = req;       
        validate(param,res);        
        //Check key already exists
        const existItem = urldb.filter((itm)=>itm.key === param.shorten_url.toLowerCase());
        if(existItem.length >0){
            throw boom.badData("Key already exists");           
        }
        const model = generateModel(param);
        urldb.push(model);       
        const file = __dirname.replace("urlshortner\\api",'analytics/url.json'); 
        fileDb(urldb);
        res.send(model)
    }
    return api;
}