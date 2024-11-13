<?php 
    include 'config.php';

    if ($conexao->connect_error){
        die('erro na conexao');
    }
    
    $data = json_decode(file_get_contents('php://input'), true);
    $id_treinador = $data['id_treinador'];

    $sql = 'DELETE FROM academia.treinadores WHERE id_treinador = ?';
    $stmt = $conexao->prepare($sql);
    $stmt->bind_param('i',$id_treinador);
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao excluir']);
    }

    $stmt->close();
    $conexao->close();
    
?>