
module.exports = (err, req, res, next) => {   
    return res.status(204).json(err);
  };
  