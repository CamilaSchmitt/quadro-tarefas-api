const { Router } = require('express');

const { verificaJWT } = require('../controllers/segurancaController');

const { getQuadros, addQuadro, 
    updateQuadro, deleteQuadro, getQuadroPorCodigo } 
    = require('../controllers/quadroController');

const rotasQuadros = new Router();

rotasQuadros.route('/quadro')
    .get(verificaJWT, getQuadros)
    .post(verificaJWT, addQuadro)
    .put(verificaJWT, updateQuadro)

rotasQuadros.route('/quadro/:codigo')
    .get(verificaJWT, getQuadroPorCodigo)
    .delete(verificaJWT, deleteQuadro)



module.exports = { rotasQuadros };