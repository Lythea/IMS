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

    $code = $_POST['code'];
    $company = $_POST['location'];

    $sql2 = "SELECT `specific`  as total1 FROM ownership WHERE item_id = '$code' and location ='$company'";
    $result2 = $conn->query($sql2);
    if ($result2->num_rows > 0) {
      $data['result2'] = array(); // Initialize an empty array
 
      while ($row = $result2->fetch_assoc()) {
          $data['result2'][] = $row['total1'];

      }
  } else {
      $data['result2'] = [];

  }

  echo json_encode($data);
    $conn->close();
    exit();

?>

