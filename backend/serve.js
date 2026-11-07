require('dotenv').config();
const express = require('express');
const cors = require('cors');

const produtoRoutes = require('./src/routes/produtoRoutes');

const app = express();
app.use(cors());
app.use(express.json()); // Permite receber JSON no body

app.use('/api/produtos', produtoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando com segurança na porta ${PORT}`);
});s