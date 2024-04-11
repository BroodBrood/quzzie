<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get the total points and obtained points from the POST request
    $totalPoints = $_POST["totalPoints"];
    $obtainedPoints = $_POST["obtainedPoints"];

    // Save the scores to a file
    $file = fopen("scores.txt", "a");
    fwrite($file, "Total Points: " . $totalPoints . ", Obtained Points: " . $obtainedPoints . "\n");
    fclose($file);

    echo "Scores saved successfully!";
}
?>
