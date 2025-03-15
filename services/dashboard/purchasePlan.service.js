const Plans = require("../../models/plans.model");
const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/errorResponse");

const purchasePlan = async (req, res, next) => {
  try {
    const { plan, amount, roi, user } = req.body;
    let duration;
    switch (plan) {
      case "Starter":
        duration = 2;
        break;

      case "Bronze":
        duration = 3;
        break;
      case "Silver":
        duration = 5;
        break;
      case "Veteran":
        duration = 8;
        break;

      default:
        throw next(new ErrorResponse("invalid plan selected", 400));
    }

    let matureDate = addDaysToCurrentDate(duration);

    // get user from db
    const findUser = await User.findOne({ where: { email: user } });
    const balance = findUser.dataValues.balance;
    if (balance < amount) {
      throw new Error("insufficient fund to purchase this plan");
    }

    const newBalance = findUser.dataValues.balance - amount;
    findUser.balance = newBalance;
    await findUser.save();

    // add to database
    const newPlan = await Plans.create({
      plan,
      amount,
      roi,
      user,
      duration,
      matureDate,
    });

    return `successfully purchased plan for ${user}`;
  } catch (err) {
    throw next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
};

function addDaysToCurrentDate(days) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + days);

  // Format the date as yyyy-mm-dd
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

module.exports = purchasePlan;
