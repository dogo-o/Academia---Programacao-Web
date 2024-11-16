function validateForm3(){
    // nome
    const nome = document.getElementById('nome_treinador').value
    if (!(/^[A-Za-zÀ-ÿ\s]+$/).test(nome)) {
        document.getElementById('responseMessage3').textContent = 'Nome contem caracteres inválidos.'
        return true
    }

    // CPF
    const cpf = document.getElementById('cpf_treinador').value
    if(cpf.length !== 11){        
        document.getElementById('responseMessage3').textContent = 'CPF com formato inválido, verifique se possui 11 números.'
        return true
    }

    // telefone 
    let telefone  = document.getElementById('telefone_treinador').value
    if(/[^\d]/g.test(telefone)){
        document.getElementById('responseMessage3').textContent = 'Telefone com formato inválido, utilize apenas números.'
        return true;
    }else if(telefone.length !== 11){        
        document.getElementById('responseMessage3').textContent = 'Telefone com formato inválido, verifique se possui 2+9 números.'
        return true
    }

    // idade
    const nascimento = document.getElementById('nascimento_treinador').value
    const data1 = new Date(nascimento)
    const datanow = new Date()
    const data3 = new Date('1900-01-01')
    if(data1 > datanow || data1 < data3){
        document.getElementById('responseMessage3').textContent = 'Data inválida.'
        return true
    }}

//fetch - formulario
 
document.getElementById('cadastro_treinador').addEventListener('submit', function(event) {
    event.preventDefault(); // utiliza function(event) para poder usar this no formData

    if(validateForm3()){
        return
    }
    
    const formData = new FormData(this); // referencia o formulario atual
    
    fetch(formActionUrl3, {  
        method: 'POST',
        body: formData
    })
    .then(response => {return response.text(); //
    })
    .then(data => {
        const resposta = document.getElementById('responseMessage3')
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

function deletarTreinador(id_treinador) {
    let ctz = confirm('Tem certeza que deseja excluir?')
    if(ctz){
    fetch('./PHP/excluirTreinador.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_treinador })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            lerTreinador();
        } else {
            alert("Erro ao excluir treinador!");
        }
    })
    .catch(error => console.log('Erro ao excluir treinador: ' + error));
}
}

function lerTreinador(){
fetch('./PHP/ler_treinador.php') // -> requisicao GET
    .then(response => response.json())
    .then(data => {
        populateTableTreinador(data);
    })
    .catch(error => console.error("Erro na requisição:", error));
}
lerTreinador()

function lertreinador2(id_treinador){
    fetch('./PHP/editartreinador.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_treinador })
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
        populateFormtreinador(data.data)
        }
    })
    .catch(error => console.error("Erro na requisição: ", error))

}

function populateFormtreinador(data){
    mostrarForm('formulario_treinador')
    document.getElementById("id_treinador").value = data.id_treinador;
    document.getElementById("nome_treinador").value = data.nome_treinador;
    document.getElementById("email_treinador").value = data.email_treinador;
    document.getElementById("cpf_treinador").value = data.cpf_treinador;
    document.getElementById("telefone_treinador").value = data.telefone_treinador;
    document.getElementById("nascimento_treinador").value = data.nascimento_treinador;
    document.getElementById("genero_treinador").value = data.genero_treinador;
    document.getElementById("curso_treinador").value = data.curso_treinador;
    document.getElementById("instituicao_treinador").value = data.instituicao_treinador;
    document.getElementById("cref").value = data.cref;
    document.getElementById('btn_adicionar_treinador').style.display = 'none'
    document.getElementById('btn_editar_treinador').style.display = 'block'
    const elementos = document.getElementsByClassName('aaaaativo');
    for (let i of elementos) {
        i.style.display = 'none';
    }
    document.getElementById('senha_treinador').removeAttribute('required');
    document.getElementById('responseMessage').textContent = ''
    
}

function populateTableTreinador(treinadores) {
    const tableBody = document.querySelector("#table_treinador tbody");
    tableBody.innerHTML = "";

    for (const treinador of treinadores) {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = treinador["id_treinador"];
        row.appendChild(idCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = treinador['nome_treinador']; 
        row.appendChild(nameCell);

        const emailCell = document.createElement("td");
        emailCell.textContent = treinador.email_treinador;
        row.appendChild(emailCell);

        const cpfCell = document.createElement("td");
        cpfCell.textContent = treinador.cpf_treinador;
        row.appendChild(cpfCell);

        const telefoneCell = document.createElement("td");
        telefoneCell.textContent = treinador.telefone_treinador;
        row.appendChild(telefoneCell);

        const nascimentoCell = document.createElement("td");
        nascimentoCell.textContent = treinador.nascimento_treinador;
        row.appendChild(nascimentoCell);

        const generoCell = document.createElement("td");
        generoCell.textContent = treinador.genero_treinador;
        row.appendChild(generoCell);

        const instituicaoCell = document.createElement("td");
        instituicaoCell.textContent = treinador.instituicao_treinador;
        row.appendChild(instituicaoCell);
        
        const CRNCell = document.createElement("td");
        CRNCell.textContent = treinador.cref;
        row.appendChild(CRNCell);

        const deleteCell = document.createElement("td");
        deleteCell.style.textAlign = 'center';
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.onclick = () => deletarTreinador(treinador.id_treinador);
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);    

        const editCell = document.createElement("td");
        editCell.style.textAlign = 'center';
        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.onclick = () => lertreinador2(treinador.id_treinador);
        editCell.appendChild(editButton);
        row.appendChild(editCell);

        tableBody.appendChild(row);
    }
}

let formActionUrl3 = ''
document.getElementById('btn_adicionar_treinador').addEventListener('click', function () {
    formActionUrl3 = './PHP/cadastrar_treinador.php';});

document.getElementById('btn_editar_treinador').addEventListener('click', function () {
    formActionUrl3 = './PHP/editartreinador2.php';});