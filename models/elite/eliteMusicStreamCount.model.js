module.exports = (sequelize, Sequelize) => {
  const eliteMusicStreamCount = sequelize.define("eliteMusicStreamCount", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    musicId: {
      type: Sequelize.UUID,
    },
  });
  return eliteMusicStreamCount;
};
