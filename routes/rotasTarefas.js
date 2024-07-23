const { Router } = require('express');
const { getTarefas, addTarefa, updateTarefa,
     deleteTarefa, getTarefaPorCodigo } = 
    require('../controllers/tarefaController');

const rotasTarefas = new Router();

rotasTarefas.route('/tarefa')
               .get(getTarefas)
               .post(addTarefa)
               .put(updateTarefa);

rotasTarefas.route('/tarefa/:codigo') 
               .get(getTarefaPorCodigo)              
               .delete(deleteTarefa);

module.exports = { rotasTarefas };