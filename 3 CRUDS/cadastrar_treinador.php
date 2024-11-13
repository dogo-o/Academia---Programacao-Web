<?php 
include 'config.php';

if ($conexao->connect_error) {
    die('Falha na conexão tente novamente: ' . $conexao->connect_error); // utiliza-se die para nao continuar o codigo
}

// Coleta os valores do formulário
$nome_treinador = $_POST['nome_treinador'];
$email_treinador = $_POST['email_treinador'];
$cpf_treinador = $_POST['cpf_treinador'];
$telefone_treinador = $_POST['telefone_treinador'];
$nascimento_treinador = $_POST['nascimento_treinador']; 
$genero_treinador = $_POST['genero_treinador'];
$curso_treinador = $_POST['curso_treinador'];
$instituicao_treinador = $_POST['instituicao_treinador'];
$cref = $_POST['cref'];
$senha_treinador = $_POST['senha_treinador'];
$senha_treinador_hash = password_hash($senha_treinador, PASSWORD_DEFAULT); // Criptografa a senha

// Verifica se o CPF já está cadastrado
$sql_verify_cpf = 'SELECT cpf_treinador FROM academia.treinadores WHERE cpf_treinador = ?';
$stmt_cpf = $conexao->prepare($sql_verify_cpf);
$stmt_cpf->bind_param('s', $cpf_treinador);  
$stmt_cpf->execute();
$result_cpf = $stmt_cpf->get_result();

// Verifica se o email já está cadastrado
$sql_verify_email = 'SELECT email_treinador FROM academia.treinadores WHERE email_treinador = ?';
$stmt_email = $conexao->prepare($sql_verify_email);
$stmt_email->bind_param('s', $email_treinador);
$stmt_email->execute();
$result_email = $stmt_email->get_result();

// Verifica se o telefone já está cadastrado
$sql_verify_telefone = 'SELECT telefone_treinador FROM academia.treinadores WHERE telefone_treinador = ?';
$stmt_telefone = $conexao->prepare($sql_verify_telefone);
$stmt_telefone->bind_param('s', $telefone_treinador);
$stmt_telefone->execute();
$result_telefone = $stmt_telefone->get_result();

if ($result_cpf->num_rows > 0 || $result_email->num_rows > 0 || $result_telefone->num_rows > 0) {
    echo 'CPF, Email ou Telefone já cadastrado(s)!<br>';
} else {
    // Insere os dados no banco de dados
    $sql = 'INSERT INTO treinadores (nome_treinador, email_treinador, cpf_treinador, telefone_treinador, nascimento_treinador, genero_treinador, curso_treinador, instituicao_treinador, cref, senha_treinador) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    $stmt = $conexao->prepare($sql);
    $stmt->bind_param('ssiisssssi', $nome_treinador, $email_treinador, $cpf_treinador, $telefone_treinador, $nascimento_treinador, $genero_treinador, $curso_treinador, $instituicao_treinador, $cref, $senha_treinador_hash);

    // Executa a inserção
    if ($stmt->execute()) {
        echo 'Treinador cadastrado com sucesso!';
    } else {
        // Exibe o erro caso falhe
        echo 'Erro ao cadastrar Treinador: ' . $stmt->error;
    }

    // Fecha as conexões
    $stmt->close();
    $conexao->close();
    $stmt_cpf->close();
    $stmt_email->close();
    $stmt_telefone->close();
}
?>
