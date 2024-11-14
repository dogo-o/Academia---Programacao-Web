<?php
include 'config.php';

if ($conexao->connect_error) {
    die(json_encode(['error' => 'Falha na conexão: ' . $conexao->connect_error]));
}

$sql = "SELECT * FROM nutricionistas";
$result = $conexao->query($sql);

$nutris = [];

if ($result) {
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $nutris[] = $row;
        }
    }
    echo json_encode($nutris);
}

$conexao->close();
?>
