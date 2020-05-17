const moment = require('moment');
const boom = require('boom');
const urldb = require('../../analytics/url');

module.exports = () => {
    const api = {};
    api.controller = async (req, res) => {    
        //analytics based on 12 hour time slots
      const { query } = req;
      if(!query || (query && !query.key)){
       throw boom.badRequest("Url key is required");
      }

      const currentDate =moment();
      let startTime = moment().add(-12,'hours');
      var urlObj = urldb.find(itm =>  itm.key === query.key.toLowerCase());      
      const  hourList = [];
      let startHour = 1;

      if(urlObj) {    

        while(startTime < currentDate){
            let endTime = moment(startTime).add(1,"hours");              
            const hourREsult =  urlObj.visitedTime.filter(itm => moment(itm) > startTime && moment(itm) < endTime ) ;           
                hourList.push({
                    hour: startHour,
                    visits: hourREsult.length,
                    startTime,
                    endTime
                });
                startHour++;
                startTime = endTime;
        }
      }      
      
      return res.status(200).send(hourList);
    }
    return api;
}