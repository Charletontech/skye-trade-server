const { sequelize, DataTypes } = require("./db.config");

const withdrawalRequests = sequelize.define(
  "withdrawalRequests",
  {
    withdrawalId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "declined"),
      defaultValue: "pending",
    },
    walletAddress: {
      type: DataTypes.STRING,
    },
  },
  {
    // tableName: "",
    timestamps: false,
  }
);

module.exports = withdrawalRequests;
