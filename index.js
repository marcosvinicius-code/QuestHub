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
app.get("/", async (req, res) => {
  try {
    const questions = await Question.findAll({
      raw: true,
      order: [["id", "DESC"]],
    });
    res.render("index", { questions });
  } catch (error) {
    console.log("Erro ao buscar perguntas:", error.message);
    res.status(500).send("Erro ao carregar perguntas");
  }
});

app.get("/question", (req, res) => {
  res.render("perguntar");
});

app.post("/savequestion", async (req, res) => {
  const { titulo, descricao } = req.body;
  if (!titulo || !descricao) {
    return res.status(400).send("Título e descrição são obrigatórios");
  }
  try {
    await Question.create({ titulo, descricao });
    res.redirect("/");
  } catch (error) {
    console.log("Erro ao salvar pergunta:", error);
    res.status(500).send("Erro ao salvar pergunta");
  }
});

app.get("/pergunta/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const question = await Question.findOne({ where: { id } });
    if (question) {
      const answers = await Response.findAll({
        where: { questionId: question.id },
        order: [["id", "DESC"]],
      });
      res.render("pergunta", { question, answers });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log("Erro ao buscar pergunta:", error.message);
    res.redirect("/");
  }
});

app.post("/response", async (req, res) => {
  const { body, questionId } = req.body;

  if (!body || body.trim() === "") {
    console.log("Resposta vazia");
    return res.redirect("/pergunta/" + questionId);
  }

  try {
    await Response.create({ body, questionId });
    res.redirect("/pergunta/" + questionId);
  } catch (error) {
    console.log("Erro ao salvar resposta:", error);
    res.redirect("/pergunta/" + questionId);
  }
});

app.listen(8000, () => {
  console.log("App rodando!");
});
