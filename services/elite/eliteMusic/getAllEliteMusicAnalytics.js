const { EliteMusicAnalytics } = require("../../../models");
const ErrorResponse = require("../../../utils/errorResponse");

const getAllEliteMusicAnalytics = async (req, next) => {
  try {
    const musicId = req.params.musicId;
    if (!musicId) {
      throw new Error("Video ID parameter was not included in request url");
    }
    const allEliteMusicAnalytics = EliteMusicAnalytics.findOne({
      where: {
        musicId,
      },
    });
    return allEliteMusicAnalytics;
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
};

module.exports = getAllEliteMusicAnalytics;
