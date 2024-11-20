<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check and sanitize form data
    $firstName = htmlspecialchars(trim($_POST['firstName'] ?? ''));
    $lastName = htmlspecialchars(trim($_POST['lastName'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $company = htmlspecialchars(trim($_POST['company'] ?? ''));
    $offer = htmlspecialchars(trim($_POST['offer'] ?? ''));
    $comments = htmlspecialchars(trim($_POST['comments'] ?? ''));

    // Validate required fields
    if (empty($firstName) || empty($lastName) || empty($email) || empty($offer)) {
        echo "Tous les champs obligatoires doivent être remplis. Veuillez réessayer.";
        exit;
    }

    // Email configuration
    $to = "pejman.gohari@orbii.tech"; // Replace with your email
    $subject = "Nouvelle inscription - " . $offer;
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Compose the email content
    $email_content = "
    <html>
    <head>
      <title>Nouvelle inscription</title>
    </head>
    <body>
      <h2>Nouvelle inscription reçue</h2>
      <p><strong>Prénom :</strong> {$firstName}</p>
      <p><strong>Nom :</strong> {$lastName}</p>
      <p><strong>Email :</strong> {$email}</p>
      <p><strong>Entreprise :</strong> {$company}</p>
      <p><strong>Offre d'intérêt :</strong> {$offer}</p>
      <p><strong>Commentaires :</strong> {$comments}</p>
    </body>
    </html>
    ";

    // Send the email
    if (mail($to, $subject, $email_content, $headers)) {
        echo "Merci pour votre inscription ! Nous vous contacterons rapidement.";
    } else {
        echo "Oups ! Une erreur est survenue et nous n'avons pas pu envoyer votre message.";
    }
} else {
    // Handle invalid request methods
    echo "Méthode de requête invalide. Veuillez soumettre le formulaire.";
}
?>
