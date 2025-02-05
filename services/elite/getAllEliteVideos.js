const { where } = require("sequelize");
const { EliteVideo } = require("../../models");
const ErrorResponse = require("../../utils/errorResponse");

const getAllEliteVideos = async (req, next) => {
  try {
    const videoId = req.params.videoId;
    if (!videoId) {
      throw new Error("Video ID parameter was not included in request url");
    }
    const allEliteVideos = await EliteVideo.findAll({
      where: {
        id: videoId,
      },
    });

    return allEliteVideos;
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = getAllEliteVideos;
