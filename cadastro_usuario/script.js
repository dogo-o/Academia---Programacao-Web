const botoes = document.querySelectorAll('#btn_usuario, #btn_nutri, #btn_treinador');

function aplicarEstiloAtivo(botaoAtivo) {
    for (botao of botoes) {
        botao.classList.remove('ativo');
    }
    botaoAtivo.target.classList.add('ativo');
}

for (botao of botoes) {
    botao.addEventListener('click', aplicarEstiloAtivo);
}
