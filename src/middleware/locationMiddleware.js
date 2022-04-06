import Joi from "joi";

const PARAM_NAME = "Loaction";

const schema = Joi.string()
  .pattern(/^\d+$/, { invert: true })
  .required()
  .error((errors) => {
    //console.log("errors = ", errors);
    errors.forEach((err) => {
      err.failedValidation = true;
      err.paramName = PARAM_NAME;
      switch (err.code) {
        case "string.pattern.invert.base":
          err.message = `${PARAM_NAME} should not be a number!`;
          break;
        case "any.required":
          err.message = `${PARAM_NAME} is required!`;
          break;
        case "string.base":
          err.message = `${PARAM_NAME} should be string!`;
          break;
        case "string.empty":
          err.message = `${PARAM_NAME} should not be empty!`;
          break;
        default:
          break;
      }
    });
    return errors;
  });

export default (req, res, next) => {
  try {
    const lbgTxnBranchLocation = "lbg-txn-branch-location";
    if (!(lbgTxnBranchLocation in req.headers)) {
      throw new Error({
        failedValidation: true,
        paramName: PARAM_NAME,
        message: "lbg-txn-branch-location does not exist on header",
      });
    }
    const location = req.headers?.[lbgTxnBranchLocation]
      .toString()
      .toLowerCase()
      .trim();
    const { error } = schema.validate(location);
    if (error) throw error;
    req.headers[lbgTxnBranchLocation] = location;
    next();
  } catch (e) {
    next(e);
  }
};
