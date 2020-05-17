
module.exports = (err, req, res, next) => {   
      if (err.data) {
        err.output.payload = {
          ...err.output.payload,
          errors: err.data.errors,
          errorKey: err.data.key,
          entity: err.data.entity,
        };
      }
       return res.status(err.output.statusCode).json(err.output.payload); 
 };
  