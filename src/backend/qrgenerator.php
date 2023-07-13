<?php
include './access.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$code = $_POST['code'];
$specific = $_POST['specific'];
$location = $_POST['location'];
$company = $_POST['company'];

$data = array(); // Initialize the main data array

$sql = "SELECT location, quantity FROM defective WHERE item_id = '$code' AND location = '$specific'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data['result1'] = array(); // Initialize an empty array
    while ($row = $result->fetch_assoc()) {
        $data['result1'][] = $row;
    }
} else {
    $data['result1'] = 'Not found';
}

$sql2 = "SELECT * FROM items WHERE itemid_company = '$code' AND location = '$location' and specificlocation ='$specific'";
$result2 = $conn->query($sql2);

if ($result2->num_rows > 0) {
    $data['result2'] = array(); // Initialize an empty array
    $data['success1'] = 'Found';
    while ($row = $result2->fetch_assoc()) {
        $data['result2'][] = $row;
    }
} else {
    $data['success1'] = 'Not Found';
    $data['result2'] = 'Not Found';
}

echo json_encode($data);

$conn->close();
exit();

?>
