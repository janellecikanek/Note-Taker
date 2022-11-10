// Custom middleware that logs out the type and path of each request to the server
const clog = (req, res, next) => {
    next();
  };
  
  exports.clog = clog;