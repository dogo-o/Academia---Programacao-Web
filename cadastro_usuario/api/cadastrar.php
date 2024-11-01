<?php 
include_once('config.php');
$nome_usuario = $_POST['nome_usuario'];
$email_usuario = $_POST['email_usuario'];
$cpf_usuario = $_POST['cpf_usuario'];
$nascimento_usuario = $_POST['nascimento_usuario'];
$genero_usuario = $_POST['genero_usuario'];
$senha_usuario = $_POST['senha_usuario'];
$senha_usuario_hash = password_hash($senha_usuario, PASSWORD_DEFAULT);

$sql = 'INSERT INTO usuarios (nome_usuario, email_usuario, CPF_usuario, data_nascimento_usuario, genero_usuario, senha_usuario)VALUES(?,?,?,?,?,?)';
$stmt = $conexao->prepare($sql);
$stmt->bind_param('ssisss', $nome_usuario, $email_usuario, $cpf_usuario, $nascimento_usuario, $genero_usuario, $senha_usuario_hash);

if ($stmt->execute()) {
    echo 'Usuário cadastrado com sucesso!';
} else {
    echo 'Erro ao cadastrar usuário:';
}

$stmt->close();
$conexao->close();


?>