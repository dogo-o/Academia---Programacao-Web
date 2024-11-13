function validateForm2(){
    // nome
    const nome = document.getElementById('nome_nutri').value
    if (!(/^[A-Za-zÀ-ÿ\s]+$/).test(nome)) {
        document.getElementById('responseMessage2').textContent = 'Nome contem caracteres inválidos.'
        return true
    }

    // CPF
    const cpf = document.getElementById('cpf_nutri').value
    if(cpf.length !== 11){        
        document.getElementById('responseMessage2').textContent = 'CPF com formato inválido, verifique se possui 11 números.'
        return true
    }

    // telefone 
    let telefone  = document.getElementById('telefone_nutri').value
    if(/[^\d]/g.test(telefone)){
        document.getElementById('responseMessage2').textContent = 'Telefone com formato inválido, utilize apenas números.'
        return true;
    }else if(telefone.length !== 11){        
        document.getElementById('responseMessage2').textContent = 'Telefone com formato inválido, verifique se possui 2+9 números.'
        return true
    }

    // idade
    const nascimento = document.getElementById('nascimento_nutri').value
    const data1 = new Date(nascimento)
    const datanow = new Date()
    const data3 = new Date('1900-01-01')
    if(data1 > datanow || data1 < data3){
        document.getElementById('responseMessage2').textContent = 'Data inválida.'
        return true
    }}

//fetch - formulario
 
document.getElementById('cadastro_nutri').addEventListener('submit', function(event) {
    event.preventDefault(); // utiliza function(event) para poder usar this no formData

    if(validateForm2()){
        return
    }
    
    const formData = new FormData(this); // referencia o formulario atual
    
    fetch(formActionUrl2, {  
        method: 'POST',
        body: formData
    })
    .then(response => {return response.text(); //
    })
    .then(data => {
        const resposta = document.getElementById('responseMessage2')
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

function deletarNutri(id_nutri) {
    let ctz = confirm('Tem certeza que deseja excluir?')
    if(ctz){
    fetch('excluirNutri.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_nutri })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            lerNutri();
        } else {
            alert("Erro ao excluir nutricionista!");
        }
    })
    .catch(error => console.log('Erro ao excluir nutricionista: ' + error));
}
}

function lerNutri(){
fetch('ler_nutri.php') // -> requisicao GET
    .then(response => response.json())
    .then(data => {
        populateTableNutri(data);
    })
    .catch(error => console.error("Erro na requisição:", error));
}
lerNutri()

function lerNutri2(id_nutri){
    fetch('editarNutri.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_nutri })
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
        populateFormNutri(data.data)
        }
    })
    .catch(error => console.error("Erro na requisição: ", error))

}

function populateFormNutri(data){
    mostrarForm('formulario_nutricionista')
    document.getElementById("id_nutri").value = data.id_nutri;
    document.getElementById("nome_nutri").value = data.nome_nutri;
    document.getElementById("email_nutri").value = data.email_nutri;
    document.getElementById("cpf_nutri").value = data.CPF_nutri;
    document.getElementById("telefone_nutri").value = data.telefone_nutri;
    document.getElementById("nascimento_nutri").value = data.data_nascimento_nutri;
    document.getElementById("genero_nutri").value = data.genero_nutri;
    document.getElementById("curso_nutri").value = data.curso_superior_nutri;
    document.getElementById("instituicao_nutri").value = data.instituicai_nutri;
    document.getElementById("crn").value = data.crn;
    document.getElementById('btn_adicionar_nutri').style.display = 'none'
    document.getElementById('btn_editar_nutri').style.display = 'block'
    const elementos = document.getElementsByClassName('aaaaativo');
    for (let i of elementos) {
        i.style.display = 'none';
    }
    document.getElementById('senha_nutri').removeAttribute('required');
    document.getElementById('responseMessage').textContent = ''
    
}

function populateTableNutri(nutris) {
    const tableBody = document.querySelector("#table_nutri tbody");
    tableBody.innerHTML = "";

    for (const nutri of nutris) {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = nutri["id_nutri"];
        row.appendChild(idCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = nutri['nome_nutri']; 
        row.appendChild(nameCell);

        const emailCell = document.createElement("td");
        emailCell.textContent = nutri.email_nutri;
        row.appendChild(emailCell);

        const cpfCell = document.createElement("td");
        cpfCell.textContent = nutri.CPF_nutri;
        row.appendChild(cpfCell);

        const telefoneCell = document.createElement("td");
        telefoneCell.textContent = nutri.telefone_nutri;
        row.appendChild(telefoneCell);

        const nascimentoCell = document.createElement("td");
        nascimentoCell.textContent = nutri.data_nascimento_nutri;
        row.appendChild(nascimentoCell);

        const generoCell = document.createElement("td");
        generoCell.textContent = nutri.genero_nutri;
        row.appendChild(generoCell);

        const instituicaoCell = document.createElement("td");
        instituicaoCell.textContent = nutri.instituicai_nutri;
        row.appendChild(instituicaoCell);
        
        const CRNCell = document.createElement("td");
        CRNCell.textContent = nutri.crn;
        row.appendChild(CRNCell);

        const deleteCell = document.createElement("td");
        deleteCell.style.textAlign = 'center';
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.onclick = () => deletarNutri(nutri.id_nutri);
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);    

        const editCell = document.createElement("td");
        editCell.style.textAlign = 'center';
        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.onclick = () => lerNutri2(nutri.id_nutri);
        editCell.appendChild(editButton);
        row.appendChild(editCell);

        tableBody.appendChild(row);
    }
}

// form enviar

let formActionUrl2 = ''
document.getElementById('btn_adicionar_nutri').addEventListener('click', function () {
    formActionUrl2 = 'cadastrar_nutricionista.php';});

document.getElementById('btn_editar_nutri').addEventListener('click', function () {
    formActionUrl2 = 'editarNutri2.php';});
