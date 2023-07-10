<?php

header ('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type: application/json, X-Auth-Token, Authorization, Origin');
header ('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$db="cti_inventory_system";
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
            $sql = "SELECT item_id, item_name, quantity,category,project,location,image,par FROM items ORDER BY item_name ASC";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Sort DESC'){
            $sql = "SELECT item_id, item_name, quantity,category,project,location,image,par FROM items ORDER BY item_name DESC";
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
            $sql = "SELECT item_id FROM ownership WHERE `specific` = '$value'";
            $result = $conn->query($sql);
            if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                $itemIds = array_column($data, 'item_id');

                // Construct the second query using the extracted item_ids
                $secondSql = "SELECT * FROM items WHERE item_id IN (" . implode(',', $itemIds) . ")";
                $secondResult = $conn->query($secondSql);

                if ($secondResult->num_rows > 0) {
                    $secondData = $secondResult->fetch_all(MYSQLI_ASSOC);
                    echo json_encode(['data' => $secondData]);
                } else {
                    echo json_encode(['data' => 'Not Found!']);
                }
            } else {
                echo json_encode(['data' => 'Not Found!']);
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
            $sql = "SELECT itemid_company, item_name, quantity,category,project,location,image,par FROM items ORDER BY item_name ASC WHERE location = '$company'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Sort DESC'){
            $sql = "SELECT itemid_company, item_name, quantity,category,project,location,image,par FROM items ORDER BY item_name DESC WHERE location = '$company'";
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
            $sql = "SELECT * FROM ownership WHERE specific ='$value' WHERE location = '$company'";
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

