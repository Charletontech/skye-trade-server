const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  amount: Joi.number().required(),
  username: Joi.string().required(),
  method: Joi.string().required(),
  walletAddress: Joi.string().required(),
});

const withdrawalRequestObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = withdrawalRequestObj;
