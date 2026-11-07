const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/produtoController');

router.get('/', ProdutoController.listar);
router.post('/', ProdutoController.criar);

module.exports = router;