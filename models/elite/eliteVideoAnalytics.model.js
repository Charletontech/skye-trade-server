const eliteVideo = require("./eliteVideo.model");

module.exports = (sequelize, Sequelize) => {
  const eliteVideoAnalytics = sequelize.define("eliteVideoAnalytics", {
    video_id: {
      type: Sequelize.UUID,
    },
    totalViews: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    totalTimeWatched: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    completionRate: {
      type: Sequelize.DECIMAL(5, 2),
      defaultValue: 0.0,
    },
    dropOffRate: {
      type: Sequelize.DECIMAL(5, 2),
      defaultValue: 0.0,
    },
  });

  return eliteVideoAnalytics;
};
