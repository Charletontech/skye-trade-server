const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  user: Joi.string().required(),
  plan: Joi.string().required(),
  amount: Joi.number().required(),
  roi: Joi.number().required(),
});

const purchasePlanObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = purchasePlanObj;
