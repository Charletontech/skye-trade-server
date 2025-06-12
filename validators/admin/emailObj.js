const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  heading: Joi.string().required(),
  greeting: Joi.string().required(),
  message: Joi.string().required(),
  recipient: Joi.string().required(),
});

const emailObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = emailObj;
