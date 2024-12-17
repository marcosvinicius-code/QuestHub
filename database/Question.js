const Sequelize = require("sequelize");
const connection = require("./db.js");

const Question = connection.define("questions", {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Question.sync({ force: false }).then(() => {});
