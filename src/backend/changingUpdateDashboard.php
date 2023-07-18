<?php

include './access.php';
// Create connection
$conn = new mysqli($servername, $username, $password,$db);
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);}

    $location = $_POST['location'];
    $position = $_POST['position'];
    $data = array();
    if($position == 'administrator'){
        $sql1 = "SELECT name AS total FROM category WHERE location = '$location'";
        $result1 = $conn->query($sql1);
        if ($result1->num_rows > 0) {
            $data['result1'] = array(); // Initialize an empty array

            while ($row = $result1->fetch_assoc()) {
                $data['result1'][] = $row['total'];
            }
        } else {
            $data['result1'] = [];
        }
        $sql2 = "SELECT sponsors AS total FROM sponsors WHERE company = '$location'";
        $result2 = $conn->query($sql2);
        if ($result2->num_rows > 0) {
            $data['result2'] = array(); // Initialize an empty array

            while ($row = $result2->fetch_assoc()) {
                $data['result2'][] = $row['total'];
            }
        } else {
            $data['result2'] = [];
        }
        $sql3 = "SELECT *AS total FROM items WHERE company = '$location'";
        $result3 = $conn->query($sql3);
        if ($result3->num_rows > 0) {
            $data['result3'] = array(); // Initialize an empty array

            while ($row = $result3->fetch_assoc()) {
                $data['result3'][] = $row['total'];
            }
        } else {
            $data['result3'] = [];
        }
    }else if ($position == 'moderator'){
        $sql1 = "SELECT name AS total FROM category WHERE location = '$location'";
        $result1 = $conn->query($sql1);
        if ($result1->num_rows > 0) {
            $data['result1'] = array(); // Initialize an empty array

            while ($row = $result1->fetch_assoc()) {
                $data['result1'][] = $row['total'];
            }
        } else {
            $data['result1'] = [];
        }
        $sql2 = "SELECT sponsors AS total FROM sponsors WHERE company = '$location'";
        $result2 = $conn->query($sql2);
        if ($result2->num_rows > 0) {
            $data['result2'] = array(); // Initialize an empty array

            while ($row = $result2->fetch_assoc()) {
                $data['result2'][] = $row['total'];
            }
        } else {
            $data['result2'] = [];
        }
        $sql3 = "SELECT *AS total FROM items WHERE company = '$location'";
        $result3 = $conn->query($sql3);
        if ($result3->num_rows > 0) {
            $data['result3'] = array(); // Initialize an empty array

            while ($row = $result3->fetch_assoc()) {
                $data['result3'][] = $row['total'];
            }
        } else {
            $data['result3'] = [];
        }
    }


    echo json_encode($data);


    $conn->close();
    exit();

?>

