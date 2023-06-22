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

    $data = array();

    $sql1 = "SELECT item_name AS total FROM items";
    $result1 = $conn->query($sql1);
    
    // Process the results as needed
    if ($result1->num_rows > 0) {
        $data['result1'] = array(); // Initialize an empty array
    
        while ($row = $result1->fetch_assoc()) {
            $data['result1'][] = $row['total'];
        }
    } else {
        $data['result1'] = [];
    }
    
    
    $sql2 = "SELECT item_name AS total FROM items WHERE state='Defective'";
    $result2 = $conn->query($sql2);
    if ($result2->num_rows > 0) {
        $data['result2'] = array(); // Initialize an empty array
    
        while ($row = $result2->fetch_assoc()) {
            $data['result2'][] = $row['total'];
        }
    } else {
        $data['result2'] = [];
    }
    
    $sql3 = "SELECT name AS total FROM personels";
    $result3 = $conn->query($sql3);
    if ($result3->num_rows > 0) {
        $data['result3'] = array(); // Initialize an empty array
    
        while ($row = $result3->fetch_assoc()) {
            $data['result3'][] = $row['total'];
        }
    } else {
        $data['result3'] = [];
    }

    
    
    $sql4 = "SELECT name AS total FROM category";
    $result4 = $conn->query($sql4);
    if ($result4->num_rows > 0) {
        $data['result4'] = array(); // Initialize an empty array
    
        while ($row = $result4->fetch_assoc()) {
            $data['result4'][] = $row['total'];
        }
    } else {
        $data['result4'] = [];
    }
    
    
    $sql5 = "SELECT location AS location ,floor AS floor,fullname AS fullname FROM location";
    $result5 = $conn->query($sql5);
    if ($result5->num_rows > 0) {
        $data['result5'] = array(); // Initialize an empty array
        $data['result6'] = array(); // Initialize an empty array
        $data['result7'] = array(); // Initialize an empty array
    
        while ($row = $result5->fetch_assoc()) {
            $data['result5'][] = $row['location'];
            $data['result6'][] = $row['floor'];
            $data['result7'][] = $row['fullname'];
        }
        $data['count'] = $result5->num_rows;
    } else {
        $data['result5'] = [];
        $data['result6'] = [];
        $data['result7'] = [];
        $data['count'] = 0;
    }
    
    
    $sql6 = "SELECT name AS total FROM project";
    $result6 = $conn->query($sql6);
    if ($result6->num_rows > 0) {
        $data['result8'] = array(); // Initialize an empty array
    
        while ($row = $result6->fetch_assoc()) {
            $data['result8'][] = $row['total'];
        }
    } else {
        $data['result8'] = [];
    }
    echo json_encode($data);


    $conn->close();
    exit();

?>
