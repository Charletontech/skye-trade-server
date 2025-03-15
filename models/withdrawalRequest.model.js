const { sequelize, DataTypes } = require("./db.config");

const withdrawalRequest = sequelize.define(
  "withdrawalRequest",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    walletAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    walletType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // tableName: 'withdrawalRequests',  // Specify table name (optional)
    timestamps: true,
  }
);

module.exports = withdrawalRequest;
