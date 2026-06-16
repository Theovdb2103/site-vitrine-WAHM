<?php
// Endpoint d'envoi des formulaires WAHM (Contact + Candidature formateur).
// Hébergement O2switch (PHP). Reçoit un POST multipart/form-data, valide, envoie un email.
// Sécurité : honeypot anti-spam + protection contre l'injection d'en-têtes.

header('Content-Type: application/json; charset=utf-8');

// ⚠️ À CONFIRMER avant mise en prod (dépend du domaine validé) :
$RECIPIENT = 'contact@worldacademyofhumanmovement.com';
$FROM      = 'no-reply@worldacademyofhumanmovement.com';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Méthode non autorisée.']);
  exit;
}

// Nettoyage : retire CR/LF (anti-injection d'en-têtes email).
function clean($s) {
  return trim(str_replace(["\r", "\n", "%0a", "%0d", "%0A", "%0D"], '', (string) $s));
}

$data = $_POST;

// Honeypot : champ caché "website" ; s'il est rempli => bot => on répond OK sans rien envoyer.
if (!empty($data['website'])) {
  echo json_encode(['ok' => true]);
  exit;
}

$type  = clean($data['_type'] ?? 'contact');
$nom   = clean($data['nom'] ?? '');
$email = clean($data['email'] ?? '');

// Validation minimale
$errors = [];
if ($nom === '')   $errors[] = 'nom';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'email';

if ($type === 'candidature') {
  if (clean($data['domaine'] ?? '') === '') $errors[] = 'domaine';
} else {
  if (clean($data['message'] ?? '') === '') $errors[] = 'message';
}

if (!empty($errors)) {
  http_response_code(422);
  echo json_encode(['ok' => false, 'error' => 'Champs requis manquants ou invalides.', 'fields' => $errors]);
  exit;
}

// Construction du message (les valeurs vont dans le CORPS, jamais dans les en-têtes)
$subject = $type === 'candidature'
  ? 'WAHM — Nouvelle candidature formateur'
  : 'WAHM — Nouveau message de contact';

$lines = ["Type : $type", "Nom : $nom", "Email : $email", ''];
foreach ($data as $k => $val) {
  if (in_array($k, ['_type', 'nom', 'email', 'website'], true)) continue;
  $lines[] = ucfirst($k) . " : " . trim((string) $val);
}
$body = implode("\n", $lines);

$headers = "From: WAHM <{$FROM}>\r\n"
  . "Reply-To: " . clean($nom) . " <{$email}>\r\n"
  . "Content-Type: text/plain; charset=utf-8\r\n";

$sent = @mail($RECIPIENT, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);

if (!$sent) {
  // Fallback : log local pour ne rien perdre si mail() échoue.
  @file_put_contents(__DIR__ . '/form-fallback.log', date('c') . ' ' . $body . "\n---\n", FILE_APPEND);
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => "L'envoi a échoué. Réessayez plus tard ou écrivez-nous directement."]);
  exit;
}

echo json_encode(['ok' => true]);
