const botoes = document.querySelectorAll('#btn_usuario, #btn_nutri, #btn_treinador');

function aplicarEstiloAtivo(event) {
    for (botao of botoes) {
        botao.classList.remove('ativo');
    }
    event.target.classList.add('ativo');
}

btn_usuario.addEventListener('click', aplicarEstiloAtivo);
btn_nutri.addEventListener('click', aplicarEstiloAtivo);
btn_treinador.addEventListener('click', aplicarEstiloAtivo);
