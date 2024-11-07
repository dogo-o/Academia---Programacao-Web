<?php 
include 'config.php';

//coleta os valores do form
$nome_usuario = $_POST['nome_usuario'];
$email_usuario = $_POST['email_usuario'];
$cpf_usuario = $_POST['cpf_usuario'];
$nascimento_usuario = $_POST['nascimento_usuario'];
$genero_usuario = $_POST['genero_usuario'];
$senha_usuario = $_POST['senha_usuario'];
$senha_usuario_hash = password_hash($senha_usuario, PASSWORD_DEFAULT); // criptografa a senha

$sql_verify_cpf = 'SELECT CPF_usuario FROM academia.usuarios WHERE CPF_usuario = ?';
$stmt_cpf = $conexao->prepare($sql_verify_cpf);
$stmt_cpf->bind_param('s', $cpf_usuario);
$stmt_cpf->execute();
$result_cpf = $stmt_cpf->get_result();

$sql_verify_email = 'SELECT email_usuario FROM academia.usuarios WHERE email_usuario = ?';
$stmt_email = $conexao->prepare($sql_verify_email);
$stmt_email->bind_param('s', $email_usuario);
$stmt_email->execute();
$result_email = $stmt_email->get_result();

if ($result_cpf->num_rows > 0 || $result_email->num_rows > 0) {
    echo 'CPF ou Email já cadastrado(s)!<br>';
}else {
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
    $stmt_cpf->close();
    $stmt_email->close();

}
?>