<?php 
include 'config.php';

if ($conexao->connect_error) {
    die('Falha na conexão tente novamente: ' . $conexao->connect_error);};

$id_usuario = $_POST['id_usuario'];
$nome_usuario = $_POST['nome_usuario'];
$email_usuario = $_POST['email_usuario'];
$cpf_usuario = $_POST['cpf_usuario'];
$nascimento_usuario = $_POST['nascimento_usuario'];
$genero_usuario = $_POST['genero_usuario'];

$sql = 'UPDATE usuarios SET nome_usuario = ? , email_usuario = ?, cpf_usuario = ?, data_nascimento_usuario = ? , genero_usuario = ? WHERE id_usuario = ?';
$stmt = $conexao->prepare($sql);
$stmt->bind_param('ssissi', $nome_usuario, $email_usuario, $cpf_usuario, $nascimento_usuario, $genero_usuario, $id_usuario);
    if($stmt->execute()){
        echo 'Editado com sucesso';
    }else{
        echo 'Erro ao editar';
    }
?>