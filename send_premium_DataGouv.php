<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Log all POST data for debugging
    error_log(print_r($_POST, true));

    // Collect and sanitize input
    $firstName = htmlspecialchars(trim($_POST['firstName'] ?? ''));
    $lastName = htmlspecialchars(trim($_POST['lastName'] ?? ''));
    $job = htmlspecialchars(trim($_POST['job'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $pageUrl = htmlspecialchars(trim($_POST['pageUrl'] ?? ''));
    $company = htmlspecialchars(trim($_POST['company'] ?? ''));

    // Check if pageUrl is empty
    if (empty($pageUrl)) {
        error_log("Error: pageUrl is missing.");
    } else {
        error_log("Received pageUrl: " . $pageUrl);
    }

    // Validate required fields
    if (empty($email)) {
        http_response_code(400);
        echo "Email is required.";
        exit;
    }

    // Prepare email content
    $to = "pejman.gohari@orbii.tech";
    $subject = "New Registration Request";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Email content
    $email_content = "
    <html>
    <body>
        <h2>New Registration Request for DataGouv In</h2>
        <p><strong>First Name:</strong> " . htmlspecialchars($firstName) . "</p>
        <p><strong>Last Name:</strong> " . htmlspecialchars($lastName) . "</p>
        <p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
        <p><strong>Job Title:</strong> " . htmlspecialchars($job) . "</p>
        <p><strong>Company:</strong> " . htmlspecialchars($company) . "</p>
        <p><strong>URL:</strong> " . htmlspecialchars($pageUrl) . "</p>
    </body>
    </html>";

    // Send email
    if (mail($to, $subject, $email_content, $headers)) {
        echo "Thank you for registering. We will contact you soon.";
    } else {
        http_response_code(500);
        echo "An error occurred. Please try again later.";
    }
} else {
    http_response_code(405);
    echo "Request method not allowed.";
}
?>
