<!doctype html>
 
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>jQuery UI Sortable - Drop placeholder</title>
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.9.1/themes/base/jquery-ui.css" />
    <script src="http://code.jquery.com/jquery-1.8.2.js"></script>
    <script src="http://code.jquery.com/ui/1.9.1/jquery-ui.js"></script>
    <link rel="stylesheet" href="/resources/demos/style.css" />
    <style>
    #sortable { list-style-type: none; margin: 0; padding: 0; width: 60%; }
    #sortable li { margin: 0 5px 5px 5px; padding: 5px; font-size: 1.2em; height: 1.5em; }
    html>body #sortable li { height: 1.5em; line-height: 1.2em; }
    .ui-state-highlight { height: 1.5em; line-height: 1.2em; }
    </style>
    <script>
    $(function() {
        $( "#sortable" ).sortable({
            placeholder: "ui-state-highlight"
        });
        $( "#sortable" ).disableSelection();
    });
    </script>
</head>
<body>
<?php
include ('conect.php');
$result = mysqli_query($conexion, "select * from personas order by orden");

if (mysqli_num_rows($result) != 0){
	echo '<form action="ordenar.php" method="post">';
	echo '<ul id="sortable">';
	while ($row = mysqli_fetch_assoc($result)){
		echo '<li class="ui-state-default"><input type="hidden" value="'.$row['id_persona'].'" name="idpersona[]" />'.$row['nombre'].'</li>';
	}
	echo '</ul>';
	echo '<input type="submit" value="Ordenar" name="ordenar" />';
	echo '</form>';
}
else{
	echo 'Aun no hay datos';
} 
?>

</body>
</html>