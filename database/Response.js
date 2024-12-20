const Sequelize = require("sequelize");
const connection = require("./db");

const Response = connection.define("answers", {
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  questionid: {
    type: Sequelize.INTEGER,
    AllowNull: false,
  },
});

Response.sync({ force: false });

module.exports = Response;
