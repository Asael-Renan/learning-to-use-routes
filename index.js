const express = require('express');
const bodyParser = require('body-parser');
const functions = require('./functions.js')

const app = express();
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(__dirname + '/public/index.html')
})

// Rota GET para listar todos os usuários
app.get('/users', async (req, res) => {
  res.json(await functions.getUsers());
});

// Rota POST para criar um novo usuário
app.post('/users', (req, res) => {
  const name = req.body.name
  const email = req.body.email
  if(functions.createUser(name, email)) {
    res.status(201);
  } else {
    res.status(404);
  }
});

// Rota PUT para atualizar um usuário existente com base no ID
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  if (!user) {
    res.status(404).send("Usuário não encontrado.");
  } else {
    user.name = req.body.name;
    res.json(user);
  }
});

// Rota DELETE para excluir um usuário existente com base no ID
app.delete('/users/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await functions.getUser({id: id, type: "id"});
  if (!user) {
    res.status(404).send("Usuário não encontrado.");
  } else {
    functions.deleteUser(user.id)
    .then(() => res.sendStatus(204))
    .catch(() => res.sendStatus(404))
  }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});