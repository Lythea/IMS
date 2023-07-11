<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Authorization, Origin');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$db = "cti_inventory_system";

// Create connection
$conn = new mysqli($servername, $username, $password, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$company = $_POST['company'];
$sponsors = $_POST['sponsors'];
$category = $_POST['category'];
$itemname = $_POST['itemname'];
$quantity = $_POST['quantity'];
$imgurl = $_POST['imgurl'];
$parurl = $_POST['parurl'];
$b_quantity = $_POST['b_quantity'];

$sql1 = "SELECT itemid_company AS total FROM items WHERE item_name = '$itemname' AND location = '$company'";
$result1 = $conn->query($sql1);

// Process the results as needed
if ($result1->num_rows > 0) {
    $itemid_company = $result1->fetch_assoc()['total'];

    $sql2 = "DELETE FROM `ownership` WHERE item_id = '$itemid_company' AND location = '$company'";

    if ($conn->query($sql2) === TRUE) {
        $sql = "UPDATE items SET item_name = '$itemname', quantity = '$quantity', category = '$category', project = '$sponsors', location = '$company', image = '$imgurl', par = '$parurl' WHERE itemid_company = '$itemid_company'";
        if ($conn->query($sql) === TRUE) {
            if ($b_quantity > 0) {
                if (isset($_FILES['inputValues']) && !empty($_FILES['inputValues']['tmp_name'])) {
                    $inputValues = $_FILES['inputValues']['tmp_name'];
                
                    // Read the contents of the inputValues file
                    $inputValuesContent = file_get_contents($inputValues);
                
                    if ($inputValuesContent === false) {
                        echo json_encode(['data' => 'Error reading inputValues file']);
                        exit();
                    }
                
                    // Parse the JSON data
                    $inputValuesData = json_decode($inputValuesContent, true);
                
                    if ($inputValuesData === null) {
                        echo json_encode(['data' => 'Error parsing JSON data']);
                        exit();
                    }
                
                    // Create an array to store the input values
                    $inputArray = [];
                
                    // Loop through the input values data
                    foreach ($inputValuesData as $key => $value) {
                        // Check if the key ends with 'quantity'
                        if (substr($key, -8) === 'quantity') {
                            // Extract the input name by removing the 'quantity' suffix
                            $inputName = substr($key, 0, -8);
                
                            // Store the input value and quantity in the inputArray
                            $inputArray[$inputName]['quantity'] = $value;
                        } else {
                            // Store the input value in the inputArray
                            $inputArray[$key]['value'] = $value;
                        }
                    }
                
                    // Access the values from the inputArray and process them as needed
                    foreach ($inputArray as $inputName => $inputData) {
                        $inputValue = $inputData['value'];
                        $inputQuantity = $inputData['quantity'];
                
                        // Process the values as needed
                        // ...
                    }
                
                    $company = $_POST['company'];
                    $sponsors = $_POST['sponsors'];
                    $category = $_POST['category'];
                    $itemname = $_POST['itemname'];
                    $quantity = $_POST['quantity'];
                    $imgurl = $_POST['imgurl'];
                    $parurl = $_POST['parurl'];
                
                
                        $insertQuery = "INSERT INTO ownership (item_id, location, `specific`, quantity) VALUES ";
                
                        foreach ($inputArray as $inputName => $inputData) {
                            $inputValue = $inputData['value'];
                            $inputQuantity = $inputData['quantity'];
                
                            $escapedInputValue = $conn->real_escape_string($inputValue);
                            $escapedInputQuantity = $conn->real_escape_string($inputQuantity);
                
                            $insertQuery .= "('$itemid_company', '$company', '$escapedInputValue', '$escapedInputQuantity'), ";
                        }
                
                        $insertQuery = rtrim($insertQuery, ', ');
                
                        // Execute the insert query
                        if ($conn->query($insertQuery) === TRUE) {
                            echo json_encode(['data' => 'Data inserted successfully']);
                        } else {
                            echo json_encode(['data' => 'Error: ' . $sql . '<br>' . $conn->error]);
                        }
                  
                } else {
                    echo json_encode(['data' => 'No inputValues file uploaded']);
                }
            } else if ($b_quantity == 0){
                $sql = "DELETE FROM ownership WHERE item_id = '$itemid_company'";
                if ($conn->query($sql) === TRUE) {
                    echo json_encode(['data' => 'Row removed successfully']);
                } else {
                    echo json_encode(['data' => 'Error removing row: ' . $conn->error]);
                }
            }
        } else {
            echo json_encode(['data' => 'Not Found!']);
        }
    } else {
        echo json_encode(['data' => 'Not Found!']);
    }
} else {
    echo json_encode(['data' => 'Not Found!']);
}

$conn->close();
exit();
?>
