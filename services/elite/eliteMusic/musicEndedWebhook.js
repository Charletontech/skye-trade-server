const { EliteMusicAnalytics, Sequelize } = require("../../../models");

const musicEndedWebhook = async (req, next) => {
  const { musicId, minutesListened, finishedPlaying } = req.body;
  //   determine whether to increase completionRate or dropOffRate according to if user finished watching or not
  const updates = finishedPlaying
    ? {
        totalTimeListened: Sequelize.literal(
          `totalTimeListened  + ${minutesListened}`
        ),
        completionRate: Sequelize.literal(`completionRate  + 1`),
      }
    : {
        totalTimeListened: Sequelize.literal(
          `totalTimeListened  + ${minutesListened}`
        ),
        dropOffRate: Sequelize.literal(`dropOffRate  + 1`),
      };
  try {
    await EliteMusicAnalytics.update(updates, { where: { musicId: musicId } });
    return "Successfully updated database for music stream analytics";
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = musicEndedWebhook;
