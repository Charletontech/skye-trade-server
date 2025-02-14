const { EliteVideoAnalytics, Sequelize } = require("../../../models");

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
    new Error(err);
  }

  return "Successfully updated database for view analytics";
};
module.exports = videoEndedWebhook;
