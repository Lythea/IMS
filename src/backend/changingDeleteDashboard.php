<?php

include './access.php';
// Create connection
$conn = new mysqli($servername, $username, $password,$db);
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);}

    $location = $_POST['location'];
    $data = array();
    $sql1 = "SELECT item_name AS total FROM items WHERE location = '$location'";
    $result1 = $conn->query($sql1);
    if ($result1->num_rows > 0) {
        $data['result1'] = array(); // Initialize an empty array
    
        while ($row = $result1->fetch_assoc()) {
            $data['result1'][] = $row['total'];
        }
    } else {
        $data['result1'] = [];
    }
 
    echo json_encode($data);


    $conn->close();
    exit();

?>

