const notFoundMiddlwware =  (req, res, next) => {
   res.status(404).json({message: `requested url: ${req.method} ${req.url} was not found on this server`});
};

module.exports = notFoundMiddlwware;