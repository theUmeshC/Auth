const { Sequelize } = require("sequelize");

const sequelize = require("../utils/UserDatabase.js")

  const Users = sequelize.define("Users", {
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

module.exports = Users;