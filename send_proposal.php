<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $expertise = htmlspecialchars($_POST['expertise']);
    $message = htmlspecialchars($_POST['message']);
    
    
    // Email configuration
    $to = "pejman.gohari@orbii.tech"; 
    $subject = "ORBII - New Link to publish";
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
      <p><strong>Description:</strong> {$description}</p>
      <p><strong>Link:</strong> {$link}</p>
    </body>
    </html>
    ";
    
    // Send the email
    if (mail($to, $subject, $email_content, $headers)) {
        echo "Thank you for applying. We will contact you soon!";
    } else {
        echo "Oops! Something went wrong, and we couldn't send your message.";
    }
}
?>
