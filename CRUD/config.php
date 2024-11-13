<?php 

$dbHost = 'localhost'; 
$dbUserName = 'root';
$dbPassWord = ''; 
$dbName = 'academia';

$conexao = new mysqli($dbHost, $dbUserName, $dbPassWord, $dbName, 3307);

if ($conexao->connect_error) {
    die("Erro na conexão: " . $conexao->connect_error);
}

?>