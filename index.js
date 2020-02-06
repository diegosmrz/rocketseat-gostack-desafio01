const express = require('express');

const server = express();

server.use(express.json());

//Dados
const projects = [
            ];

            //Middlewares
server.use((req, res, next) => {
  console.count("Requisições");
  console.log('Middleware global - Requisição chamada.');
  console.log(`Método: ${req.method}, URL: ${req.url}`);
  return next();
});

function checkIfProjectExists(req, res, next){
  const { id } = req.params;
  const project = projects.find(p => p.id == id);
  if (!project) {
    return res.status(400).json({ error: 'Project not found' });
  }
  return next();
}

//Routes
server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  };
  projects.push(project);

  return res.json(project);
});

server.get('/projects/:index', (req, res) => {
  return res.json(req.projects);
});

server.post('/projects/:id/tasks', checkIfProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

server.put('/projects/:id', checkIfProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

server.delete('/projects/:id', (req, res) => {
  const { id } = req.params;
  const index = projects.findIndex(p => p.id == id);
  projects.splice(index, 1);

  return res.send();
});

server.listen(3000);
