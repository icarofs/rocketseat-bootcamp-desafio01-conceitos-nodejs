const express = require("express");

const app = express();

app.use(express.json());

const projetos = [
  {
    id: "1",
    title: "Novo Projeto",
    tasks: []
  }
];

app.get("/projetos", (req, res) => {
  return res.json(projetos);
});

app.post("/projetos", (req, res) => {
  const { id, title } = req.body;

  const projeto = {
    id,
    title,
    tasks: []
  };

  projetos.push(projeto);

  return res.json(projetos);
});

app.post("/projetos/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const projeto = projetos.find(p => p.id == id);

  projeto.tasks.push(title);

  return res.json(projeto);
});

app.put("/projetos/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const projeto = projetos.find(p => p.id == id);

  projeto.title = title;

  return res.json(projeto);
});

app.delete("/projetos/:id", (req, res) => {
  const { id } = req.params;

  const projectIndex = projetos.findIndex(p => p.id == id);

  projetos.splice(projectIndex, 1);

  return res.send("Deletado com sucesso!");
});

app.listen(3001);
