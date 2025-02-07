const { where } = require("sequelize");
const { EliteVideo } = require("../../models");
const ErrorResponse = require("../../utils/errorResponse");

const getAllEliteVideos = async (req, next) => {
  try {
    const userId = req.user.id;
    const allEliteVideos = await EliteVideo.findAll({
      where: {
        uploadedBy: userId,
      },
    });

    return allEliteVideos;
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = getAllEliteVideos;
