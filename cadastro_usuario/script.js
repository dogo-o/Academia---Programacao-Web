const botoes = document.querySelectorAll('#btn_usuario, #btn_nutri, #btn_treinador');
const cruds = document.querySelectorAll('#crud_usuario, #crud_nutri, #crud_treinador');
const forms = document.querySelectorAll('#formulario_usuario, #formulario_nutricionista, #formulario_treinador')

function aplicarEstiloAtivo(botao) {
    const idBotao = document.getElementById(botao);
    for (btn of botoes) {
        btn.classList.remove('ativo');
    }
    idBotao.classList.add('ativo');
}

function mostrarCrud(crud) {
    const idCrud = document.getElementById(crud);
    for (x of cruds) {
        x.style.display = 'none';
    }
    idCrud.style.display = 'block';
}

function mostrarSenha() {
    const senha = document.getElementsByClassName('senha');
    for (i in senha) {
        if (senha[i].type === 'password') {
            senha[i].type = 'text';
        }else {
            senha[i].type = 'password';
        }
    }
}

function mostrarForm(form){
    const idForm = document.getElementById(form)
    const selectUser = document.getElementById('select_user')
    for (x of forms) {
        x.style.display = 'none';
    }
    for (y of cruds) {
        y.style.display = 'none';
    }
    idForm.style.display = 'block'
    selectUser.style.display = 'none'
}

function voltar(btnVoltar,respective_crud){
    idBtn = document.getElementById(btnVoltar)
    const selectUser = document.getElementById('select_user')
    const crudUser = document.getElementById(respective_crud)
    for (x of forms) {
        x.style.display = 'none';
    }
    selectUser.style.display = 'flex'
    crudUser.style.display = 'block'
}


//fetch - formulario

document.getElementById('cadastro_usuario').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Formulário enviado');
    
    const formData = new FormData(this);
    
    fetch('cadastrar_usuario.php', {  
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log('Resposta recebida'); 
        return response.text(); 
    })
    .then(data => {
        document.getElementById('responseMessage').innerHTML = data;
        console.log(data); 
    })
    .catch(error => {
        console.error('Erro:', error); 
    });
});




// botao select user

document.getElementById('btn_usuario').addEventListener('click', function() {
    aplicarEstiloAtivo('btn_usuario');
    mostrarCrud('crud_usuario');
});
document.getElementById('btn_nutri').addEventListener('click', function() {
    aplicarEstiloAtivo('btn_nutri');
    mostrarCrud('crud_nutri');
});
document.getElementById('btn_treinador').addEventListener('click', function() {
    aplicarEstiloAtivo('btn_treinador');
    mostrarCrud('crud_treinador');
});

// botao add

document.getElementById('add_usuario').addEventListener('click', function(){
    mostrarForm('formulario_usuario')})
document.getElementById('add_nutri').addEventListener('click', function(){
    mostrarForm('formulario_nutricionista')})
document.getElementById('add_treinador').addEventListener('click', function(){
    mostrarForm('formulario_treinador')})

// botao voltar

document.getElementById('btn_voltar_form_usuario').addEventListener('click', function(){
    voltar('btn_voltar_form_usuario','crud_usuario')})
document.getElementById('btn_voltar_form_nutri').addEventListener('click', function(){
    voltar('btn_voltar_form_nutri','crud_nutri')})
document.getElementById('btn_voltar_form_treinador').addEventListener('click', function(){
    voltar('btn_voltar_form_treinador','crud_treinador')})



