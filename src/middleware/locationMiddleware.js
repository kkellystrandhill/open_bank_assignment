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
  const lbgTxnBranchLocation = "lbg-txn-branch-location";
  if (!(lbgTxnBranchLocation in req.headers)) {
    let error = new Error("lbg-txn-branch-location does not exist on header");
    return next(error);
  }
  let location = req.headers?.[lbgTxnBranchLocation]
    .toString()
    .toLowerCase()
    .trim();
  const { error } = schema.validate(location);
  if (error) return next(error);
  req.headers[lbgTxnBranchLocation] = location;
  next();
};
