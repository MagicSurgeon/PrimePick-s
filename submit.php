<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Create an associative array with the form data
    $newMessage = array(
        "name" => $name,
        "phone" => $phone,
        "email" => $email,
        "message" => $message
    );

    // Define the path to the JSON file
    $file = 'json/Messages.json';

    // Read the existing data from Messages.json
    if (file_exists($file)) {
        $currentData = file_get_contents($file);
        $arrayData = json_decode($currentData, true);
    } else {
        $arrayData = array();
    }

    // Append the new message to the array
    $arrayData[] = $newMessage;

    // Encode the array back to JSON and save it to the file
    $finalData = json_encode($arrayData, JSON_PRETTY_PRINT);
    if (file_put_contents($file, $finalData)) {
        // Redirect to the thank you page
        header("Location: thankyou.html");
        exit;
    } else {
        echo "There was an error saving your message.";
    }
} else {
    echo "Invalid request.";
}
?>
