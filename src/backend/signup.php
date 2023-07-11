<?php
include './access.php';
// Create connection
$conn = new mysqli($servername, $username, $password,$db);
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);}
    
        $name= $_POST['name'];  
        $email = $_POST['email'];
        $password = $_POST['password'];
        $position= $_POST['position']; 
        $company= $_POST['company']; 
        // Construct the INSERT query
        $sql = "INSERT INTO accounts (name,email, password,position,company) VALUES ('$name','$email', '$password','$position','$company')";

        if ($conn->query($sql) === TRUE) {
          
            echo json_encode(['data' => 'Data inserted successfully']);
        } else {
            echo json_encode(['data' => 'Error: ' . $sql . '<br>' . $conn->error]);
        }

        $conn->close();
        exit();

?>

