<?php

include './access.php';
// Create connection

      $position = $_POST['position'];
      if($position=='administrator'){
        $value = $_POST['value'];
        $property = $_POST['property'];
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
            $sql = "SELECT * FROM `items` WHERE itemid_company ='$value'";
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
        }else if ($property == 'Defective') {
          $sql = "SELECT * FROM items WHERE `condition` ='DEFECTIVE'";
          $result = $conn->query($sql);
              if ($result->num_rows > 0) {
              $data = $result->fetch_all(MYSQLI_ASSOC);
              echo json_encode(['data' => $data]);
              } else {
              echo json_encode(['data'=> 'Not Found!']);
              }
      }

      }else if ($position=='moderator'|| $position=='user'){
        $company = $_POST['company'];
        $value = $_POST['value'];
        $property = $_POST['property'];
        if($property == 'All'){
            $sql = "SELECT * FROM `items` WHERE location='$company'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Sort ASC'){
            $sql = "SELECT * FROM items WHERE location='$company' ORDER BY item_name ASC ";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Sort DESC'){
            $sql = "SELECT * FROM items WHERE location='$company' ORDER BY item_name DESC ";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Item Code'){
            $sql = "SELECT * FROM `items` WHERE itemid_company ='$value' and location='$company'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Item Name'){
            $sql = "SELECT * FROM `items` WHERE item_name ='$value' and location='$company'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Quantity'){
            $sql = "SELECT * FROM `items` WHERE quantity='$value' and location='$company'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Category'){
            $sql = "SELECT * FROM `items` WHERE category ='$value' and location='$company'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Location'){
            $sql = "SELECT * FROM `items` WHERE location = '$value' and location='$company'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if($property == 'Project'){
            $sql = "SELECT * FROM items WHERE project ='$value' and location='$company'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if ($property == 'Specific') {
            $sql = "SELECT * FROM items WHERE specificlocation ='$value' and location='$company'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['data' => $data]);
                } else {
                echo json_encode(['data'=> 'Not Found!']);
                }
        }else if ($property == 'Defective') {
          $sql = "SELECT * FROM items WHERE `condition` ='DEFECTIVE' and location='$company'";
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

