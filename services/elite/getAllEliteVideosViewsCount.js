const { EliteVideoViewsCount } = require("../../models");
const ErrorResponse = require("../../utils/errorResponse");

const getAllEliteVideosViewsCount = (req, next) => {
  try {
    const videoId = req.params.videoId;
    if (!videoId) {
      throw new Error("Video ID parameter was not included in request url");
    }
    console.log(`${videoId}`.yellow);
    const allEliteViewsCount = EliteVideoViewsCount.findAll({
      where: {
        video_id: videoId,
      },
    });
    return allEliteViewsCount;
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = getAllEliteVideosViewsCount;
