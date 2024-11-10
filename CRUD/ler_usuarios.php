<?php
include 'config.php';

if ($conexao->connect_error) {
    die(json_encode(['Falha na conexão: ' . $conexao->connect_error])); // utiliza-se die para nao continuar o codigo
}

$sql = "SELECT * FROM usuarios";
$stmt = $conexao->query($sql);

$users = [];

if ($stmt) {
    if ($stmt->num_rows > 0) {
        while ($row = $stmt->fetch_assoc()) {
            $users[] = $row;
        }
    }
    echo json_encode($users);
}

$conexao->close();
?>
