<?php 
include 'config.php';

if ($conexao->connect_error) {
    die('Falha na conexão, tente novamente: ' . $conexao->connect_error);
}

$id_nutri = $_POST['id_nutri'];
$nome_nutri = $_POST['nome_nutri'];
$email_nutri = $_POST['email_nutri'];
$cpf_nutri = $_POST['cpf_nutri'];
$telefone_nutri = $_POST['telefone_nutri'];
$nascimento_nutri = $_POST['nascimento_nutri']; 
$genero_nutri = $_POST['genero_nutri'];
$curso_nutri = $_POST['curso_nutri'];
$instituicao_nutri = $_POST['instituicao_nutri'];
$crn = $_POST['crn'];

$sql = 'UPDATE nutricionistas SET nome_nutri = ?, email_nutri = ?, CPF_nutri = ?, telefone_nutri = ?, data_nascimento_nutri = ?, genero_nutri = ?, curso_superior_nutri = ?, instituicai_nutri = ?, crn = ? WHERE id_nutri = ?';
$stmt = $conexao->prepare($sql);
$stmt->bind_param('ssiisssssi', $nome_nutri, $email_nutri, $cpf_nutri, $telefone_nutri, $nascimento_nutri, $genero_nutri, $curso_nutri, $instituicao_nutri, $crn, $id_nutri);

if ($stmt->execute()) {
    echo 'Editado com sucesso';
} else {
    echo 'Erro ao editar';
}
?>
