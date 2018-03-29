<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "phpmyadmin", "myadmin123", "personas");

$result = $conn->query("SELECT id_persona, nombre FROM `personas` WHERE 1");

$outp = "[";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "[") {$outp .= ",";}
    $outp .= '{"Id":"'  . $rs["id_persona"] . '",';
    $outp .= '"Nombre":"'   . $rs["nombre"] . '"}';
}
$outp .="]";

$conn->close();

echo($outp);

?>