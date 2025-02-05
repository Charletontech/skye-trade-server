const { EliteVideoAnalytics } = require("../../models");
const ErrorResponse = require("../../utils/errorResponse");

const getAllEliteVideosAnalytics = async (req, next) => {
  try {
    const videoId = req.params.videoId;
    if (!videoId) {
      throw new Error("Video ID parameter was not included in request url");
    }
    const allEliteVideosAnalytics = EliteVideoAnalytics.findOne({
      where: {
        video_id: videoId,
      },
    });
    return allEliteVideosAnalytics;
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
};

module.exports = getAllEliteVideosAnalytics;
