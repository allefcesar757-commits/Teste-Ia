const API_URL = 'http://localhost:3000/api';

function mostrarToast(mensagem, tipo) {
    const toast = document.getElementById('toast');
    toast.textContent = mensagem;
    toast.className = `toast ${tipo}`;
    setTimeout(() => { toast.className = 'toast'; }, 4000);
}

function limparErros() {
    document.querySelectorAll('input').forEach(input => input.classList.remove('input-erro'));
    document.querySelectorAll('.erro-msg').forEach(msg => msg.classList.remove('ativo'));
}

function exibirErros(erros) {
    erros.forEach(erro => {
        const input = document.getElementById(erro.campo);
        const span = document.getElementById(`erro-${erro.campo}`);
        if (input && span) {
            input.classList.add('input-erro');
            span.textContent = erro.mensagem;
            span.classList.add('ativo');
        }
    });
}