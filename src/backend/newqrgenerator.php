<?php
include './access.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$code1 = $_POST['code1'];
$code2 = $_POST['code2'];
$company = $_POST['company'];
$position = $_POST['position'];
$data = array(); // Initialize the main data array

  $data['result1_count'] = 0; // Initialize the result1_count key
  $data['result2_count'] = 0;
  if ($code1 == '' || $code2 == '') {
      if ($code1 == '') {
          $code3 = $code2;
      } else if ($code2 == '') {
          $code3 = $code1;
      }
      $sql = "SELECT location, quantity FROM items WHERE item_id BETWEEN '$code1' AND '$code2' AND location = '$company';";
      $result = $conn->query($sql);

      if ($result->num_rows > 0) {
          $data['result1'] = array(); // Initialize an empty array
          while ($row = $result->fetch_assoc()) {
              $data['result1'][] = $row;
          }
          $data['result1_count'] = $result->num_rows;
      } else {
          $data['result1'] = 'Not found';
      }

      $sql2 = "SELECT * FROM items WHERE itemid_company BETWEEN '$code1' AND '$code2' AND location = '$company';";
      $result2 = $conn->query($sql2);

      if ($result2->num_rows > 0) {
          $data['result2'] = array(); // Initialize an empty array
          $data['success1'] = 'Found';
          while ($row = $result2->fetch_assoc()) {
              $data['result2'][] = $row;
          }
          $data['result2_count'] = $result2->num_rows;
      } else {
          $data['success1'] = 'Not Found';
          $data['result2'] = 'Not Found';
      }
      $data['total_count'] = $data['result1_count'] + $data['result2_count']; // Combine the counts
  } else if ($code1 != '' && $code2 != '') {
      $sql = "SELECT location, quantity FROM items WHERE item_id BETWEEN '$code1' AND '$code2' AND location = '$company';";
      $result = $conn->query($sql);

      if ($result->num_rows > 0) {
          $data['result1'] = array(); // Initialize an empty array
          while ($row = $result->fetch_assoc()) {
              $data['result1'][] = $row;
          }
          $data['result1_count'] = $result->num_rows;
      } else {
          $data['result1'] = 'Not found';
      }

      $sql2 = "SELECT * FROM items WHERE itemid_company BETWEEN '$code1' AND '$code2' AND location = '$company';";
      $result2 = $conn->query($sql2);

      if ($result2->num_rows > 0) {
          $data['result2'] = array(); // Initialize an empty array
          $data['success1'] = 'Found';
          while ($row = $result2->fetch_assoc()) {
              $data['result2'][] = $row;
          }
          $data['result2_count'] = $result2->num_rows;
      } else {
          $data['success1'] = 'Not Found';
          $data['result2'] = 'Not Found';
      }
      $data['total_count'] = $data['result1_count'] + $data['result2_count']; // Combine the counts
  }


echo json_encode($data);

$conn->close();
exit();
?>
