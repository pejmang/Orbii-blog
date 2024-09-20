<?php
// Configuration
$admin_email = "pejman.gohari@orbii.tech"; // Remplacez par votre adresse e-mail
$subject = "ORBII.FR - Nouvelle Proposition d'Article";

// Clés reCAPTCHA
$recaptcha_secret = "6LcwDEoqAAAAAL4nsH0zyQsHzu5r-7Q8IYVJdCaO"; // Remplacez par votre clé secrète reCAPTCHA

// Récupération des données du formulaire
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$title = isset($_POST['title']) ? trim($_POST['title']) : '';
$description = isset($_POST['description']) ? trim($_POST['description']) : '';
$link = isset($_POST['link']) ? trim($_POST['link']) : '';
$recaptcha_response = isset($_POST['g-recaptcha-response']) ? $_POST['g-recaptcha-response'] : '';

// Validation des données
if (empty($name) || empty($email) || empty($title) || empty($description) || empty($recaptcha_response)) {
    echo "error";
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "error";
    exit;
}

// Validation de reCAPTCHA
$recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
$recaptcha_data = array(
    'secret' => $recaptcha_secret,
    'response' => $recaptcha_response
);

$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($recaptcha_data)
    )
);

$context  = stream_context_create($options);
$recaptcha_verify = file_get_contents($recaptcha_url, false, $context);
$recaptcha_success = json_decode($recaptcha_verify);

if (!$recaptcha_success->success) {
    echo "error";
    exit;
}

// Préparation du message
$message = "Vous avez reçu une nouvelle proposition d'article :\n\n";
$message .= "Nom : $name\n";
$message .= "Email : $email\n";
$message .= "Titre de l'article : $title\n";
$message .= "Description :\n$description\n\n";
if (!empty($link)) {
    $message .= "Lien vers l'article ou la video/podcast : $link\n\n";
}

// Entêtes
$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";

// Envoi de l'email
if (mail($admin_email, $subject, $message, $headers)) {
    echo "success";
} else {
    echo "error";
}
?>
