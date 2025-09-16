<?php
// Configuración
$destinatario = "santib1502@gmail.com";
$asunto = "Mensaje desde el formulario de contacto 🧑‍⚖️‍📝";

// Verificar que los datos hayan sido enviados por POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sanitizar entradas
    $nombre = htmlspecialchars(trim($_POST["nombre"] ?? ''));
    $email = htmlspecialchars(trim($_POST["email"] ?? ''));
    $mensaje = htmlspecialchars(trim($_POST["mensaje"] ?? ''));

    // Validar campos requeridos
    if (empty($nombre) || empty($email) || empty($mensaje)) {
        http_response_code(400);
        echo json_encode(["ok" => false, "msg" => "Todos los campos son obligatorios."]);
        exit;
    }

    // Validar email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["ok" => false, "msg" => "Email inválido."]);
        exit;
    }

    // Armar cuerpo del mensaje
    $cuerpo = "Nombre: $nombre\n";
    $cuerpo .= "Email: $email\n";
    $cuerpo .= "Mensaje:\n$mensaje\n";

    $headers = "From: $nombre <$email>" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "Content-Type: text/plain; charset=UTF-8";

    // Enviar email
    $enviado = mail($destinatario, $asunto, $cuerpo, $headers);

    if ($enviado) {
        echo json_encode(["ok" => true, "msg" => "Mensaje enviado correctamente."]);
    } else {
        http_response_code(500);
        echo json_encode(["ok" => false, "msg" => "Error al enviar el mensaje."]);
    }
} else {
    http_response_code(405); // Método no permitido
    echo json_encode(["ok" => false, "msg" => "Método no permitido."]);
}
?>
