<?php

header ('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type: application/json, X-Auth-Token, Authorization, Origin');
header ('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$db="cti_inventory_system";
// Create connection
$conn = new mysqli($servername, $username, $password,$db);
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);}
    $data = array();
    $location = $_POST['location'];
    $value = $_POST['value'];
    if($value=='Defective Products'){
        $sql1 = "SELECT item_name as item_name,quantity as quantity FROM defective WHERE companyownership='$location'";
        $result1 = $conn->query($sql1);
        if ($result1->num_rows > 0) {
            $data['result1'] = array(); // Initialize an empty array
        
            while ($row = $result1->fetch_assoc()) {
                $data['result1'][] = $row['item_name'];
                $data['result2'][] = $row['quantity'];
            }
        } else {
            $data['result1'] = [];
        }
        
    } else if($value=='Personel'){
        $sql2 = "SELECT name AS total,position as position,location as location FROM personels WHERE location = '$location'";
        $result2 = $conn->query($sql2);
        if ($result2->num_rows > 0) {
            $data['result2'] = array(); // Initialize an empty array
            $data['result3'] = array(); // Initialize an empty array
            while ($row = $result2->fetch_assoc()) {
                $data['result2'][] = $row['total'];
                $data['result3'][] = $row['position'];
            }
        } else {
            $data['result2'] = [];
            $data['result3'] = [];
        }
    } else if($value=='Category'){
        $sql3 = "SELECT name AS total FROM category WHERE location = '$location'";
        $result3 = $conn->query($sql3);
        if ($result3->num_rows > 0) {
            $data['result4'] = array(); // Initialize an empty array
        
            while ($row = $result3->fetch_assoc()) {
                $data['result4'][] = $row['total'];
            }
        } else {
            $data['result4'] = [];
        }
    }else if($value=='Project'){
        $sql4 = "SELECT name AS total,company as company FROM sponsors WHERE company ='$location'";
        $result4 = $conn->query($sql4);
        if ($result4->num_rows > 0) {
            $data['result5'] = array(); // Initialize an empty array
        
            while ($row = $result4->fetch_assoc()) {
                $data['result5'][] = $row['total'];
                $data['result6'][] = $row['company'];
            }
        } else {
            $data['result5'] = [];
            $data['result6'] = [];
        }
    }
 
    echo json_encode($data);


    $conn->close();
    exit();

?>

