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
    $val = $_POST['val'];
    $admincode = $_POST['val1'];
    $usercode = $_POST['val2'];
    $location = $_POST['val3'];
    if($val == 'add'){
        $sql = "INSERT INTO code (company,admin,user) VALUES ('$location','$admincode','$usercode')";

        if ($conn->query($sql) === TRUE) {
          
            echo json_encode(['data' => 'Data inserted successfully']);
        } else {
            echo json_encode(['data' => 'Error: ' . $sql . '<br>' . $conn->error]);
        }
    }else if($val == 'update'){
        $sql = "UPDATE code SET admin = '$admincode', user = '$usercode' WHERE company = '$location'";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['data' => 'Row updated successfully']);
        } else {
            echo json_encode(['data' => 'Error updating row: ' . $conn->error]);
        }
    }else if($val == 'delete'){
        $sql = "DELETE FROM code WHERE company = '$location'";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(['data' => 'Row removed successfully']);
        } else {
            echo json_encode(['data' => 'Error removing row: ' . $conn->error]);
        }
    }
    $conn->close();
    exit();

?>

