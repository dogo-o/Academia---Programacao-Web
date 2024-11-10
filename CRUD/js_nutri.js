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
    
    fetch('cadastrar_nutricionista.php', {  
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


fetch('ler_nutri.php') // -> requisicao GET
    .then(response => response.json())
    .then(data => {
        populateTableNutri(data);
    })
    .catch(error => console.error("Erro na requisição:", error));


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

        const cursoCell = document.createElement("td");
        cursoCell.textContent = nutri.curso_superior_nutri;
        row.appendChild(cursoCell);

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
        deleteButton.onclick = () => deleteUser(nutri.id_nutri);
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);    

        const editCell = document.createElement("td");
        editCell.style.textAlign = 'center';
        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.onclick = () => editUser(nutri.id_nutri);
        editCell.appendChild(editButton);
        row.appendChild(editCell);

        tableBody.appendChild(row);
    }
}