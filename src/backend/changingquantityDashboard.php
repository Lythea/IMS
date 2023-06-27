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
    $data = array();
    $dashboard = array();

    $sql1 = "SELECT COUNT(item_id) AS total FROM items WHERE location = '$changinginfoDashboard'";
    $result1 = $conn->query($sql1);
    
    // Process the results as needed
    if ($result1->num_rows > 0) {
        $row = mysqli_fetch_assoc($result1);
        $data['result1'] = $row['total'];

    } else {
        echo "No results found.";
    }
    
    $sql2 = "SELECT COALESCE(SUM(IFNULL(quantity, 0)), 0) AS total FROM defective WHERE companyownership = '$changinginfoDashboard'";
    $result2 = $conn->query($sql2);
    if ($result2->num_rows > 0) {
        $row = mysqli_fetch_assoc($result2);
        $data['result2'] = $row['total'];
    } else {
        echo "No results found.";
    }
    
    $sql3 = "SELECT COUNT(id) AS total FROM personels WHERE location = '$changinginfoDashboard'";
    $result3 = $conn->query($sql3);
    if ($result3->num_rows > 0) {
        $row = mysqli_fetch_assoc($result3);
        $data['result3'] = $row['total'];
    } else {
        echo "No results found.";
    }
    
    $sql4 = "SELECT COUNT(id) AS total FROM category WHERE location = '$changinginfoDashboard'";
    $result4 = $conn->query($sql4);
    if ($result4->num_rows > 0) {
        $row = mysqli_fetch_assoc($result4);
        $data['result4'] = $row['total'];
    } else {
        echo "No results found.";
    }
    
    $sql6 = "SELECT COUNT(id) AS total FROM sponsors WHERE company = '$changinginfoDashboard'";
    $result6 = $conn->query($sql6);
    if ($result6->num_rows > 0) {
        $row = mysqli_fetch_assoc($result6);
        $data['result6'] = $row['total'];
    } else {
        echo "No results found.";
    }

    echo json_encode($data);


    $conn->close();
    exit();

?>

