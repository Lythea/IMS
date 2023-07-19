<?php

include './access.php';
$sqlDropTable = "DROP TABLE IF EXISTS items";
if ($conn->query($sqlDropTable) !== true) {
  $response = ['data' => 'Error dropping table: ' . $conn->error];
  echo json_encode($response);
  exit;
}

$sqlCreateTable = "CREATE TABLE IF NOT EXISTS items (
  item_id INT AUTO_INCREMENT PRIMARY KEY,
  itemid_company INT,
  Serial VARCHAR(255),
  Property VARCHAR(255),
  item_name VARCHAR(255),
  quantity INT,
  category VARCHAR(255) DEFAULT NULL,
  project VARCHAR(255) DEFAULT NULL,
  specificlocation VARCHAR(255),
  location VARCHAR(255),
  image VARCHAR(255),
  par VARCHAR(255),
  `condition` VARCHAR(255),
  UNIQUE (item_id)
)";

if ($conn->query($sqlCreateTable) !== true) {
  $response = ['data' => 'Error creating table: ' . $conn->error];
  echo json_encode($response);
  exit;
}
// Check if a file was uploaded
if (isset($_FILES['file'])) {

    $target_dir = 'C:/xampp/htdocs/IMS/src/data/';
    $target_file = $target_dir . basename($_FILES["file"]["name"]);
    $uploadOk = 1;
    $fileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Check if file is a .csv
    if ($fileType != "csv") {
        $response = ['data' => 'Only .csv files are allowed.'];
        echo json_encode($response);
        exit;
    }

    // Move uploaded file to the server
    if ($uploadOk) {
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
            // File uploaded successfully, continue with data insertion or processing

            $csvFile = file($target_file);
            $csvData = array_map('str_getcsv', $csvFile);
            $headerLine = array_shift($csvData); // Remove the header line from the data

            // Database connection setup
            include './access.php';

            // Prepare the INSERT statement
            $stmt = $conn->prepare("INSERT INTO items (item_id, itemid_company, Serial, Property, item_name, quantity, category, project, specificlocation, location, image, par,`condition`)
                                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

            // Insert data into the database
            foreach ($csvData as $row) {
                // Check if the row has enough columns
                if (count($row) < 13) {
                    $response = ['data' => 'Invalid number of columns in the CSV file.'];
                    echo json_encode($response);
                    exit;
                }

                // Assign values from the row to variables
                $item_id = $row[0];
                $itemid_company = $row[1];
                $Serial = $row[2];
                $Property = $row[3];
                $item_name = $row[4];
                $quantity = $row[5];
                $category = $row[6];
                $project = $row[7];
                $specificlocation = $row[8];
                $location = $row[9];
                $image = $row[10];
                $par = $row[11];
                $condition = $row[12];
                // Check if the item_id already exists in the table
                $checkStmt = $conn->prepare("SELECT item_id FROM items WHERE item_id = ?");
                $checkStmt->bind_param("i", $item_id);
                $checkStmt->execute();
                $checkStmt->store_result();
                if ($checkStmt->num_rows > 0) {
                    $response = ['data' => 'Duplicate entry for item_id: ' . $item_id];
                    echo json_encode($response);
                    exit;
                }
                $checkStmt->close();

                // Bind the values to the prepared statement
                $stmt->bind_param("iisssisssssss", $item_id, $itemid_company, $Serial, $Property, $item_name, $quantity, $category, $project, $specificlocation, $location, $image, $par, $condition);

                // Execute the prepared statement
                if (!$stmt->execute()) {
                    $response = ['data' => 'Error inserting data: ' . $stmt->error];
                    echo json_encode($response);
                    exit;
                }
            }

            $stmt->close(); // Close the prepared statement
            $conn->close(); // Close the database connection
            unlink($target_file); // Delete the uploaded .csv file

            $response = ['data' => 'CSV file imported successfully.'];
            echo json_encode($response);
            exit;
        } else {
            $response = ['data' => 'Error moving uploaded file.'];
            echo json_encode($response);
            exit;
        }
    }
} else {
    $response = ['data' => 'No file uploaded.'];
    echo json_encode($response);
    exit;
}
?>
