<?php 
include 'config.php';

// Coleta os valores do formulário
$nome_nutri = $_POST['nome_nutri'];
$email_nutri = $_POST['email_nutri'];
$cpf_nutri = $_POST['cpf_nutri'];
$telefone_nutri = $_POST['telefone_nutri'];
$nascimento_nutri = $_POST['nascimento_nutri'];  // Corrigido
$genero_nutri = $_POST['genero_nutri'];
$curso_nutri = $_POST['curso_nutri'];
$instituicao_nutri = $_POST['instituicao_nutri'];
$crn = $_POST['crn'];
$senha_nutri = $_POST['senha_nutri'];
$senha_nutri_hash = password_hash($senha_nutri, PASSWORD_DEFAULT); // Criptografa a senha

// Verifica se o CPF já está cadastrado
$sql_verify_cpf = 'SELECT CPF_nutri FROM academia.nutricionistas WHERE CPF_nutri = ?';
$stmt_cpf = $conexao->prepare($sql_verify_cpf);
$stmt_cpf->bind_param('s', $cpf_nutri);  // Corrigido
$stmt_cpf->execute();
$result_cpf = $stmt_cpf->get_result();

// Verifica se o email já está cadastrado
$sql_verify_email = 'SELECT email_nutri FROM academia.nutricionistas WHERE email_nutri = ?';
$stmt_email = $conexao->prepare($sql_verify_email);
$stmt_email->bind_param('s', $email_nutri);
$stmt_email->execute();
$result_email = $stmt_email->get_result();

// Verifica se o telefone já está cadastrado
$sql_verify_telefone = 'SELECT telefone_nutri FROM academia.nutricionistas WHERE telefone_nutri = ?';
$stmt_telefone = $conexao->prepare($sql_verify_telefone);
$stmt_telefone->bind_param('s', $telefone_nutri);
$stmt_telefone->execute();
$result_telefone = $stmt_telefone->get_result();

if ($result_cpf->num_rows > 0 || $result_email->num_rows > 0 || $result_telefone->num_rows > 0) {
    echo 'CPF, Email ou Telefone já cadastrado(s)!<br>';
} else {
    // Insere os dados no banco de dados
    $sql = 'INSERT INTO nutricionistas (nome_nutri, email_nutri, CPF_nutri, telefone_nutri, data_nascimento_nutri, genero_nutri, curso_superior_nutri, instituicai_nutri, crn, senha) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    $stmt = $conexao->prepare($sql);
    $stmt->bind_param('ssiisssssi', $nome_nutri, $email_nutri, $cpf_nutri, $telefone_nutri, $nascimento_nutri, $genero_nutri, $curso_nutri, $instituicao_nutri, $crn, $senha_nutri_hash);

    // Executa a inserção
    if ($stmt->execute()) {
        echo 'Nutricionista cadastrado com sucesso!';
    } else {
        // Exibe o erro caso falhe
        echo 'Erro ao cadastrar nutricionista: ' . $stmt->error;
    }

    // Fecha as conexões
    $stmt->close();
    $conexao->close();
    $stmt_cpf->close();
    $stmt_email->close();
    $stmt_telefone->close();
}
?>
