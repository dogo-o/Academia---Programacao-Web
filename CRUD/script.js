document.addEventListener("DOMContentLoaded", carregarTreinos);

function carregarTreinos() {
    fetch("api.php")
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector("#treinos tbody");
            tbody.innerHTML = "";
            data.forEach(treino => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${treino.usuario}</td>
                    <td>${treino.exercicio}</td>
                    <td>${treino.repeticoes}</td>
                    <td>
                        <button onclick="editarTreino(${treino.id})">Editar</button>
                        <button onclick="excluirTreino(${treino.id})">Excluir</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        });
}

function salvarTreino() {
    const id = document.getElementById("treino-id").value;
    const usuario = document.getElementById("usuario").value;
    const exercicio = document.getElementById("exercicio").value;
    const repeticoes = document.getElementById("repeticoes").value;

    const treino = { usuario, exercicio, repeticoes };

    const method = id ? "PUT" : "POST";
    const url = "api.php";

    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id ? { ...treino, id } : treino)
    })
    .then(response => response.json())
    .then(() => {
        carregarTreinos();
        document.getElementById("treino-form").reset();
        document.getElementById("treino-id").value = "";
    });
}

function editarTreino(id) {
    fetch("api.php")
        .then(response => response.json())
        .then(data => {
            const treino = data.find(t => t.id === id);
            document.getElementById("treino-id").value = treino.id;
            document.getElementById("usuario").value = treino.usuario;
            document.getElementById("exercicio").value = treino.exercicio;
            document.getElementById("repeticoes").value = treino.repeticoes;
        });
}

function excluirTreino(id) {
    fetch("api.php", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    })
    .then(response => response.json())
    .then(() => carregarTreinos());
}
