const Plans = require("../../models/plans.model");
const ErrorResponse = require("../../utils/errorResponse");

const allPlans = async (req, next) => {
  try {
    const allPlansData = Plans.findAll({ raw: true });
    return allPlansData;
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = allPlans;
