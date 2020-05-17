const urldb = require('../../analytics/url')
const generateError  = require('../helper/generateError');
const fs = require('fs');
module.exports = () => {
    const api = {};
    api.controller = async (req, res) => {
        const { query } = req;
        if(!query || (query && !query.key)){
            res.send("Url key is required");
            return;
        }      
       const urlObj = urldb.filter((itm) => itm.key === query.key.toLowerCase())[0];
       if(!urlObj){      
        return generateError(res,"Requested url not found");         
       }
       urlObj.visit_count++;
       urlObj.visitedTime.push( new Date())
       const file = __dirname.replace("urlshortner\\api",'analytics/url.json'); 
       fs.writeFile(file, JSON.stringify(urldb), 'utf8', ()=>{console.log("File created")}); // write it back 
       return res.status(200).send(urlObj);
    }
    return api;
}