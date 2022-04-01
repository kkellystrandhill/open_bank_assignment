import Joi from "joi";

const schema = Joi.string().required();

export default (req, res, next) => {
  const { error } = schema.validate(req.headers["lbg-txn-branch-location"]);
  if (error) return next(error);
  next();
};
