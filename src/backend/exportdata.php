<?php

include './access.php';

// Create connection
$position = $_POST['position'];

if($position === 'administrator'){
    $sql = 'SELECT * FROM items';
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $filename = 'itemlist.csv';

        // Set appropriate headers
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="' . $filename . '"');

        // Open the output stream
        $output = fopen('php://output', 'w');

        // Write the column headers
        fputcsv($output, array_keys($data[0]));

        // Write the data rows
        foreach ($data as $row) {
            fputcsv($output, $row);
        }

        // Close the output stream
        fclose($output);
    }else {
        $response = array('message' => 'No data found');
        echo json_encode($response);
        exit();
    }
}else if($position ==='moderator'){
    $company = $_POST['company'];
    $sql = "SELECT * FROM items WHERE location='$company'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $filename = 'itemlist.csv';

        // Set appropriate headers
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="' . $filename . '"');

        // Open the output stream
        $output = fopen('php://output', 'w');

        // Write the column headers
        fputcsv($output, array_keys($data[0]));

        // Write the data rows
        foreach ($data as $row) {
            fputcsv($output, $row);
        }

        // Close the output stream
        fclose($output);
    }else {
        $response = array('message' => 'No data found');
        echo json_encode($response);
        exit();
    }
}

        $conn->close();
        exit();

?>

