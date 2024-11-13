<?php 
include 'config.php';

if ($conexao->connect_error) {
    die(json_encode(['error' => 'Falha na conexão: ' . $conexao->connect_error]));
}

$data = json_decode(file_get_contents('php://input'), true);
$id_usuario = $data['id_usuario'];
$sql = 'SELECT * FROM usuarios WHERE id_usuario = ?';
$stmt = $conexao->prepare($sql);
$stmt->bind_param('i',$id_usuario);
if ($stmt->execute()) {
    $result = $stmt->get_result();
    if ($row = $result->fetch_assoc()) {
        echo json_encode(['success' => true, 'data' => $row]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Usuário não encontrado']);
    }
}



?>