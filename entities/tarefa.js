class Tarefa {
    constructor(codigo, titulo, descricao, prioridade, 
        data_criacao, quadro, quadro_nome
    ){
        this.codigo = codigo;
        this.titulo = titulo;
        this.descricao = descricao;
        this.prioridade = prioridade;
        this.data_criacao = data_criacao;
        this.quadro = quadro;
        this.quadro_nome = quadro_nome;
    }
}

module.exports = Tarefa;