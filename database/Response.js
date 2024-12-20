const Sequelize = require("sequelize");
const connection = require("./db");

const Response = connection.define("answers", {
  body: {
    type: Sequelize.TEXT,
    allowNull: false,  
  },
  questionId: {
    type: Sequelize.INTEGER,
    allowNull: false,  
  },
});

Response.sync({ force: false }); 
module.exports = Response;
