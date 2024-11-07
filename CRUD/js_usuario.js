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

function validateForm(){
    // nome
    const nome = document.getElementById('id_nome_usuario').value
    if (!(/^[A-Za-zÀ-ÿ\s]+$/).test(nome)) {
        document.getElementById('responseMessage').textContent = 'Nome contem caracteres inválidos.'
        return true
    }

    // CPF
    const cpf = document.getElementById('id_cpf_usuario').value
    if(/[^\d]/g.test(cpf)){
        document.getElementById('responseMessage').textContent = 'CPF com formato inválido, utilize apenas números.'
        return true;
    }else if(cpf.length !== 11){        
        document.getElementById('responseMessage').textContent = 'CPF com formato inválido, verifique se possui 11 números.'
        return true
    }

    // idade
    const nascimento = document.getElementById('nascimento_usuario').value
    const data1 = new Date(nascimento)
    const datanow = new Date()
    const data3 = new Date('1900-01-01')
    if(data1 > datanow || data1 < data3){
        document.getElementById('responseMessage').textContent = 'Data inválida.'
        return true
    }}


//fetch - formulario

document.getElementById('cadastro_usuario').addEventListener('submit', function(event) {
    event.preventDefault();

    if(validateForm()){
        return
    }

    const formData = new FormData(this);
    
    fetch('cadastrar_usuario.php', {  
        method: 'POST',
        body: formData
    })
    .then(response => {return response.text(); 
    })
    .then(data => {
        const resposta = document.getElementById('responseMessage')
        resposta.innerHTML = ''
        resposta.innerHTML = data
        if (data.includes("sucesso")) {
            clearForm()
        }
    })
    .catch(error => {
        console.error('Erro:', error); 
    });
});

function clearForm(){
    const inputs = document.querySelectorAll('input')
    for(x of inputs){
        x.value = ''
    }
}

// fetch - READ
fetch('ler_usuarios.php') // -> requisicao GET
    .then(response => response.json())
    .then(data => {
        populateTableUsuario(data);
    })
    .catch(error => console.error("Erro na requisição:", error));


function populateTableUsuario(users) {
    const tableBody = document.querySelector("#table_usuario tbody");
    tableBody.innerHTML = "";

    for (const user of users) {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = user["id_usuario"];
        row.appendChild(idCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = user['nome_usuario']; 
        row.appendChild(nameCell);

        const emailCell = document.createElement("td");
        emailCell.textContent = user.email_usuario;
        row.appendChild(emailCell);

        const cpfCell = document.createElement("td");
        cpfCell.textContent = user.CPF_usuario;
        row.appendChild(cpfCell);

        const nascimentoCell = document.createElement("td");
        nascimentoCell.textContent = user.data_nascimento_usuario;
        row.appendChild(nascimentoCell);

        const generoCell = document.createElement("td");
        generoCell.textContent = user.genero_usuario;
        row.appendChild(generoCell);

        const deleteCell = document.createElement("td");
        deleteCell.style.textAlign = 'center';
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.onclick = () => deleteUser(user.id_usuario);
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);    

        const editCell = document.createElement("td");
        editCell.style.textAlign = 'center';
        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.onclick = () => editUser(user.id_usuario);
        editCell.appendChild(editButton);
        row.appendChild(editCell);

        tableBody.appendChild(row);
    }
}



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



