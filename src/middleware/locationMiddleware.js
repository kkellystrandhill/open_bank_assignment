import Joi from "joi";

const schema = Joi.string()
  .pattern(/^\d+$/, { invert: true })
  .required()
  .error((errors) => {
    //console.log("errors = ", errors);
    errors.forEach((err) => {
      switch (err.code) {
        case "string.pattern.invert.base":
          err.message = "Location should not be a number!";
          break;
        case "any.required":
          err.message = "Location is required!";
          break;
        case "string.base":
          err.message = "Location should be string!";
          break;
        case "string.empty":
          err.message = "Location should not be empty!";
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
      throw new Error("lbg-txn-branch-location does not exist on header");
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
