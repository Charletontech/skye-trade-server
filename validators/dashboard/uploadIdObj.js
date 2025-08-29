const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  docType: Joi.string().required(),
});

const uploadIdObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = uploadIdObj;
