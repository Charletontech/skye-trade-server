const { sequelize, DataTypes } = require("./db.config");

const Kyc = sequelize.define(
  "Kyc",
  {
    kycId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    idType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idFrontUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idBackUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
  },
  {
    tableName: "kyc",
    timestamps: true,
  }
);

module.exports = Kyc;
