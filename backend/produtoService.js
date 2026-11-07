const ProdutoModel = require('../models/produtoModel');

const ProdutoService = {
    cadastrarProduto: async (dados) => {
        const { nome, sku, preco, estoque } = dados;
        let erros = [];

        // Validações de negócio
        if (!nome) erros.push({ campo: 'nome', mensagem: 'O nome do produto é obrigatório.' });
        if (!sku) erros.push({ campo: 'sku', mensagem: 'O SKU é obrigatório.' });
        if (preco < 0 || isNaN(preco)) erros.push({ campo: 'preco', mensagem: 'O preço não pode ser negativo.' });
        if (estoque < 0 || isNaN(estoque)) erros.push({ campo: 'estoque', mensagem: 'O estoque não pode ser negativo.' });

        if (erros.length > 0) {
            return { status: 'erro', mensagem: 'Corrija os campos destacados.', erros };
        }

        const produtoExistente = await ProdutoModel.buscarPorSku(sku);
        if (produtoExistente) {
            return { status: 'erro', mensagem: 'Falha no cadastro.', erros: [{ campo: 'sku', mensagem: `O SKU '${sku}' já está em uso.` }] };
        }

        const id = await ProdutoModel.criar(nome, sku, preco, estoque);
        return { 
            status: 'sucesso', 
            mensagem: `Produto '${nome}' cadastrado com sucesso!`, 
            dados: { id, sku } 
        };
    }
};

module.exports = ProdutoService;