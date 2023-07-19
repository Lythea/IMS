<?php

include './access.php';
// Create connection
$conn = new mysqli($servername, $username, $password,$db);
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);}
    $code = $_POST['code'];
    $location = $_POST['location'];

    $sql2 = "DELETE FROM items WHERE itemid_company = '$code' AND location = '$location'";
    if ($conn->query($sql2) === TRUE) {
        echo json_encode(['data' => 'Row removed successfully']);
    } else {
        echo json_encode(['data' => 'Error removing row: ' . $conn->error]);
    }
        $conn->close();
        exit();

?>

