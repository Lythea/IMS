<?php
include './access.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$dataCount = 0;

$company = $_POST['company'];
$data = array(); // Initialize the main data array

  if (isset($_POST['generatedInputsData'])) {
    // Get the JSON data and convert it to a PHP array
    $generatedInputsDataJSON = $_POST['generatedInputsData'];
    $generatedInputsData = json_decode($generatedInputsDataJSON, true);

    $whereClause = '';
    foreach ($generatedInputsData as $inputName => $inputValue) {
      // Sanitize the input to prevent SQL injection (use prepared statements for better security)
      $inputName = $conn->real_escape_string($inputName);
      $inputValue = $conn->real_escape_string($inputValue);

      // Append conditions to the WHERE clause (assuming 'itemid_company' is the column name)
      $whereClause .= " OR (itemid_company = '$inputValue')";
    }

    // Remove the leading 'OR' from the WHERE clause
    $whereClause = ltrim($whereClause, ' OR');

    // Execute the SELECT query with the built WHERE clause
    $sql = "SELECT * FROM items WHERE $whereClause AND location='$company'";

    $result = $conn->query($sql);

    if ($result) {
      // Fetch the data from the result, if needed
      $data = array();
      while ($row = $result->fetch_assoc()) {
        $data[] = $row;
      }
      $dataCount = mysqli_num_rows($result);
      // You can return the data to the JavaScript code (frontend) as JSON, if needed
    // Close the database connection

  }
}



$response = array(
  'data' => $data,
  'count' => $dataCount,

);

echo json_encode($response);
$conn->close();
exit();
?>
