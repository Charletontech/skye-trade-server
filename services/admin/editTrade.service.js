const ActiveTrades = require("../../models/activeTrades.model");
const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/errorResponse");
const { Sequelize } = require("sequelize");

const editTrade = async (req, next) => {
  try {
    const tradeId = req.params.tradeId;
    const { target, profit } = req.body;
    const tradeData = await ActiveTrades.findByPk(tradeId);

    if (tradeData.status === "closed") {
      throw next(
        new ErrorResponse(
          "This trade has already been closed and can not be edited."
        ),
        400
      );
    }

    tradeData.target = target || tradeData.target;
    tradeData.profit = profit || tradeData.profit;
    tradeData.save();

    if (tradeData.profit >= tradeData.target) {
      tradeData.status = "closed";
      tradeData.save();
      const creditResponse = await creditUserBalance(
        tradeData.userId,
        tradeData.profit
      );

      return `Trade has been updated and closed successfully. ${creditResponse}`;
    }
    return "Trade updated successfully...";

    async function creditUserBalance(userId, profit) {
      const userExists = await User.findByPk(userId);
      if (!userExists) {
        return "User not found";
      }
      await User.update(
        { balance: Sequelize.literal(`balance + ${profit}`) },
        { where: { userId } }
      );
      return "user balance credited!";
    }
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = editTrade;
