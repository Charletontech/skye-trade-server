const { EliteMusicStreamCount } = require("../../../models");

const getAllEliteMusicStreamsCount = async (req, next) => {
  try {
    const musicId = req.params.musicId;
    const streamsCount = await EliteMusicStreamCount.findAll({
      where: {
        musicId,
      },
    });
    return streamsCount;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = getAllEliteMusicStreamsCount;
