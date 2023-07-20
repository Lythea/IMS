<?php
include './access.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$company = $_POST['company'];
$sponsors = $_POST['sponsors'];
$category = $_POST['category'];
$quantity = $_POST['quantity'];
$imgurl = $_POST['imgurl'];
$parurl = $_POST['parurl'];
$specific = $_POST['specific'];
$newlocation =$_POST['newlocation'];
$code = $_POST['code'];
$sql = "UPDATE items SET  project = '$sponsors',category = '$category',specificlocation='$specific',quantity = '$quantity',  location = '$newlocation', image = '$imgurl', par = '$parurl' WHERE itemid_company = '$code' and location ='$company'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['data' => 'Row updated successfully']);
} else {
    echo json_encode(['data' => 'Error updating row: ' . $conn->error]);
}
$conn->close();
exit();
?>
