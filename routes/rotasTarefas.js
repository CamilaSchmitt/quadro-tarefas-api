const { Router } = require('express');

const { verificaJWT } = require('../controllers/segurancaController');

const {  getTarefas, addTarefa, updateTarefa, deleteTarefa, getTarefaPorCodigo } = require('../controllers/tarefaController');

const rotasTarefas = new Router();

rotasTarefas.route('/tarefa')
   .get(verificaJWT, getTarefas)
   .post(verificaJWT, addTarefa)
   .put(verificaJWT, updateTarefa)

rotasTarefas.route('/tarefa/:codigo')
   .get(verificaJWT, getTarefaPorCodigo)
   .delete(verificaJWT, deleteTarefa)

module.exports = { rotasTarefas };