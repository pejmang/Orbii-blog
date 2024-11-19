<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check and sanitize form data
    $name = htmlspecialchars(trim($_POST['name'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $expertise = htmlspecialchars(trim($_POST['expertise'] ?? ''));
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));

    // Validate required fields
    if (empty($name) || empty($email) || empty($expertise) || empty($message)) {
        echo "All fields are required. Please complete the form.";
        exit;
    }

    // Email configuration
    $to = "pejman.gohari@orbii.tech"; // Replace with your email
    $subject = "New Insight Builder Application";
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Compose the email content
    $email_content = "
    <html>
    <head>
      <title>New Insight Builder Application</title>
    </head>
    <body>
      <h2>New Application for Insight Builder</h2>
      <p><strong>Name:</strong> {$name}</p>
      <p><strong>Email:</strong> {$email}</p>
      <p><strong>Expertise:</strong> {$expertise}</p>
      <p><strong>Message:</strong> {$message}</p>
    </body>
    </html>
    ";

    // Send the email
    if (mail($to, $subject, $email_content, $headers)) {
        echo "Thank you for applying. We will contact you soon!";
    } else {
        echo "Oops! Something went wrong, and we couldn't send your message.";
    }
} else {
    // Handle invalid request methods
    echo "Invalid request method. Please use the form to submit data.";
}
?>
