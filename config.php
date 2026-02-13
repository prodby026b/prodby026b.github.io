<?php

// Database configuration
$host = 'localhost';
$username = 'prodby026b';
$password = 'your_password';
$dbname = 'prodby026b';

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// echo 'Connected successfully'; // Uncomment for testing
?>