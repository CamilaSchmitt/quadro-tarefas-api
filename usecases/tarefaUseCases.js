const { pool } = require('../config');
const Tarefa = require('../entities/tarefa');

const getTarefasDB = async () => {
    try {
        const { rows } = await pool.query(`
SELECT t.codigo as codigo, t.titulo as titulo, t.descricao as descricao, 
t.prioridade as prioridade, to_char(t.data_criacao, 'YYYY-MM-DD') as data_criacao, 
t.quadro as quadro, q.nome as quadro_nome
FROM tarefas t
join quadros q on t.quadro = q.codigo
order by t.codigo`);
        return rows.map((tarefa) =>
            new Tarefa(tarefa.codigo, tarefa.titulo, tarefa.descricao,
                tarefa.prioridade, tarefa.data_criacao, tarefa.quadro, tarefa.quadro_nome));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addTarefaDB = async (body) => {
    try {
        const { titulo, descricao, prioridade, data_criacao, quadro } = body;
        const results = await pool.query(`INSERT INTO tarefas (titulo, descricao, 
            prioridade, data_criacao, quadro) VALUES ($1, $2, $3, $4, $5)
        returning codigo, titulo, descricao, prioridade, to_char(data_criacao, 'YYYY-MM-DD') as data_criacao, quadro`,
            [titulo, descricao, prioridade, data_criacao, quadro]);
        const tarefa = results.rows[0];
        return new Tarefa(tarefa.codigo, tarefa.titulo, tarefa.descricao,
            tarefa.prioridade, tarefa.data_criacao, tarefa.quadro, "");
    } catch (err) {
        throw "Erro ao inserir a tarefa: " + err;
    }
}

const updateTarefaDB = async (body) => {
    try {
        const { codigo, titulo, descricao, prioridade, data_criacao, quadro } = body;
        const results = await pool.query(`UPDATE tarefas set titulo = $2, 
            descricao = $3, prioridade = $4, data_criacao = $5, quadro = $6
        WHERE codigo = $1 returning codigo,titulo, descricao, prioridade, 
        to_char(data_criacao, 'YYYY-MM-DD') as data_criacao, 
        quadro`,
            [codigo, titulo, descricao, prioridade, data_criacao, quadro]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const tarefa = results.rows[0];
        return new Tarefa(tarefa.codigo, tarefa.titulo, tarefa.descricao, tarefa.prioridade, tarefa.data_criacao, tarefa.quadro, "");
    } catch (err) {
        throw "Erro ao alterar a tarefa: " + err;
    }
}

const deleteTarefaDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM tarefas
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return `Tarefa de código ${codigo} removida com sucesso!`;
        }
    } catch (err) {
        throw "Erro ao remover a tarefa: " + err;
    }
}

const getTarefaPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT t.codigo as codigo, 
            t.titulo as titulo, t.descricao as descricao, 
t.prioridade as prioridade, to_char(t.data_criacao, 'YYYY-MM-DD') as data_criacao, 
t.quadro as quadro, q.nome as quadro_nome
FROM tarefas t
join quadros q on t.quadro = q.codigo
        WHERE t.codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo}`;
        } else {
            const tarefa = results.rows[0];
            return new Tarefa(tarefa.codigo, tarefa.titulo, tarefa.descricao,
                tarefa.prioridade, tarefa.data_criacao, tarefa.quadro, tarefa.quadro_nome, "");
        }
    } catch (err) {
        throw "Erro ao recuperar a tarefa: " + err;
    }
}

module.exports = {
    getTarefasDB, addTarefaDB, updateTarefaDB, deleteTarefaDB, getTarefaPorCodigoDB
}
