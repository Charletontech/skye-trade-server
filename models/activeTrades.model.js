const { sequelize, DataTypes } = require("./db.config");

const ActiveTrades = sequelize.define(
  "ActiveTrades",
  {
    tradeId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tradeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pair: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    target: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    profit: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("open", "closed"),
      defaultValue: "open",
    },
  },
  {
    // tableName: 'users',
    timestamps: true,
  }
);

module.exports = ActiveTrades;
