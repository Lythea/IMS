<?php

include './access.php';
// Create connection
$conn = new mysqli($servername, $username, $password,$db);
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);}

    $data = array();

        $sql5 = "SELECT location AS location ,floor AS floor,fullname AS fullname FROM company";
        $result5 = $conn->query($sql5);
        if ($result5->num_rows > 0) {
            $data['result5'] = array(); // Initialize an empty array
            $data['result6'] = array(); // Initialize an empty array
            $data['result7'] = array(); // Initialize an empty array
        
            while ($row = $result5->fetch_assoc()) {
                $data['result5'][] = $row['location'];
                $data['result6'][] = $row['floor'];
                $data['result7'][] = $row['fullname'];
            }
            $data['count'] = $result5->num_rows;
        } else {
            $data['result5'] = [];
            $data['result6'] = [];
            $data['result7'] = [];
            $data['count'] = 0;
        }
    


    echo json_encode($data);


    $conn->close();
    exit();

?>

