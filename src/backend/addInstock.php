<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
include './access.php';

// Create connection


// Check if the inputValues file is uploaded and not empty
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
      } elseif (substr($key, -9) === 'condition') { // Check if the key ends with 'condition'
          // Extract the input name by removing the 'condition' suffix
          $inputName = substr($key, 0, -9);

          // Store the condition value in the inputArray
          $inputArray[$inputName]['condition'] = $value;
      } else {
          // Store the input value in the inputArray
          $inputArray[$key]['value'] = $value;
      }
  }

    $company = $_POST['company'];
    $sponsors = $_POST['sponsors'];
    $category = $_POST['category'];
    $itemname = $_POST['itemname'];
    $quantity = $_POST['quantity'];
    $imgurl = $_POST['imgurl'];
    $parurl = $_POST['parurl'];
    $serial = $_POST['serial'];
    $property = $_POST['property'];

    // Perform the insert query for $inputValue one by one

    $insertQueries = array();

$maxItemIdQuery = "SELECT COALESCE(MAX(itemid_company), 0) + 1 FROM items WHERE location = '$company'";
$maxItemIdResult = $conn->query($maxItemIdQuery);
$maxItemIdRow = $maxItemIdResult->fetch_assoc();
$maxItemId = $maxItemIdRow['COALESCE(MAX(itemid_company), 0) + 1'];

foreach ($inputArray as $inputName => $inputData) {
    $inputValue = $inputData['value'];
    $inputQuantity = $inputData['quantity'];
    $inputCondition = $inputData['condition'];

    $escapedInputValue = $conn->real_escape_string($inputValue);
    $escapedInputQuantity = $conn->real_escape_string($inputQuantity);
    $escapedInputCondition = $conn->real_escape_string($inputCondition);

    $insertQuery = "INSERT INTO items (itemid_company, Serial, Property, item_name, quantity, category, project, specificlocation, location, image, par, `condition`) VALUES ";
    $insertQuery .= "($maxItemId, '$serial', '$property', '$itemname', '$escapedInputQuantity', '$category', '$sponsors', '$escapedInputValue', '$company', '$imgurl', '$parurl', '$escapedInputCondition'); ";

    $maxItemId++; // Increment the itemid_company value for the next iteration

    // Check if the three values are different
    if (count(array_unique([$escapedInputValue, $escapedInputQuantity, $escapedInputCondition])) === 3) {
        // Duplicate the insert query with all other values being the same
        $insertQueries[] = $insertQuery;
    }
}

// Execute the insert queries
if (count($insertQueries) > 0) {
    $allInsertQueries = implode("", $insertQueries);
    if ($conn->multi_query($allInsertQueries) === TRUE) {
        echo json_encode(['data' => 'Data inserted successfully']);
    } else {
        echo json_encode(['data' => 'Error: ' . $conn->error]);
    }
} else {
    echo json_encode(['data' => 'No unique data to insert']);
}

    // Access the values from the inputArray and process them as needed

} else {
    echo json_encode(['data' => 'No inputValues file uploaded']);
}

$conn->close();
exit();
?>
