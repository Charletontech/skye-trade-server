const { sequelize, DataTypes } = require("./db.config");

const fundRequest = sequelize.define(
  "fundRequest",
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
      defaultValue: 0,
    },
    receiptUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
  },
  {
    // tableName: 'fundRequests',  // Specify table name (optional)
    timestamps: true,
  }
);

module.exports = fundRequest;
