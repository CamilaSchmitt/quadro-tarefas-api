const { Router } = require('express');

const { rotasQuadros} = require('./rotasQuadros');
const { rotasTarefas} = require('./rotasTarefas');

const rotas = new Router();

rotas.use(rotasQuadros);
rotas.use(rotasTarefas);

module.exports = rotas;