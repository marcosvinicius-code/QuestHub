const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/db.js");
const Question = require("./database/Question.js");
const Response = require("./database/Response.js");

// Database Sequelize
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com banco de dados!");
  })
  .catch((error) => {
    console.log("Erro ao conectar ao banco de dados:", error.message);
  });

// Config EJS
app.set("view engine", "ejs");
app.use(express.static("public"));

// Config body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas
app.get("/", (req, res) => {
  Question.findAll({ raw: true, order: [["id", "DESC"]] }).then((questions) => {
    console.log(questions);
    res.render("index", {
      questions: questions,
    });
  });
});

app.get("/question", (req, res) => {
  res.render("perguntar");
});

app.post("/savequestion", (req, res) => {
  let titulo = req.body.titulo;
  let descricao = req.body.descricao;
  Question.create({
    titulo: titulo,
    descricao: descricao,
  }).then(() => {
    res.redirect("/");
  });
});

app.get("/pergunta/:id", (req, res) => {
  let id = req.params.id;
  Question.findOne({
    where: { id: id },
  })
    .then((question) => {
      if (question != undefined) {
        res.render("pergunta", { question: question });
      } else {
        res.redirect("/");
      }
    })
    .catch((error) => {
      console.log("Erro ao buscar pergunta:", error.message);
      res.redirect("/");
    });
});

app.post("/response", (req, res) => {
  let body = req.body.body;
  let questionId = req.body.question;

  if (!body || body.trim() === "") {
    console.log("Resposta vazia");
    return res.redirect("/pergunta/" + questionId); 
  }

  Response.create({
    body: body,
    questionId: questionId,
  }).then(() => {
    res.redirect("/pergunta/" + questionId);
  }).catch((error) => {
    console.log("Erro ao salvar resposta:", error);
    res.redirect("/pergunta/" + questionId); 
  });
});




app.listen(8000, () => {
  console.log("App rodando!");
});
