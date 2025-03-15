const maturedPlans = require("../../models/maturedPlans.model");
const Plans = require("../../models/plans.model");
const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/errorResponse");

const me = async (req, next) => {
  try {
    const { email } = req.user;
    const getUserData = await User.findOne({ where: { email } });
    const { fullName, balance } = getUserData.dataValues;
    let userData = { fullName, balance, email };
    const allPurchasedPlans = await Plans.findAll({ where: { user: email } });

    // update matured investments
    updateMaturedInvestments(allPurchasedPlans, getUserData);
    return { userData, allPurchasedPlans };
  } catch (err) {
    throw next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
};
async function updateMaturedInvestments(allPurchasedPlans, getUserData) {
  try {
    for (const element of allPurchasedPlans) {
      let each = element.dataValues;
      let maturedDate = each.matureDate;
      const investmentIsMatured = hasInvestedExceededMaturity(maturedDate);

      if (investmentIsMatured) {
        // add to matured investment table
        // const recordAsMatured = await maturedPlans.create({
        //   user: each.user,
        //   amount: each.amount,
        //   roi: each.roi,
        //   plan: each.plan,
        //   duration: each.duration,
        //   matureDate: each.matureDate,
        //   status: "completed",
        // });

        // credit user balance
        creditUser(getUserData, each.roi);
        deleteMaturedInvestment(each.id);
      }
    }
  } catch (error) {
    throw new Error(error);
  }
}

function hasInvestedExceededMaturity(maturedDate) {
  const maturityDate = new Date(maturedDate + "T00:00:00Z").getTime();
  const now = Date.now();
  return now > maturityDate;
}

async function creditUser(getUserData, amountToCredit) {
  try {
    // add roi profit to user balance
    getUserData.balance += amountToCredit;
    getUserData.save();
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteMaturedInvestment(investmentId) {
  const deletedInvestment = await Plans.destroy({
    where: { id: investmentId },
  });
}
module.exports = me;
