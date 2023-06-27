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

    $changinginfoDashboard = $_POST['companyownership'];
    
    $data1 = array();

    $sql1 = "SELECT item_name AS total FROM items WHERE location = '$changinginfoDashboard'";
    $result1 = $conn->query($sql1);
    
    // Process the results as needed
    if ($result1->num_rows > 0) {
        $data1['result1'] = array(); // Initialize an empty array
    
        while ($row = $result1->fetch_assoc()) {
            $data1['result1'][] = $row['total'];
        }
    } else {
        $data1['result1'] = [];
    }
    
    
    $sql2 = "SELECT item_name as item_name,quantity as quantity FROM defective WHERE companyownership = '$changinginfoDashboard' ";
    $result2 = $conn->query($sql2);
    if ($result2->num_rows > 0) {
        $data1['result2'] = array(); // Initialize an empty array
    
        while ($row = $result2->fetch_assoc()) {
            $data1['result2'][] = $row['item_name'];
            $data1['result11'][] = $row['quantity'];
        }
    } else {
        $data1['result2'] = [];
    }
    
    $sql3 = "SELECT name AS total,position as position,location as location FROM personels WHERE location = '$changinginfoDashboard'";
    $result3 = $conn->query($sql3);
    if ($result3->num_rows > 0) {
        $data1['result3'] = array(); // Initialize an empty array
        $data1['result9'] = array(); // Initialize an empty array
        $data1['result10'] = array(); // Initialize an empty array

        while ($row = $result3->fetch_assoc()) {
            $data1['result3'][] = $row['total'];
            $data1['result9'][] = $row['position'];
            $data1['result10'][] = $row['location'];
        }
        $data1['count1'] = $result3->num_rows;
    } else {
        $data1['result3'] = [];
        $data1['result9'] = [];
        $data1['result10'] = [];
        $data1['count1'] = 0;
    }
    
    $sql4 = "SELECT name AS total FROM category WHERE location = '$changinginfoDashboard'";
    $result4 = $conn->query($sql4);
    if ($result4->num_rows > 0) {
        $data1['result4'] = array(); // Initialize an empty array
    
        while ($row = $result4->fetch_assoc()) {
            $data1['result4'][] = $row['total'];
        }
    } else {
        $data1['result4'] = [];
    }
    
    
    $sql6 = "SELECT sponsors AS total FROM sponsors WHERE company = '$changinginfoDashboard'";
    $result6 = $conn->query($sql6);
    if ($result6->num_rows > 0) {
        $data1['result8'] = array(); // Initialize an empty array
    
        while ($row = $result6->fetch_assoc()) {
            $data1['result8'][] = $row['total'];
        }
    } else {
        $data1['result8'] = [];
    }
    echo json_encode($data1);


    $conn->close();
    exit();

?>

