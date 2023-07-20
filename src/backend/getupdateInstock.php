<?php

include './access.php';
// Create connection

    $code = $_POST['code'];
    $location = $_POST['location'];
    $sql1 = "SELECT * FROM items WHERE itemid_company = '$code' and location = '$location'";
        $result1 = $conn->query($sql1);

        // Process the results as needed
        if ($result1->num_rows > 0) {
          $data['result1'] = array(); // Initialize an empty array

          while ($row = $result1->fetch_assoc()) {
              $data['result1'][] = $row;
          }
        } else {
          $data['result1'] = [];
        }
        echo json_encode($data);
        $conn->close();
        exit();

?>

