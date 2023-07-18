<?php

include './access.php';

$property = $_POST['property'];
$position = $_POST['position'];


if ($position == 'administrator') {
    if ($property == 'Defective Products') {
        $itemname = $_POST['defectiveForm_name'];
        $location = $_POST['defectiveForm_location'];
        $quantity = $_POST['defectiveForm_quantity'];
        $specific = $_POST['defectiveForm_specific'];


        $sql = "SELECT itemid_company FROM items WHERE item_name = '$itemname'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $data = $result->fetch_all(MYSQLI_ASSOC);
            $itemid_company = $data[0]['itemid_company'];

            $sql1 = "SELECT item_name FROM defective WHERE item_name = '$itemname'";
            $result1 = $conn->query($sql1);

            if ($result1->num_rows > 0) {
                $sql = "SELECT quantity FROM defective WHERE itemid_company = '$itemid_company' AND companyownership = '$location'";
                $result = $conn->query($sql);

                if ($result->num_rows > 0) {
                    $data = $result->fetch_all(MYSQLI_ASSOC);
                    $currentQuantity = $data[0]['quantity'];

                    // Check if the current quantity is greater than 1
                    if ($currentQuantity >= 1) {
                        // Update the data
                        $newQuantity = $currentQuantity + $quantity;
                        $updateSql = "UPDATE defective SET quantity = '$newQuantity' WHERE itemid_company = '$itemid_company' AND companyownership = '$location'";
                        $conn->query($updateSql);

                        echo json_encode(['data' => 'Data updated successfully']);
                    } else {
                        echo json_encode(['data' => 'Not Found!']);
                    }
                } else {
                    echo json_encode(['data' => 'Not Found!']);
                }
            } else {
                $insertSql = "INSERT INTO defective (item_id, item_name, quantity,location, companyownership) VALUES ('$itemid_company', '$itemname', '$quantity','$specific', '$location')";

                if ($conn->query($insertSql) === TRUE) {
                    echo json_encode(['data' => 'Row inserted successfully']);
                } else {
                    echo json_encode(['data' => 'Error inserting row: ' . $conn->error]);
                }
            }
        } else {
            echo json_encode(['data' => 'No item found']);
        }
    } else if ($property == 'Personel') {
        $name = $_POST['personelForm_name'];
        $position = $_POST['personelForm_position'];
        $location = $_POST['personelForm_location'];

        $sql = "INSERT INTO personels (name, position, location) VALUES ('$name', '$position', '$location')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['data' => 'Row inserted successfully']);
        } else {
            echo json_encode(['data' => 'Error inserting row: ' . $conn->error]);
        }
    } else if ($property == 'Category') {
        $name = $_POST['categoryForm_name'];
        $location = $_POST['categoryForm_location'];

        $sql = "INSERT INTO category (location, name) VALUES ('$location', '$name')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['data' => 'Row inserted successfully']);
        } else {
            echo json_encode(['data' => 'Error inserting row: ' . $conn->error]);
        }
    } else if ($property == 'Location') {
        $acronym = $_POST['locationForm_acronym'];
        $name = $_POST['locationForm_name'];
        $floor = $_POST['locationForm_floor'];

        $sql = "INSERT INTO company (location, fullname, floor) VALUES ('$acronym', '$name', '$floor')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['data' => 'Row inserted successfully']);
        } else {
            echo json_encode(['data' => 'Error inserting row: ' .$conn->error]);
        }
    } else if ($property == 'Project') {
        $name = $_POST['projectForm_name'];
        $company = $_POST['projectForm_location'];

        $sql = "INSERT INTO sponsors (company, sponsors) VALUES ('$company', '$name')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['data' => 'Row inserted successfully']);
        } else {
            echo json_encode(['data' => 'Error inserting row: ' . $conn->error]);
        }
    } else if ($property == 'Others') {
        $name = $_POST['otherForm_name'];

        $sql = "INSERT INTO `location` (`location`) VALUES ('$name')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['data' => 'Row inserted successfully']);
        } else {
            echo json_encode(['data' => 'Error inserting row: ' . $conn->error]);
        }
    }
} else if ($position == 'moderator') {
    if ($property == 'Defective Products') {
        $itemname = $_POST['defectiveForm_name'];
        $location = $_POST['company'];
        $quantity = $_POST['defectiveForm_quantity'];

        $sql = "SELECT itemid_company FROM items WHERE item_name ='$itemname' and location ='$location'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $data = $result->fetch_all(MYSQLI_ASSOC);
            $itemid_company = $data[0]['itemid_company'];

            $sql1 = "SELECT item_name FROM defective WHERE item_name ='$itemname' and companyownership ='$location'";
            $result1 = $conn->query($sql1);

            if ($result1->num_rows > 0) {
                $sql = "SELECT quantity FROM defective WHERE itemid_company ='$itemid_company' AND companyownership = '$location'";
                $result = $conn->query($sql);

                if ($result->num_rows > 0) {
                    $data = $result->fetch_all(MYSQLI_ASSOC);
                    $currentQuantity = $data[0]['quantity'];

                    // Check if the current quantity is greater than 1
                    if ($currentQuantity >= 1) {
                        // Update the data
                        $newQuantity = $currentQuantity + $quantity;
                        $updateSql = "UPDATE defective SET quantity = '$newQuantity' WHERE itemid_company ='$itemid_company' AND companyownership = '$location'";
                        $conn->query($updateSql);

                        echo json_encode(['data' => 'Data updated successfully']);
                    } else {
                        echo json_encode(['data' => 'Not Found!']);
                    }
                } else {
                    echo json_encode(['data' => 'Not Found!']);
                }
            } else {
                $insertSql = "INSERT INTO defective (itemid_company, item_name, quantity, companyownership) VALUES ('$itemid_company', '$itemname', '$quantity', '$location')";

                if ($conn->query($insertSql) === TRUE) {
                    echo json_encode(['data' => 'Row inserted successfully']);
                } else {
                    echo json_encode(['data' => 'Error inserting row: ' . $conn->error]);
                }
            }
        } else {
            echo json_encode(['data' => 'No item found']);
        }
    } else if ($property == 'Personel') {
        $name = $_POST['personelForm_name'];
        $position = $_POST['personelForm_position'];
        $location = $_POST['company'];

        $sql = "INSERT INTO personels (name, position, location) VALUES ('$name', '$position', '$location')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['data' => 'Row inserted successfully']);
        } else {
            echo json_encode(['data' => 'Error inserting row: ' . $conn->error]);
        }
    } else if ($property == 'Category') {
        $name = $_POST['categoryForm_name'];
        $location = $_POST['categoryForm_location'];

        $sql = "INSERT INTO category (location, name) VALUES ('$location', '$name')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['data' => 'Row inserted successfully']);
        } else {
            echo json_encode(['data' => 'Error inserting row: ' . $conn->error]);
        }
    } else if ($property == 'Location') {
        $acronym = $_POST['locationForm_acronym'];
        $name = $_POST['locationForm_name'];
        $floor = $_POST['locationForm_floor'];

        $sql = "INSERT INTO company (location, fullname, floor) VALUES ('$acronym', '$name', '$floor')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['data' => 'Row inserted successfully']);
        } else {
            echo json_encode(['data' => 'Error inserting row: ' . $conn->error]);
        }
    } else if ($property == 'Project') {
        $name = $_POST['projectForm_name'];
        $location = $_POST['company'];

        $sql = "INSERT INTO sponsors (company, sponsors) VALUES ('$company', '$name')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['data' => 'Row inserted successfully']);
        } else {
            echo json_encode(['data' => 'Error inserting row: ' . $conn->error]);
        }
    }
}

$conn->close();
exit();
?>
