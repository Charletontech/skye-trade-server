const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/errorResponse");

const editProfile = async (req, next) => {
  try {
    const { fullName, email, phone, countryOfResidence } = req.body;
    const { id } = req.user;
    const emailExists = await User.findOne({ where: { email } });

    const userData = await User.findOne({ where: { userId: id } });
    if (emailExists) {
      userData.fullName = fullName ?? userData.fullName;
      userData.phone = phone ?? userData.phone;
      userData.country = countryOfResidence ?? userData.country;
      userData.save();
      throw next(
        new ErrorResponse(
          "Email already exists. Use another email. Other information you provided has been updated accordingly.",
          400
        )
      );
    }
    userData.fullName = fullName ?? userData.fullName;
    userData.email = email ?? userData.email;
    userData.phone = phone ?? userData.phone;
    userData.country = countryOfResidence ?? userData.country;
    userData.save();
    return "Profile data successfully updated";
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = editProfile;
