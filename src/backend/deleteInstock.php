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
    $name = $_POST['name'];
    $location = $_POST['location'];
    $sql1 = "SELECT item_id AS total FROM items WHERE item_name = '$name' and location = '$location'";
        $result1 = $conn->query($sql1);
        
        // Process the results as needed
        if ($result1->num_rows > 0) {
            $item_id = $data[0]['total'];

            $sql2 = "DELETE FROM items WHERE item_name = '$name' AND location = '$location'";

            if ($conn->query($sql2) === TRUE) {
                echo json_encode(['data' => 'Row removed successfully']);
            } else {
                echo json_encode(['data' => 'Error removing row: ' . $conn->error]);
            }

            $sql3 = "DELETE FROM defective WHERE item_id = '$item_id' AND companyownership = '$location'";

            if ($conn->query($sql3) === TRUE) {
                echo json_encode(['data' => 'Row removed successfully']);
            } else {
                echo json_encode(['data' => 'Error removing row: ' . $conn->error]);
            }
        } else {
            echo json_encode(['data' => 'Error removing row: ' . $conn->error]);
        }   



    $conn->close();
    exit();

?>

