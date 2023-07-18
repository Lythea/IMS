<?php

include './access.php';
// Create connection
$conn = new mysqli($servername, $username, $password,$db);
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);}

    $data = array();
    $dashboard = array();
    $position = $_POST['position'];
    if($position == 'administrator'){
        $sql1 = "SELECT COUNT(item_id) AS total FROM items";
        $result1 = $conn->query($sql1);

        // Process the results as needed
        if ($result1->num_rows > 0) {
            $row = mysqli_fetch_assoc($result1);
            $data['result1'] = $row['total'];

        } else {
            echo "No results found.";
        }


        $sql2 = "SELECT SUM(quantity) AS total FROM defective";
        $result2 = $conn->query($sql2);
        if ($result2->num_rows > 0) {
            $row = mysqli_fetch_assoc($result2);
            $data['result2'] = $row['total'];
        } else {
            echo "No results found.";
        }

        $sql3 = "SELECT COUNT(id) AS total FROM personels";
        $result3 = $conn->query($sql3);
        if ($result3->num_rows > 0) {
            $row = mysqli_fetch_assoc($result3);
            $data['result3'] = $row['total'];
        } else {
            echo "No results found.";
        }

        $sql4 = "SELECT COUNT(id) AS total FROM category";
        $result4 = $conn->query($sql4);
        if ($result4->num_rows > 0) {
            $row = mysqli_fetch_assoc($result4);
            $data['result4'] = $row['total'];


        } else {
            echo "No results found.";
        }

        $sql5 = "SELECT COUNT(id) AS total FROM company";
        $result5 = $conn->query($sql5);
        if ($result5->num_rows > 0) {
            $row = mysqli_fetch_assoc($result5);
            $data['result5'] = $row['total'];
        } else {
            echo "No results found.";
        }

        $sql6 = "SELECT COUNT(sponsors) AS total FROM sponsors";
        $result6 = $conn->query($sql6);
        if ($result6->num_rows > 0) {
            $row = mysqli_fetch_assoc($result6);
            $data['result6'] = $row['total'];
        } else {
            echo "No results found.";
        }
    }else if ($position =='moderator'||$position =='user'){
    $company = $_POST['company'];
    $sql1 = "SELECT COUNT(itemid_company) AS total FROM items WHERE location = '$company'";
    $result1 = $conn->query($sql1);

    // Process the results as needed
    if ($result1->num_rows > 0) {
        $row = mysqli_fetch_assoc($result1);
        $data['result1'] = $row['total'];

    } else {
        echo "No results found.";
    }


    $sql2 = "SELECT SUM(quantity) AS total FROM defective WHERE companyownership = '$company'";
    $result2 = $conn->query($sql2);
    if ($result2->num_rows > 0) {
        $row = mysqli_fetch_assoc($result2);
        $data['result2'] = $row['total'];
    } else {
        echo "No results found.";
    }

    $sql3 = "SELECT COUNT(id) AS total FROM personels WHERE location = '$company'";
    $result3 = $conn->query($sql3);
    if ($result3->num_rows > 0) {
        $row = mysqli_fetch_assoc($result3);
        $data['result3'] = $row['total'];
    } else {
        echo "No results found.";
    }

    $sql4 = "SELECT COUNT(id) AS total FROM category WHERE location = '$company'";
    $result4 = $conn->query($sql4);
    if ($result4->num_rows > 0) {
        $row = mysqli_fetch_assoc($result4);
        $data['result4'] = $row['total'];


    } else {
        echo "No results found.";
    }

    $sql5 = "SELECT COUNT(id) AS total FROM company";
    $result5 = $conn->query($sql5);
    if ($result5->num_rows > 0) {
        $row = mysqli_fetch_assoc($result5);
        $data['result5'] = $row['total'];
    } else {
        echo "No results found.";
    }

    $sql6 = "SELECT COUNT(sponsors) AS total FROM sponsors WHERE company = '$company' ";
    $result6 = $conn->query($sql6);
    if ($result6->num_rows > 0) {
        $row = mysqli_fetch_assoc($result6);
        $data['result6'] = $row['total'];
    } else {
        echo "No results found.";
    }

    }

    echo json_encode($data);
    $conn->close();
    exit();

?>

