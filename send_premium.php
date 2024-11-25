<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Collect and sanitize input
    $firstName = htmlspecialchars(trim($_POST['firstName'] ?? ''));
    $lastName = htmlspecialchars(trim($_POST['lastName'] ?? ''));
    $job = htmlspecialchars(trim($_POST['job'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $pageUrl = htmlspecialchars(trim($_POST['pageUrl'] ?? ''));
    $company = htmlspecialchars(trim($_POST['company'] ?? ''));

    // Validate required fields
    if (empty($email)) {
        http_response_code(400);
        echo "Email is required.";
        exit;
    }

    // Prepare email content
    $to = "pejman.gohari@orbii.tech";
    $subject = "Nouvelle demande d'inscription";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Email content
    $email_content = "
    <html>
    <body>
        <h2>Nouvelle demande d'inscription</h2>
        <p><strong>Prénom:</strong> " . htmlspecialchars($firstName) . "</p>
        <p><strong>Nom:</strong> " . htmlspecialchars($lastName) . "</p>
        <p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
        <p><strong>Job title:</strong> " . htmlspecialchars($job) . "</p>
        <p><strong>Entreprise:</strong> " . htmlspecialchars($company) . "</p>
        <p><strong>URL:</strong> " . htmlspecialchars($pageUrl) . "</p>
    </body>
    </html>";

    // Send email
    if (mail($to, $subject, $email_content, $headers)) {
        echo "Merci pour votre inscription. Nous vous contacterons bientôt.";
    } else {
        http_response_code(500);
        echo "Une erreur est survenue. Veuillez réessayer plus tard.";
    }
} else {
    http_response_code(405);
    echo "Méthode de requête non autorisée.";
}
?>
