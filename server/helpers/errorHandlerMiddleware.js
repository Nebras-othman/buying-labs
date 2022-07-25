const errorHandler = (error, req, res, next) => {
  if (!error.code) {
    res.statusCode = 500;
    return res.send({ message: 'something went wrong' });
  }
  res.statusCode = error.status;
  res.send({ message: error.code });

  return next();
};
module.exports = errorHandler;
