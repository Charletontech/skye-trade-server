const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
    port: process.env.DB_PORT || 3306,
  }
);
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Database connected...".cyan);
  } catch (error) {
    console.error("Unable to connect to the database:".red.bold, error);
  }
}

async function syncedDB() {
  try {
    // await sequelize.sync();
    // await sequelize.sync({ force: true }); // force: true will drop the table if it exists and recreate it
    await sequelize.sync({ alter: true });
    console.log("Database & tables have been created!".green);
  } catch (error) {
    console.error("Error syncing the database:", error);
  }
}

async function disconnectDB() {
  try {
    await sequelize.close(); // Close the connection
    console.log("Database connection closed successfully!");
  } catch (error) {
    console.error("Error closing the database connection:".red.bold, error);
  }
}

module.exports = { sequelize, DataTypes, connectDB, syncedDB, disconnectDB };
