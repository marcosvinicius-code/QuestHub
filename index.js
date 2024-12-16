const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/question", (req, res) => {
  res.render("perguntar");
});

app.post("/savequestion", (req, res) => {
    res.send("Formulário recebido!")
});

app.listen(8000, () => {
  console.log("App rodando!");
});
