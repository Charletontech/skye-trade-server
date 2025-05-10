const { not } = require("joi");
const ActiveTrades = require("../../models/activeTrades.model");
const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/errorResponse");
const { Sequelize } = require("sequelize");

const newTrade = async (req, next) => {
  try {
    const { id } = req.user;
    const { amount, tradeType } = req.body;

    const { balance } = await User.findOne({
      where: { userId: id },
    });
    // Check if user already has an active trade ongoing
    const activeTrade = await ActiveTrades.findOne({
      where: { userId: id, status: "open" },
    });
    if (activeTrade) {
      throw next(
        new ErrorResponse(
          "You already have an active trade. Wait till the trade is closed.",
          400
        )
      );
    }

    // check if user has enough balance
    if (amount > balance) {
      throw next(new ErrorResponse("not enough funds", 402));
    }

    // debit user balance
    await User.update(
      { balance: Sequelize.literal(`balance - ${amount}`) },
      { where: { userId: id } }
    );

    // save new trade to DB
    const pair = setPair(tradeType);
    const newTradeRecord = await ActiveTrades.create({
      userId: id,
      amount,
      tradeType,
      pair,
    });

    return `Trade ID: ${newTradeRecord.tradeId}`;
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};

function setPair(tradeType) {
  var value;
  switch (tradeType) {
    case "crypto":
      value = "BTC/USDT";
      break;

    case "forex":
      value = "EUR/USD";
      break;

    case "stocks":
      value = "US500";
      break;
    case "metals":
      value = "XAU/USD";
      break;

    default:
      value = "crypto";
      break;
  }
  return value;
}

module.exports = newTrade;

// when admin edits a trade, the system checks
// if: the incoming profit is greater than or equal to the target amount.
// if: its not, it simply updates the new specified details
// else: it updated the specified details && changes the the status of the trade to closed && credits the user with the profit
