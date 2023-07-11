<?php

include './access.php';
$conn = new mysqli($servername, $username, $password,$db);
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);}
    $data = array();
    $position = $_POST['position'];
    $company = $_POST['company'];
    
    if ($position == 'moderator') {
        $sql = "SELECT itemid_company, location FROM items";
        $result = $conn->query($sql);
    
        // Process the results as needed
        if ($result->num_rows > 0) {
            $data['result1'] = array(); // Initialize an empty array
            $data['result2'] = array();
    
            while ($row = $result->fetch_assoc()) {
                $data['result1'][] = $row['itemid_company'];
                $data['result2'][] = $row['location'];
            }
    
            // Perform the second SELECT query
            $ids = implode(',', $data['result1']); // Convert the item IDs to a comma-separated string
            $locations = implode("','", $data['result2']); // Convert the locations to a comma-separated string
    
            $secondSql = "SELECT item_id, GROUP_CONCAT(CONCAT(quantity, ' - ', `specific`) ORDER BY id SEPARATOR ', ') AS quantity_specific_values, SUM(quantity) AS total_quantity FROM ownership WHERE item_id IN ($ids) AND location IN ('$locations') GROUP BY item_id";
            $secondResult = $conn->query($secondSql);
            
            if ($secondResult->num_rows > 0) {
                $data['result3'] = array(); // Initialize an empty array for the quantity and specific values
            
                while ($row = $secondResult->fetch_assoc()) {
                    $quantitySpecificValues = $row['quantity_specific_values'];
                    $totalQuantity = $row['total_quantity'];
                    
                    $data['result3'][$row['item_id']] = array(
                        'quantity_specific_values' => $quantitySpecificValues,
                        'total_quantity' => $totalQuantity
                    );
                }
            } else {
                // Handle case when no rows are returned from the second query
                $data['result3'] = [];
            }
            
        } else {
            $data['result1'] = [];
            $data['result2'] = [];
            $data['result3'] = [];
        }
    }else if ($position=='admin' || $position=='user'){
        $sql = "SELECT item_id, location FROM items WHERE location ='$company'";
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
    
            $secondSql = "SELECT item_id, GROUP_CONCAT(CONCAT(quantity, ' - ', `specific`) ORDER BY id SEPARATOR ', ') AS quantity_specific_values, SUM(quantity) AS total_quantity FROM ownership WHERE item_id IN ($ids) AND location IN ('$locations') GROUP BY item_id";
            $secondResult = $conn->query($secondSql);
            
            if ($secondResult->num_rows > 0) {
                $data['result3'] = array(); // Initialize an empty array for the quantity and specific values
            
                while ($row = $secondResult->fetch_assoc()) {
                    $quantitySpecificValues = $row['quantity_specific_values'];
                    $totalQuantity = $row['total_quantity'];
                    
                    $data['result3'][$row['item_id']] = array(
                        'quantity_specific_values' => $quantitySpecificValues,
                        'total_quantity' => $totalQuantity
                    );
                }
            } else {
                // Handle case when no rows are returned from the second query
                $data['result3'] = [];
            }
            
        } else {
            $data['result1'] = [];
            $data['result2'] = [];
            $data['result3'] = [];
        }
    }
    
  
    echo json_encode($data);


    $conn->close();
    exit();

?>

