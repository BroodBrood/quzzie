<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST["name"]) || empty($_POST["email"]) || empty($_POST["password"]) || empty($_POST["password_confirmation"])) {
        die("All fields are required");
    }

    $name = $_POST["name"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $password_confirmation = $_POST["password_confirmation"];

    if ($password !== $password_confirmation) {
        die("Passwords do not match");
    }

    // Read existing data from the file
    $bestandsnaam = "data.txt";
    $existing_content = file_get_contents($bestandsnaam);

    // Append new data to the existing content
    $inhoud = "Name: $name\nEmail: $email\n\n";
    $combined_content = $existing_content . $inhoud;

    // Write the combined content back to the file
    file_put_contents($bestandsnaam, $combined_content);

    echo "Signup successful!";
} else {
    echo "Access denied";
}
?>
