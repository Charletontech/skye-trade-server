const {
  EliteVideoAnalytics,
  Sequelize,
  EliteVideoViewsCount,
} = require("../../models");
const ErrorResponse = require("../../utils/errorResponse");

const videoPlayedWebhook = async (req, next) => {
  try {
    const videoId = req.params.videoId;
    if (!videoId) {
      throw new Error("Video ID parameter was not included in request url");
    }

    try {
      const updateTotalViews = await EliteVideoAnalytics.update(
        { totalViews: Sequelize.literal("totalViews  + 1") },
        { where: { video_id: videoId } }
      );

      const recordViewDetails = await EliteVideoViewsCount.create({
        video_id: videoId,
      });
    } catch (err) {
      throw new Error("An error occurred updating database");
    }

    return "view analytic recorded successfully";
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
};

module.exports = videoPlayedWebhook;
