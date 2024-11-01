const botoes = document.querySelectorAll('#btn_usuario, #btn_nutri, #btn_treinador');
const forms = document.querySelectorAll('#formulario_usuario, #formulario_nutricionista, #formulario_treinador');

function aplicarEstiloAtivo(botao) {
    const idBotao = document.getElementById(botao);
    for (btn of botoes) {
        btn.classList.remove('ativo');
    }
    idBotao.classList.add('ativo');
}

function mostrarFormulario(formulario) {
    const idForm = document.getElementById(formulario);
    for (formularios of forms) {
        formularios.style.display = 'none';
    }
    idForm.style.display = 'block';
}

document.getElementById('btn_usuario').addEventListener('click', function() {
    aplicarEstiloAtivo('btn_usuario');
    mostrarFormulario('formulario_usuario');
});
document.getElementById('btn_nutri').addEventListener('click', function() {
    aplicarEstiloAtivo('btn_nutri');
    mostrarFormulario('formulario_nutricionista');
});
document.getElementById('btn_treinador').addEventListener('click', function() {
    aplicarEstiloAtivo('btn_treinador');
    mostrarFormulario('formulario_treinador');
});


