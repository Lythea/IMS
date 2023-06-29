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


    $property = $_POST['property'];


    if($property =='Defective Products' ){
        $itemcode = $_POST['defectiveForm_itemcode'];
        $location = $_POST['defectiveForm_location'];
        $quantity = $_POST['defectiveForm_quantity'];
        
        // Select the current quantity for the given item and location
        $sql = "SELECT quantity FROM defective WHERE item_id ='$itemcode' AND companyownership = '$location'";
        $result = $conn->query($sql);
        
        if ($result->num_rows > 0) {
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $currentQuantity = $data[0]['quantity'];
        
        // Check if the current quantity is greater than 1
        if ($currentQuantity > 1) {
            // Update the data
            $newQuantity = $currentQuantity - $quantity;
            $updateSql = "UPDATE defective SET quantity = '$newQuantity' WHERE item_id ='$itemcode' AND companyownership = '$location'";
            $conn->query($updateSql);
        
            echo json_encode(['data' => 'Data updated successfully']);
        } else if ($currentQuantity == 1) {
            // Remove the entire row
            $deleteSql = "DELETE FROM defective WHERE item_id ='$itemcode' AND companyownership = '$location'";
            $conn->query($deleteSql);
        
            echo json_encode(['data' => 'Row removed successfully']);
        } else {
            echo json_encode(['data' => 'Quantity is less than 1, cannot update or remove']);
        }
        } else {
        echo json_encode(['data' => 'Not Found!']);
        }
    } else if($property =='Personel' ){
        $name = $_POST['personelForm_name'];
        $location = $_POST['personelForm_location'];

        // Delete the row from the database based on the provided conditions
        $sql = "DELETE FROM personels WHERE name = '$name' AND location = '$location'";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['data' => 'Row removed successfully']);
        } else {
            echo json_encode(['data' => 'Error removing row: ' . $conn->error]);
        }
    }else if($property =='Category' ){
        $name = $_POST['categoryForm_name'];
        $location = $_POST['categoryForm_location'];

        // Delete the row from the database based on the provided conditions
        $sql = "DELETE FROM category WHERE name = '$name' AND location = '$location'";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['data' => 'Row removed successfully']);
        } else {
            echo json_encode(['data' => 'Error removing row: ' . $conn->error]);
        }
    }else if($property =='Location' ){
        
        $location = $_POST['locationForm_location'];

        // Delete the row from the database based on the provided conditions
        $sql = "DELETE FROM location WHERE location = '$location'";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['data' => 'Row removed successfully']);
        } else {
            echo json_encode(['data' => 'Error removing row: ' . $conn->error]);
        }
    }else if($property =='Project' ){
        $name = $_POST['projectForm_name'];
        $location = $_POST['projectForm_location'];

        // Delete the row from the database based on the provided conditions
        $sql = "DELETE FROM sponsors WHERE sponsors = '$name' AND location = '$location'";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['data' => 'Row removed successfully']);
        } else {
            echo json_encode(['data' => 'Error removing row: ' . $conn->error]);
        }
    }
    

    $conn->close();
    exit();

?>

