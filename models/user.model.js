const { sequelize, DataTypes } = require("./db.config");

const User = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      unique: {
        name: "unique_username",
      },
    },
    status: {
      type: DataTypes.ENUM("approved", "pending", "rejected"),
      defaultValue: "pending",
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      unique: {
        name: "unique_email",
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
      allowNull: false,
    },
    accountType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verificationDocumentType: {
      type: DataTypes.STRING,
      defaultValue: "Not verified",
    },
    verificationDocument: {
      type: DataTypes.STRING,
      defaultValue: "No document provided",
    },
    zipCode: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resetOtp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetOtpExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    // tableName: "skyetrade_users",
    timestamps: true,
  }
);

module.exports = User;
