const { EliteVideoAnalytics } = require("../../../models");

const getAllEliteVideosAnalytics = async (req, next) => {
  try {
    const videoId = req.params.videoId;
    if (!videoId) {
      throw new Error("Video ID parameter was not included in request url");
    }
    const allEliteVideosAnalytics = await EliteVideoAnalytics.findOne({
      where: {
        video_id: videoId,
      },
    });
    console.log(allEliteVideosAnalytics);
    if (allEliteVideosAnalytics === null)
      throw new Error("no analytics where found for this video");

    return allEliteVideosAnalytics;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = getAllEliteVideosAnalytics;
