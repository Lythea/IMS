<?php
header ('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type: application/json, X-Auth-Token, Authorization, Origin');
header ('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$db="cti_inventory_system";
// Create connection
$conn = new mysqli($servername, $username, $password,$db);
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);}
    
        $name= $_POST['name'];  
        $email = $_POST['email'];
        $password = $_POST['password'];
        $position= $_POST['position']; 
        // Construct the INSERT query
        $sql = "INSERT INTO accounts (name,email, password,position) VALUES ('$name','$email', '$password','$position')";

        if ($conn->query($sql) === TRUE) {
          
            echo json_encode(['data' => 'Data inserted successfully']);
        } else {
            echo json_encode(['data' => 'Error: ' . $sql . '<br>' . $conn->error]);
        }
    $conn->close();
    exit();

?>

