const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  phone: Joi.string().required(),
  gender: Joi.string().required(),
  accountType: Joi.string().required(),
  country: Joi.string().required(),
  currency: Joi.string().required(),
  zipCode: Joi.string().optional(),
  password: Joi.string().required(),
  // not in user model
  repeatPassword: Joi.string().optional(),
  "t&c": Joi.string().optional(),
});

const validateRegisterObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateRegisterObj;
