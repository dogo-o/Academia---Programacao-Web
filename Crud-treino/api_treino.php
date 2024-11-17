<?php
header("Content-Type: application/json");

$pdo = new PDO("mysql:host=localhost;dbname=fitconnect", "root", "");

$action = $_GET['action'] ?? '';

if ($action === 'create') {
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $pdo->prepare("INSERT INTO treinos (categoria, exercicio, reps, kg, foco, observacoes) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$data['categoria'], $data['exercicio'], $data['reps'], $data['kg'], $data['foco'], $data['observacoes']]);
    echo json_encode(["status" => "Treino salvo"]);
} elseif ($action === 'read') {
    $stmt = $pdo->query("SELECT * FROM treinos");
    $treinos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($treinos);
} elseif ($action === 'readOne') {
    $id = $_GET['id'];
    $stmt = $pdo->prepare("SELECT * FROM treinos WHERE id = ?");
    $stmt->execute([$id]);
    $treino = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($treino);
} elseif ($action === 'update') {
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $pdo->prepare("UPDATE treinos SET categoria = ?, exercicio = ?, reps = ?, kg = ?, foco = ?, observacoes = ? WHERE id = ?");
    $stmt->execute([$data['categoria'], $data['exercicio'], $data['reps'], $data['kg'], $data['foco'], $data['observacoes'], $data['id']]);
    echo json_encode(["status" => "Treino atualizado"]);
} elseif ($action === 'delete') {
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $pdo->prepare("DELETE FROM treinos WHERE id = ?");
    $stmt->execute([$data['id']]);
    echo json_encode(["status" => "Treino excluído"]);
}
