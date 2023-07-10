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
      $company = $_POST['company'];
      $position = $_POST['position'];
      if($position=='moderator'){
        $sql = "SELECT * FROM `items`";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
          $data = $result->fetch_all(MYSQLI_ASSOC);
          echo json_encode(['data' => $data]);
        } else {
          echo json_encode(['data'=> 'Not Found!']);
      }
      }else if ($position=='admin'|| $position=='user'){
        $sql = "SELECT * FROM `items` WHERE location = '$company'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
          $data = $result->fetch_all(MYSQLI_ASSOC);
          echo json_encode(['data' => $data]);
        } else {
          echo json_encode(['data'=> 'Not Found!']);
      }
      }
    

      $conn->close();
      exit();

?>

