module.exports = (sequelize, Sequelize) => {
  const eliteVideoViewsCount = sequelize.define("eliteVideoViewsCount", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    video_id: {
      type: Sequelize.UUID,
    },
  });
  return eliteVideoViewsCount;
};
