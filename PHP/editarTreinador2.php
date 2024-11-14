<?php 
include 'config.php';

if ($conexao->connect_error) {
    die('Falha na conexão, tente novamente: ' . $conexao->connect_error);
}

$id_treinador = $_POST['id_treinador'];
$nome_treinador = $_POST['nome_treinador'];
$email_treinador = $_POST['email_treinador'];
$cpf_treinador = $_POST['cpf_treinador'];
$telefone_treinador = $_POST['telefone_treinador'];
$nascimento_treinador = $_POST['nascimento_treinador']; 
$genero_treinador = $_POST['genero_treinador'];
$curso_treinador = $_POST['curso_treinador'];
$instituicao_treinador = $_POST['instituicao_treinador'];
$cref = $_POST['cref'];

$sql = 'UPDATE treinadores SET nome_treinador = ?, email_treinador = ?, cpf_treinador = ?, telefone_treinador = ?, nascimento_treinador = ?, genero_treinador = ?, curso_treinador = ?, instituicao_treinador = ?, cref = ? WHERE id_treinador = ?';
$stmt = $conexao->prepare($sql);
$stmt->bind_param('ssiisssssi', $nome_treinador, $email_treinador, $cpf_treinador, $telefone_treinador, $nascimento_treinador, $genero_treinador, $curso_treinador, $instituicao_treinador, $cref, $id_treinador);

if ($stmt->execute()) {
    echo 'Editado com sucesso';
} else {
    echo 'Erro ao editar';
}
?>
