<?php
include './access.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

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
    $condition = $_POST['condition'];

    // Perform the insert query for $inputValue one by one

    $insertQuery = "INSERT INTO items (itemid_company, Serial, Property, item_name, quantity, category, project, specificlocation, location, image, par, `condition`)  VALUES ";

    foreach ($inputArray as $inputName => $inputData) {
        $inputValue = $inputData['value'];
        $inputQuantity = $inputData['quantity'];

        $escapedInputValue = $conn->real_escape_string($inputValue);
        $escapedInputQuantity = $conn->real_escape_string($inputQuantity);

        $insertQuery .= "SELECT COALESCE(MAX(itemid_company), 0) + 1, '$serial', '$property', '$itemname', '$escapedInputQuantity', '$category', '$sponsors', '$escapedInputValue', '$company', '$imgurl', '$parurl', '$condition' ";
        $insertQuery .= "FROM items WHERE location = '$company' UNION ALL ";
    }

    $insertQuery = rtrim($insertQuery, ' UNION ALL ');

    // Execute the insert query
    if ($conn->query($insertQuery) === TRUE) {
        echo json_encode(['data' => 'Data inserted successfully']);
    } else {
        echo json_encode(['data' => 'Error: ' . $insertQuery . '<br>' . $conn->error]);
    }

    // Access the values from the inputArray and process them as needed

} else {
    echo json_encode(['data' => 'No inputValues file uploaded']);
}

$conn->close();
exit();
?>
