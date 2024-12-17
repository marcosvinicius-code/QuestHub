const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/db.js");
const questionModel = require("./database/Question.js");

// Database Sequelize
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com banco de dados!");
  })
  .catch(() => {
    console.log(msgErro);
  });

// Config EJS
app.set("view engine", "ejs");
app.use(express.static("public"));

// Config body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rotas
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/question", (req, res) => {
  res.render("perguntar");
});

app.post("/savequestion", (req, res) => {
  let titulo = req.body.titulo;
  let descricao = req.body.descricao;
  res.send(
    "Formulário recebido! titulo " + titulo + " " + " descricao " + descricao
  );
});

app.listen(8000, () => {
  console.log("App rodando!");
});
