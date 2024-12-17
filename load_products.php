<?php
require_once 'db_config.php'; // Contient les informations de connexion

// Connexion à la base de données
$pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);

// Récupérer les paramètres de la requête AJAX
$start = isset($_GET['start']) ? (int)$_GET['start'] : 0;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;

// Requête SQL pour récupérer les produits
$sql = "SELECT id, name, description, price, image_url FROM products LIMIT :start, :limit";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':start', $start, PDO::PARAM_INT);
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
$stmt->execute();

// Renvoyer les résultats en JSON
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);
