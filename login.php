<?php
session_start();

// Database connection settings
$connection_string = "XE"; // Update with your DB connection string
$db_username = "SYSTEM";
$db_password = "2005astha";

// Create a connection to Oracle database
$conn = oci_connect($db_username, $db_password, $connection_string);

if (!$conn) {
    $e = oci_error();
    die("Connection failed: " . htmlentities($e['message']));
}

// Get form data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $_POST['username'];
    $pass = $_POST['password'];
    $remember = isset($_POST['remember']);

    // Basic validation
    if (!empty($user) && !empty($pass)) {
        // Prepare SQL query
        $sql = "SELECT password FROM users WHERE username = :username";
        $stmt = oci_parse($conn, $sql);
        oci_bind_by_name($stmt, ':username', $user);
        oci_execute($stmt);

        // Check if user exists
        if ($row = oci_fetch_array($stmt, OCI_ASSOC)) {
            // Verify password
            if (password_verify($pass, $row['PASSWORD'])) {
                // Password is correct
                $_SESSION['username'] = $user;

                // Handle "Remember me" functionality
                if ($remember) {
                    setcookie("username", $user, time() + (86400 * 30), "/"); // 30 days
                }

                header("Location: welcome.php"); // Redirect to a welcome page
                exit();
            } else {
                echo "Invalid username or password.";
            }
        } else {
            echo "Invalid username or password.";
        }
    } else {
        echo "Please fill in all fields.";
    }
}

oci_close($conn);
?>
