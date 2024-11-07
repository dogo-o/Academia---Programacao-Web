document.addEventListener("DOMContentLoaded", () => {
    loadPlans(); // Carrega os planos ao carregar a página

    document.getElementById("plan-form").addEventListener("submit", function(e) {
        e.preventDefault();
        savePlan();
    });
});

async function loadPlans() {
    const response = await fetch("api.php");
    const plans = await response.json();
    const tableBody = document.getElementById("plan-table-body");
    tableBody.innerHTML = ""; // Limpa a tabela

    plans.forEach(plan => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${plan.tipo_plano}</td>
            <td>${plan.preco}</td>
            <td>${plan.descricao}</td>
            <td>
                <button onclick="editPlan(${plan.id})">Editar</button>
                <button onclick="deletePlan(${plan.id})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

async function savePlan() {
    const id = document.getElementById("plan-id").value;
    const tipo = document.getElementById("tipo").value;
    const preco = document.getElementById("preco").value;
    const descricao = document.getElementById("descricao").value;

    const data = { id, tipo, preco, descricao };

    await fetch("api.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    document.getElementById("plan-form").reset();
    loadPlans(); // Atualiza a tabela de planos
}

async function editPlan(id) {
    const response = await fetch(`api.php?id=${id}`);
    const plan = await response.json();

    document.getElementById("plan-id").value = plan.id;
    document.getElementById("tipo").value = plan.tipo_plano;
    document.getElementById("preco").value = plan.preco;
    document.getElementById("descricao").value = plan.descricao;
}

async function deletePlan(id) {
    await fetch(`api.php?id=${id}`, { method: "DELETE" });
    loadPlans(); // Atualiza a tabela de planos
}
