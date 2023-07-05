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
    $position = $_POST['position'];
    $company = $_POST['company'];
    if($position == 'moderator'){
        $sql = "SELECT item_id, location FROM items";
        $result = $conn->query($sql);
        
        // Process the results as needed
        if ($result->num_rows > 0) {
            $data['result1'] = array(); // Initialize an empty array
            $data['result2'] = array();
            while ($row = $result->fetch_assoc()) {
                $data['result1'][] = $row['item_id'];
                $data['result2'][] = $row['location'];
            }
        
            // Perform the second SELECT query
            $ids = implode(',', $data['result1']); // Convert the item IDs to a comma-separated string
            $locations = implode("','", $data['result2']); // Convert the locations to a comma-separated string
        
            $secondSql = "SELECT item_id, SUM(quantity) AS total_quantity FROM ownership WHERE item_id IN ($ids) AND location IN ('$locations') GROUP BY item_id";
            $secondResult = $conn->query($secondSql);

            if ($secondResult->num_rows > 0) {
                $data['result3'] = array(); // Initialize an empty array for the summed quantities
                while ($row = $secondResult->fetch_assoc()) {
                    $data['result3'][$row['item_id']] = $row['total_quantity'];
                }
            } else {
                // Handle case when no rows are returned from the second query
            }
        } else {
            $data['result1'] = [];
            $data['result2'] = [];
        }
    }
  
    echo json_encode($data);


    $conn->close();
    exit();

?>

