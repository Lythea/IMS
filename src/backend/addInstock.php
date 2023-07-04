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


$inputValues = $_FILES['inputValues']['tmp_name'];

// Read the contents of the inputValues file
$inputValuesContent = file_get_contents($inputValues);

// Parse the JSON data
$inputValuesData = json_decode($inputValuesContent, true);

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
// Access the values from the inputArray
foreach ($inputArray as $inputName => $inputData) {
  $inputValue = $inputData['value'];
  $inputQuantity = $inputData['quantity'];

  // Process the values as needed
  // ...
}
$company = $_POST['company'];
$sponsors = $_POST['sponsors'];
$category = $_POST['category'];
$itemname= $_POST['itemname'];
$quantity = $_POST['quantity'];
$imgurl = $_POST['imgurl'];
$parurl = $_POST['parurl'];
$sql = "INSERT INTO items (item_name,quantity, category,project,location,image,par) VALUES ('$itemname','$quantity','$category','$sponsors','$company','$imgurl','$parurl')";
if ($conn->query($sql) === TRUE) {
    $lastInsertID = $conn->insert_id; 

    $insertQuery = "INSERT INTO ownership (item_id, location, personel, quantity) VALUES ";

foreach ($inputArray as $inputName => $inputData) {
  $inputValue = $inputData['value'];
  $inputQuantity = $inputData['quantity'];

  $escapedInputValue = $conn->real_escape_string($inputValue);
  $escapedInputQuantity = $conn->real_escape_string($inputQuantity);

  $insertQuery .= "('$lastInsertID', '$company', '$escapedInputValue', '$escapedInputQuantity'), ";
}

$insertQuery = rtrim($insertQuery, ', ');

// Execute the insert query
if ($conn->query($insertQuery) === TRUE) {
    echo json_encode(['data' => 'Data inserted successfully']);
} else {
    echo json_encode(['data' => 'Error: ' . $sql . '<br>' . $conn->error]);
}
} else {
    echo json_encode(['data' => 'Error: ' . $sql . '<br>' . $conn->error]);
}
echo json_encode($data);
?>