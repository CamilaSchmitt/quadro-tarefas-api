const { Router } = require('express');

const { rotasQuadros } = require('./rotasQuadros');
const { rotasTarefas } = require('./rotasTarefas');
const { login }  = require('../controllers/segurancaController');

const rotas = new Router();

rotas.route("/login").post(login);

rotas.use(rotasQuadros);
rotas.use(rotasTarefas);

module.exports = rotas;