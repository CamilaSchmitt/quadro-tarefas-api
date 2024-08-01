const { pool } = require('../config');
const Quadro = require('../entities/quadro');

const getQuadrosDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM quadros ORDER BY codigo');
        return rows.map((quadro) => new Quadro(quadro.codigo, quadro.nome, quadro.autor));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addQuadroDB = async (body) => {
    try {
        const { nome, autor } = body;
        const results = await pool.query(`INSERT INTO quadros (nome, autor)
        VALUES ($1, $2) RETURNING codigo, nome, autor`,[nome, autor]);
        const quadro = results.rows[0];
        return new Quadro(quadro.codigo, quadro.nome, quadro.autor);
    } catch (err) {
        throw "Erro: " + err;
    }
}

const updateQuadroDB = async (body) => {
    try {
        const { codigo, nome, autor } = body;
        const results = await pool.query(`UPDATE quadros SET nome = $2, autor = $3
        WHERE codigo = $1 RETURNING codigo, nome, autor`,[codigo, nome, autor]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`
        }
        const quadro = results.rows[0];
        return new Quadro(quadro.codigo, quadro.nome, quadro.autor);
    } catch (err) {
        throw "Erro ao alterar: " + err;
    }
}

const deleteQuadroDB = async (codigo) => {
    try {        
        const results = await pool.query(`DELETE FROM quadros
         WHERE codigo = $1 `,[codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`
        } else {
            return "Registro removido com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover: " + err;
    }
}

const getQuadroPorCodigoDB = async (codigo) => {
    try {        
        const results = await pool.query(`SELECT * FROM quadros
         WHERE codigo = $1 `,[codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo}`
        } else {
            const quadro = results.rows[0];
            return new Quadro(quadro.codigo, quadro.nome, quadro.autor);
        }
    } catch (err) {
        throw "Erro ao recuperar: " + err;
    }
}

module.exports = { getQuadrosDB, addQuadroDB, 
    updateQuadroDB, deleteQuadroDB, getQuadroPorCodigoDB }
