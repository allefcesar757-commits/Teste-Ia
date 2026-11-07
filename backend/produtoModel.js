const db = require('../config/database');

const ProdutoModel = {
    buscarTodos: async () => {
        const [linhas] = await db.query('SELECT * FROM produtos ORDER BY id DESC');
        return linhas;
    },
    buscarPorSku: async (sku) => {
        // Proteção total contra SQL Injection
        const [linhas] = await db.query('SELECT * FROM produtos WHERE sku = ?', [sku]);
        return linhas[0];
    },
    criar: async (nome, sku, preco, estoque) => {
        const [resultado] = await db.query(
            'INSERT INTO produtos (nome, sku, preco, estoque) VALUES (?, ?, ?, ?)',
            [nome, sku, preco, estoque]
        );
        return resultado.insertId;
    }
};

module.exports = ProdutoModel;