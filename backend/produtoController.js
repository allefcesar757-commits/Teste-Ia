const ProdutoService = require('../services/produtoService');
const ProdutoModel = require('../models/produtoModel');

const ProdutoController = {
    listar: async (req, res) => {
        try {
            const produtos = await ProdutoModel.buscarTodos();
            res.status(200).json(produtos);
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ status: 'erro', mensagem: 'Erro interno no servidor.' });
        }
    },
    criar: async (req, res) => {
        try {
            const resultado = await ProdutoService.cadastrarProduto(req.body);
            if (resultado.status === 'erro') {
                return res.status(400).json(resultado);
            }
            res.status(201).json(resultado);
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ status: 'erro', mensagem: 'Erro interno no servidor.' });
        }
    }
};

module.exports = ProdutoController;