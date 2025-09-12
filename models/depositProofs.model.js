const { sequelize, DataTypes } = require("./db.config");

const DepositProofs = sequelize.define(
  "DepositProofs",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      defaultValue: "Not provided",
      allowNull: false,
    },
    walletAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(20, 1),
      allowNull: false,
    },
    proofUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "verified", "rejected"),
      defaultValue: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = DepositProofs;
