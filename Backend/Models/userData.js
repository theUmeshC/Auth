const { Sequelize } = require("sequelize");

const sequelize = require("../utils/UserDatabase.js")

  const UserData = sequelize.define("UserData", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

module.exports = UserData;