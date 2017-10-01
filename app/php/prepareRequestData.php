<?php
$req = json_decode(trim(file_get_contents('php://input')), true);

function sanitizeString($var) {
    if (get_magic_quotes_gpc())
    $var = stripslashes($var);
    $var = htmlentities($var);
    $var = strip_tags($var);
    return $var;
}

function sanitizeMySQL($con, $var) {
    $var = mysqli_real_escape_string($con, $var);
    $var = sanitizeString($var);
    return $var;
}
?>