<?php
$dsn = 'sqlite:../database/database.sqlite';
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, null, null, $options);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->query('SELECT * FROM players');
        $players = $stmt->fetchAll();
        echo json_encode($players);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('INSERT INTO players (first_name, last_name, position, number, role) VALUES (?, ?, ?, ?, ?)');
        $stmt->execute([$data['first_name'], $data['last_name'], $data['position'], $data['number'], $data['role']]);
        echo json_encode(['id' => $pdo->lastInsertId()] + $data);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('UPDATE players SET first_name = ?, last_name = ?, position = ?, number = ?, role = ? WHERE id = ?');
        $stmt->execute([$data['first_name'], $data['last_name'], $data['position'], $data['number'], $data['role'], $data['id']]);
        echo json_encode($data);
        break;

    case 'DELETE':
        $id = basename($_SERVER['REQUEST_URI']);
        $stmt = $pdo->prepare('DELETE FROM players WHERE id = ?');
        $stmt->execute([$id]);
        echo json_encode(['deletedID' => $id]);
        break;

    default:
        http_response_code(405);
        break;
}
?>