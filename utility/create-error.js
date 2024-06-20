const createError = (detail) => {
   const error = new Error(detail.message);
   error.statusCode = detail.statusCode;
   error.field = detail.field;
   throw error;
};
 
module.exports =  createError;