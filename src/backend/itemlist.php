<?php

include './access.php';
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

