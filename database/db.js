const Sequelize = require("sequelize");

const connection = new Sequelize("QuestHub", "root", "admin123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
