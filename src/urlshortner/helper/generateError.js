module.exports=(res, message)=> {
    return res.status(406).json(new Error(message));
}