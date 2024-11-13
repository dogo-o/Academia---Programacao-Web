<?php
include 'config.php';

if ($conexao->connect_error) {
    die(json_encode(['error' => 'Falha na conexão: ' . $conexao->connect_error]));
}

$sql = "SELECT * FROM treinadores";
$result = $conexao->query($sql);

$treinadores = [];

if ($result) {
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $treinadores[] = $row;
        }
    }
    echo json_encode($treinadores);
}

$conexao->close();
?>
