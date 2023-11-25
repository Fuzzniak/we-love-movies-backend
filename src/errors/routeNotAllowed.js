function routeNotAllowed(req, res, next) {
  next({
      status: 404,
      message: `${req.originalURL} not allowed`,
  });
};

module.exports = routeNotAllowed; 