const allUsers = require("../services/admin/allUsers.service");

exports.allUsers = async (req, res, next) => {
  const responseObj = await allUsers(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};
