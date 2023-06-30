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
    $data = array();
    $location = $_POST['location'];
    $value = $_POST['value'];
    if($value=='Defective Products'){
        $sql1 = "SELECT item_name AS total FROM items WHERE location = '$location'";
        $result1 = $conn->query($sql1);
        
        // Process the results as needed
        if ($result1->num_rows > 0) {
            $data['result1'] = array(); // Initialize an empty array
        
            while ($row = $result1->fetch_assoc()) {
                $data['result1'][] = $row['total'];
            }
        } else {
            $data['result1'] = [];
        }   
        
    }
    echo json_encode($data);


    $conn->close();
    exit();

?>

