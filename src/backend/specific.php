<?php

include './access.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = array();
$resultArray = [];

$sql1 = "SELECT location FROM company";
$result1 = $conn->query($sql1);
if ($result1->num_rows > 0) {
    $data['result1'] = array(); // Initialize an empty array
    while ($row = $result1->fetch_assoc()) {
        $data['result1'][] = $row['location'];
    }
} else {
    $data['result1'] = [];
}

$sql2 = "SELECT location AS total FROM location";
$result2 = $conn->query($sql2);
if ($result2->num_rows > 0) {
    $data['result2'] = array(); // Initialize an empty array
    while ($row = $result2->fetch_assoc()) {
        $data['result2'][] = $row['total'];
    }
} else {
    $data['result2'] = [];
}

$sql3 = "SELECT name AS total FROM personels";
$result3 = $conn->query($sql3);
if ($result3->num_rows > 0) {
    $data['result3'] = array(); // Initialize an empty array
    while ($row = $result3->fetch_assoc()) {
        $data['result3'][] = $row['total'];
    }
} else {
    $data['result3'] = [];
}

$resultArray = array_merge($data['result1'], $data['result2'], $data['result3']);

$response = array(
    'resultArray' => $resultArray,
    'data' => $data
);

echo json_encode($response);

$conn->close();
exit();
?>
