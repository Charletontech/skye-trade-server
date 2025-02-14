module.exports = (sequelize, Sequelize) => {
  const eliteMusicAnalytics = sequelize.define("eliteMusicAnalytics", {
    musicId: {
      type: Sequelize.UUID,
    },
    totalStreams: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    totalTimeListened: {
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

  return eliteMusicAnalytics;
};
