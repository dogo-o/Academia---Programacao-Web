<?php 
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "fitconnect";

// Conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica se houve erro de conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM treinos";
        $result = $conn->query($sql);
        $treinos = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($treinos);
        break;

    case 'POST':
        // Decodifica o JSON recebido
        $data = json_decode(file_get_contents("php://input"), true);

        // Verifica se os dados foram passados corretamente
        if(isset($data['usuario']) && isset($data['exercicio']) && isset($data['repeticoes'])) {
            $sql = "INSERT INTO treinos (usuario, exercicio, repeticoes) VALUES ('" . $data['usuario'] . "', '" . $data['exercicio'] . "', '" . $data['repeticoes'] . "')";
            if ($conn->query($sql) === TRUE) {
                echo json_encode(["message" => "Treino adicionado com sucesso!"]);
            } else {
                echo json_encode(["message" => "Erro ao adicionar treino: " . $conn->error]);
            }
        } else {
            echo json_encode(["message" => "Dados incompletos para o treino"]);
        }
        break;
}
?>
