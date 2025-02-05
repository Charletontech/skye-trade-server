const { EliteVideoAnalytics, Sequelize } = require("../../models");
const ErrorResponse = require("../../utils/errorResponse");

const videoEndedWebhook = async (req, next) => {
  const { videoId, minutesWatched, finishedWatching } = req.body;
  //   determine whether to increase completionRate or dropOffRate according to if user finished watching or not
  const updates = finishedWatching
    ? {
        totalTimeWatched: Sequelize.literal(
          `totalTimeWatched  + ${minutesWatched}`
        ),
        completionRate: Sequelize.literal(`completionRate  + 1`),
      }
    : {
        totalTimeWatched: Sequelize.literal(
          `totalTimeWatched  + ${minutesWatched}`
        ),
        dropOffRate: Sequelize.literal(`dropOffRate  + 1`),
      };
  try {
    await EliteVideoAnalytics.update(updates, { where: { video_id: videoId } });
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }

  return "Successfully updated database for view analytics";
};
module.exports = videoEndedWebhook;
