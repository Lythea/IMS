<?php

include './access.php';
// Create connection
$conn = new mysqli($servername, $username, $password,$db);
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);}
    $val = $_POST['val'];
    $admincode = $_POST['val1'];
    $usercode = $_POST['val2'];
    $location = $_POST['val3'];
    if($val == 'add'){

        $sql1 = "SELECT company FROM code WHERE company = '$location'";
        $result1 = $conn->query($sql1);
        if ($result1->num_rows > 0) {
          echo json_encode(['data' => 'Company has code already.']);
        } else {
          $sql = "INSERT INTO code (company, admin, user) VALUES ('$location', '$admincode', '$usercode')";
          if ($conn->query($sql) === TRUE) {
            echo json_encode(['data' => 'Data inserted successfully']);
          } else {
            echo json_encode(['data' => 'Error: ' . $sql . '<br>' . $conn->error]);
          }
        }
    }else if($val == 'update'){
        $sql1 = "SELECT company FROM code WHERE company = '$location'";
        $result1 = $conn->query($sql1);
        if ($result1->num_rows > 0) {
            $sql = "UPDATE code SET admin = '$admincode', user = '$usercode' WHERE company = '$location'";

            if ($conn->query($sql) === TRUE) {
                echo json_encode(['data' => 'Row updated successfully']);
            } else {
                echo json_encode(['data' => 'Error updating row: ' . $conn->error]);
            }
        } else {
            echo json_encode(['data' => 'Company not found!']);
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

