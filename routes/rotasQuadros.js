const { Router } = require('express');
const { getQuadros, addQuadro, updateQuadro, 
    deleteQuadro, getQuadroPorCodigo } = 
    require('../controllers/quadroController');

const rotasQuadros = new Router();

rotasQuadros.route('/quadro')
               .get(getQuadros)
               .post(addQuadro)
               .put(updateQuadro);

rotasQuadros.route('/quadro/:codigo') 
               .get(getQuadroPorCodigo)              
               .delete(deleteQuadro);

module.exports = { rotasQuadros };