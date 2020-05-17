const urldb = require('../../analytics/url')
const fs = require('fs');
const path = require('path')

function validate(param, res){
    if(!param){
        res.send(new Error("Enter url shortnen value"));
    }
    if(!param.shorten_url){
        res.send(new Error("Enter url shortnen value"));
    }
    if(!param.url){
        res.send(new Error("Enter url for shorten"));
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
            res.send("Key already exists");
            return;
        }
        const model = generateModel(param);
        urldb.push(model);       
        const file = __dirname.replace("urlshortner\\api",'analytics/url.json'); 
        fs.writeFile(file, JSON.stringify(urldb), 'utf8', ()=>{console.log("File created")}); // write it back 
        res.send(model)
    }
    return api;
}