const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  musicId: Joi.string().required(),
  minutesListened: Joi.number().required(),
  finishedPlaying: Joi.boolean(),
});

const musicEndedWebhookObj = async (req, res, next) => {
  try {
    // validating request body
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = musicEndedWebhookObj;
