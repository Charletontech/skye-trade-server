const { EliteVideoViewsCount } = require("../../../models");

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
    new Error(err);
  }
};
module.exports = getAllEliteVideosViewsCount;
