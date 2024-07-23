const { pool } = require('../config');
const Quadro = require('../entities/Quadro');

const getQuadrosDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT codigo, nome, autor FROM quadros ORDER BY codigo`);
        return rows.map((quadro) => new Quadro(quadro.codigo, quadro.nome, quadro.autor));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addQuadroDB = async (body) => {
    try {
        const { nome, autor } = body;
        const results = await pool.query(`INSERT INTO quadros (nome, autor) VALUES ($1, $2)
        returning codigo,nome,autor`, [nome, autor]);
        const quadro = results.rows[0];
        return new Quadro(quadro.codigo, quadro.nome);
    } catch (err) {
        throw "Erro ao inserir o quadro: " + err;
    }
}

const updateQuadroDB = async (body) => {
    try {
        const { codigo, nome, autor } = body;        
        const results = await pool.query(`UPDATE quadros set nome = $2, autor = $3
        WHERE codigo = $1 returning codigo, nome, autor`, [codigo, nome, autor]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const quadro = results.rows[0];
        return new Quadro(quadro.codigo, quadro.nome, quadro.autor);
    } catch (err) {
        throw "Erro ao alterar o quadro: " + err;
    }
}

const deleteQuadroDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM quadros
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return `Quadro de código ${codigo} removido com sucesso!`;
        }
    } catch (err) {
        throw "Erro ao remover a quadro: " + err;
    }
}

const getQuadroPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM quadros
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo}`;
        } else {
            const quadro = results.rows[0];
            return new Quadro(quadro.codigo, quadro.nome, quadro.autor);
        }
    } catch (err) {
        throw "Erro ao recuperar o quadro: " + err;
    }
}

module.exports = {
    getQuadrosDB, addQuadroDB, updateQuadroDB, deleteQuadroDB,
    getQuadroPorCodigoDB
}
