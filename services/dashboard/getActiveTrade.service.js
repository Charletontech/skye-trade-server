const ActiveTrades = require("../../models/activeTrades.model");
const ErrorResponse = require("../../utils/errorResponse");

const getActiveTrade = async (req, next) => {
  try {
    const { id } = req.user;
    // get user trade from DB
    let activeTradeData = await ActiveTrades.findOne({
      where: { userId: id, status: "open" },
      raw: true,
    });

    return activeTradeData;
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = getActiveTrade;
