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
    $location = $_POST['location'];
    $value = $_POST['value'];
    if($value=='Defective Products'){
        $sql2 = "SELECT item_name as item_name,quantity as quantity FROM defective WHERE companyownership='$location'";
        $result2 = $conn->query($sql2);
        if ($result2->num_rows > 0) {
            $data['result2'] = array(); // Initialize an empty array
        
            while ($row = $result2->fetch_assoc()) {
                $data['result2'][] = $row['item_name'];
                $data['result11'][] = $row['quantity'];
            }
        } else {
            $data['result2'] = [];
        }
        
    }else {
        $data['result2'] = [];
    }
   
 
    echo json_encode($data);


    $conn->close();
    exit();

?>

