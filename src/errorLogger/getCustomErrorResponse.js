const messages = {
  API_ERROR: "API_ERROR",
};
const validationError = (errParamName) => {
  console.log("errParamName = ", errParamName);
};
const appLogger = (messagesType, messagesDetail) => {
  console.log("messagesType = ", messagesType);
  console.log("messagesDetail = ", messagesDetail);
  return "";
};

export default (err, req, res, next) => {
  let finalError = err;
  if (err.message && err.message.err && !err.message.err.code) {
    finalError.message = err.message.err;
  }

  if (err.failedValidation) {
    finalError = validationError(err.paramName);
  }

  appLogger.error(messages.API_ERROR, {
    method: req.method,
    url: req.url,
    err,
  });

  res
    .status(finalError.statusCode)
    .send(finalError)
    .end(requestLogger.error(requestContext.failureContext, req, res));
};
