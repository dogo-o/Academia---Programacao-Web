function salvarTreino() {
    const treinoId = document.getElementById("treinoId").value;
    const categoria = document.getElementById("categoria").value;
    const exercicio = document.getElementById("exercicio").value;
    const reps = document.getElementById("reps").value;
    const kg = document.getElementById("kg").value;
    const foco = document.getElementById("foco").value;
    const observacoes = document.getElementById("observacoes").value;

    const data = {
        id: treinoId,
        categoria,
        exercicio,
        reps,
        kg,
        foco,
        observacoes
    };

    const action = treinoId ? 'update' : 'create';
    fetch(`api_treino.php?action=${action}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) throw new Error("Erro ao salvar treino.");
        return response.json();
    })
    .then(() => {
        carregarTreinos();
        document.getElementById("treinoForm").reset();
    })
    .catch(error => console.error(error));
}

function carregarTreinos() {
    fetch("api_treino.php?action=read")
    .then(response => response.json())
    .then(treinos => {
        const treinoTable = document.getElementById("treinoTable").getElementsByTagName("tbody")[0];
        treinoTable.innerHTML = "";

        treinos.forEach((treino) => {
            const row = treinoTable.insertRow();
            row.innerHTML = `
                <td>${treino.categoria}</td>
                <td>${treino.exercicio}</td>
                <td>${treino.reps}</td>
                <td>${treino.kg}</td>
                <td>${treino.foco}</td>
                <td>${treino.observacoes}</td>
                <td>
                    <button onclick="editarTreino(${treino.id})">Editar</button>
                    <button onclick="excluirTreino(${treino.id})">Excluir</button>
                </td>
            `;
        });
    })
    .catch(error => console.error("Erro ao carregar treinos:", error));
}

function editarTreino(id) {
    fetch(`api_treino.php?action=readOne&id=${id}`)
    .then(response => response.json())
    .then(treino => {
        document.getElementById("treinoId").value = treino.id;
        document.getElementById("categoria").value = treino.categoria;
        document.getElementById("exercicio").value = treino.exercicio;
        document.getElementById("reps").value = treino.reps;
        document.getElementById("kg").value = treino.kg;
        document.getElementById("foco").value = treino.foco;
        document.getElementById("observacoes").value = treino.observacoes;
    })
    .catch(error => console.error("Erro ao carregar treino:", error));
}

function excluirTreino(id) {
    fetch(`api_treino.php?action=delete`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
    })
    .then(() => carregarTreinos())
    .catch(error => console.error("Erro ao excluir treino:", error));
}

document.addEventListener("DOMContentLoaded", carregarTreinos);
