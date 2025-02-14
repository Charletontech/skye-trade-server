const {
  EliteMusicStreamCount,
  Sequelize,
  EliteMusicAnalytics,
} = require("../../../models");

const musicPlayedWebhook = async (req, next) => {
  try {
    const musicId = req.params.musicId;
    if (!musicId) {
      throw new Error("Music ID parameter was not included in request url");
    }

    try {
      const updateTotalStreams = await EliteMusicAnalytics.update(
        { totalStreams: Sequelize.literal("totalStreams  + 1") },
        { where: { musicId } }
      );

      const recordStreamDetails = await EliteMusicStreamCount.create({
        musicId,
      });
      return "stream count row recorded successfully";
    } catch (err) {
      throw new ErrorResponse(`An error occurred updating database: ${err}`);
    }
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = musicPlayedWebhook;
