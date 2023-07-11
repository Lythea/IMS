<?php

include './access.php';
// Create connection
$conn = new mysqli($servername, $username, $password,$db);
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);}
    $name = $_POST['name'];
    $location = $_POST['location'];
    $sql1 = "SELECT itemid_company AS total FROM items WHERE item_name = '$name' and location = '$location'";
        $result1 = $conn->query($sql1);
        
        // Process the results as needed
        if ($result1->num_rows > 0) {
            $itemid_company = $data[0]['total'];

            $sql2 = "DELETE FROM items WHERE item_name = '$name' AND location = '$location'";

            if ($conn->query($sql2) === TRUE) {
                echo json_encode(['data' => 'Row removed successfully']);
            } else {
                echo json_encode(['data' => 'Error removing row: ' . $conn->error]);
            }

            $sql3 = "DELETE FROM defective WHERE item_id = '$item_id' AND companyownership = '$location'";

            if ($conn->query($sql3) === TRUE) {
                echo json_encode(['data' => 'Row removed successfully']);
            } else {
                echo json_encode(['data' => 'Error removing row: ' . $conn->error]);
            }
        } else {
            echo json_encode(['data' => 'Error removing row: ' . $conn->error]);
        }   

        $conn->close();
        exit();

?>

