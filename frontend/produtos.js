async function carregarProdutos() {
    try {
        const res = await fetch(`${API_URL}/produtos`);
        const produtos = await res.json();
        const lista = document.getElementById('lista-produtos');
        lista.innerHTML = produtos.map(p => `
            <div class="item">
                <strong>${p.nome}</strong> (SKU: ${p.sku})<br>
                R$ ${p.preco} | Estoque: ${p.estoque} un.
            </div>
        `).join('');
    } catch (e) {
        mostrarToast('Erro ao carregar dados do servidor.', 'erro');
    }
}

document.getElementById('form-produto').addEventListener('submit', async (e) => {
    e.preventDefault();
    limparErros();

    const dados = {
        nome: document.getElementById('nome').value,
        sku: document.getElementById('sku').value,
        preco: parseFloat(document.getElementById('preco').value),
        estoque: parseInt(document.getElementById('estoque').value)
    };

    try {
        const res = await fetch(`${API_URL}/produtos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        const resposta = await res.json();

        if (res.status === 201) {
            mostrarToast(resposta.mensagem, 'sucesso');
            e.target.reset();
            carregarProdutos();
        } else if (res.status === 400 && resposta.erros) {
            mostrarToast(resposta.mensagem, 'erro');
            exibirErros(resposta.erros);
        } else {
            mostrarToast(resposta.mensagem || 'Erro desconhecido.', 'erro');
        }
    } catch (erro) {
        mostrarToast('Erro crítico de conexão com o servidor.', 'erro');
    }
});

carregarProdutos();