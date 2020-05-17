const fs = require('fs');

module.exports=(urldb) => {
    const file = __dirname.replace("urlshortner\\helper",'analytics/url.json'); 
    fs.writeFile(file, JSON.stringify(urldb), 'utf8', ()=>{console.log("File created")}); // write it back 
}