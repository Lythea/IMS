<?php

include './access.php';
// Create connection
$conn = new mysqli($servername, $username, $password,$db);
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);}
      $company = $_POST['company'];
      $position = $_POST['position'];
      $value = $_POST['value'];
      $property = $_POST['property'];

      if($position=='moderator'){
        if($property == 'All'){
            $sql = "SELECT * FROM `items`";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Sort ASC'){
            $sql = "SELECT * FROM items ORDER BY item_name ASC";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Sort DESC'){
            $sql = "SELECT * FROM items ORDER BY item_name DESC";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Item Code'){
            $sql = "SELECT * FROM `items` WHERE item_id ='$value'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Item Name'){
            $sql = "SELECT * FROM `items` WHERE item_name ='$value'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Quantity'){
            $sql = "SELECT * FROM `items` WHERE quantity='$value'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Category'){
            $sql = "SELECT * FROM `items` WHERE category ='$value'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Location'){
            $sql = "SELECT * FROM `items` WHERE location = '$value'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Project'){
            $sql = "SELECT * FROM items WHERE project ='$value'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if ($property == 'Specific') {
            $sql = "SELECT * FROM items WHERE specificlocation ='$value'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }

      }else if ($position=='admin'|| $position=='user'){
        if($property == 'All'){
            $sql = "SELECT * FROM `items` WHERE location = '$company'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Sort ASC'){
            $sql = "SELECT * FROM items ORDER BY item_name ASC WHERE location = '$company'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Sort DESC'){
            $sql = "SELECT * FROM items ORDER BY item_name DESC WHERE location = '$company'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Item Code'){
            $sql = "SELECT * FROM `items` WHERE itemid_company ='$value' WHERE location = '$company'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Item Name'){
            $sql = "SELECT * FROM `items` WHERE item_name ='$value' WHERE location = '$company'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Quantity'){
            $sql = "SELECT * FROM `items` WHERE quantity='$value' WHERE location = '$company'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Category'){
            $sql = "SELECT * FROM `items` WHERE category ='$value' WHERE location = '$company'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Location'){
            $sql = "SELECT * FROM `items` WHERE location = '$value' WHERE location = '$company'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Project'){
            $sql = "SELECT * FROM `items` where project ='$value' WHERE location = '$company'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Specific'){
            $sql = "SELECT * FROM items WHERE specificlocation ='$value'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }
      }

      $conn->close();
      exit();

?>

