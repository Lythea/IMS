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

      $email = $_POST['email'];
      $name = $_POST['name'];
      $code = $_POST['code'];
      $position = $_POST['position'];
      $company = $_POST['company'];

      $sql = "SELECT $position FROM code WHERE BINARY $position = '$code' and company = '$company'";
      $result = $conn->query($sql);

      if ($result->num_rows > 0) {
        $data = $result->fetch_all(MYSQLI_ASSOC);
   
      $sql = "SELECT name,email FROM accounts WHERE email = '$email' AND name ='$name'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
          $data = $result->fetch_all(MYSQLI_ASSOC);
          echo json_encode(['data' => $data]);
        } else {
          echo json_encode(['data'=> 'Not Found!']);
      }
        }


      else {
        echo json_encode(['data' => 'No Data' ]);
    }


    $conn->close();
    exit();

?>

