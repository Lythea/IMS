<?php

include './access.php';
// Create connection
$conn = new mysqli($servername, $username, $password,$db);
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);}
      $company = $_POST['company'];
      $position = $_POST['position'];
      if($position=='administrator'){
        $sql = "SELECT * FROM `items`";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
          $data = $result->fetch_all(MYSQLI_ASSOC);
          echo json_encode(['data' => $data]);
        } else {
          echo json_encode(['data'=> 'Not Found!']);
      }
      }else if ($position=='moderator'|| $position=='user'){
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

