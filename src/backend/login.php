<?php

header ('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type: application/json, X-Auth-Token, Authorization, Origin');
header ('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$db="ims";
// Create connection
$conn = new mysqli($servername, $username, $password,$db);
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);}

      $email = $_POST['email'];
      $password = $_POST['password'];

      $sql = "SELECT id,name,position FROM accounts WHERE email = '$email' AND password ='$password'";
      $result = $conn->query($sql);
      if ($result->num_rows > 0) {
        $data = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode(['data' => $data]);
      } else {
        echo json_encode(['data'=> 'Not Found!']);
    }
    $conn->close();
    exit();

?>

