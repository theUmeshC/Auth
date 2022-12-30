const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "users",
  "root",
  process.env.User_Database_Password,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

module.exports = sequelize;