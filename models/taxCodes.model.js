const { sequelize, DataTypes } = require("./db.config");

const TaxCodes = sequelize.define(
  "TaxCodes",
  {
    taxCode: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM("used", "unused"),
      defaultValue: "unused",
    },
  },
  {
    // tableName: "kyc",
    timestamps: false,
  }
);

module.exports = TaxCodes;
