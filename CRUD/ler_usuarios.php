<?php
include 'config.php';

if ($conexao->connect_error) {
    die(json_encode(['error' => 'Falha na conexão: ' . $conexao->connect_error]));
}

$sql = "SELECT * FROM usuarios";
$result = $conexao->query($sql);

$users = [];

if ($result) {
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
    }
    echo json_encode($users);
} else {
    echo json_encode(['error' => $conexao->error]);
}

$conexao->close();
?>
