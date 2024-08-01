const { getQuadrosDB, addQuadroDB, updateQuadroDB, deleteQuadroDB,
  getQuadroPorCodigoDB } = require('../usecases/quadroUseCases');

const getQuadros = async (request, response) => {
  await getQuadrosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
          status : 'error',
          message : 'Erro ao consultar os quadros: ' + err
        }))
}

const addQuadro = async (request, response) => {
  await addQuadroDB(request.body)
        .then(data => response.status(200).json({
              status : "success", message : "Quadro criado",
              objeto : data
        }))
        .catch(err => response.status(400).json({
          status : 'error',
          message : err
        }))
}

const updateQuadro = async (request, response) => {
  await updateQuadroDB(request.body)
        .then(data => response.status(200).json({
              status : "success", message : "Quadro alterado",
              objeto : data
        }))
        .catch(err => response.status(400).json({
          status : 'error',
          message : err
        }))
}

const deleteQuadro = async (request, response) => {
  await deleteQuadroDB(request.params.codigo)
        .then(data => response.status(200).json({
              status : "success", message : data
        }))
        .catch(err => response.status(400).json({
          status : 'error',
          message : err
        }))
}

const getQuadroPorCodigo = async (request, response) => {
  await getQuadroPorCodigoDB(request.params.codigo)
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
          status : 'error',
          message : err
        }))
}

module.exports = {
  getQuadros, addQuadro, updateQuadro, deleteQuadro, getQuadroPorCodigo
}