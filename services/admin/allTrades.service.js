const ActiveTrades = require("../../models/activeTrades.model");
const ErrorResponse = require("../../utils/errorResponse");

const allTrades = async (req, next) => {
  try {
    const allTradesData = await ActiveTrades.findAll();
    return allTradesData;
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = allTrades;
