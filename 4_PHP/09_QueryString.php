<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
  <head>
    <title>Number squaring</title>
    <link rel="stylesheet" type="text/css" href="common.css" />
    <style type="text/css">
      th { text-align: left; background-color: #999; }
      th, td { padding: 0.4em; }
      tr.alt td { background: #ddd; }
    </style>
  </head>
  <body>

<?php

// Aca no existen numeros de pagina, nos posicionamos sobre un numero (ej el 10) 
// y mostramos una cantidad contante determinada de elementos a mostrar a partir
// del 10

// Constante que almacena la cantidad de elementos por pagina
define( "PAGE_SIZE", 10 );
$start = 0;

// Verifica si el numero solicitado a partir del cual comienza la pagina es valido
if ( isset( $_GET["start"] ) and $_GET["start"] >= 0 and $_GET["start"] <= 1000000 ) {
  $start = (int) $_GET["start"];
}

// El ultimo numero a mostrar por pagina es el numero a partir del cual se 
// comienza a mostrar mas la cantidad de elementos a mostrar por pagina
// menos uno porque estas contando el primer elemento a partir del cual mostrar
$end = $start + PAGE_SIZE - 1;

?>
    <h2>Number squaring</h2>

    <p>Displaying the squares of the numbers <?php echo $start ?> to <?php echo $end ?>:</p>

    <table cellspacing="0" border="0" style="width: 20em; border: 1px solid #666;">
      <tr>
        <th>n</th>
        <th>n<sup>2</sup></th>
      </tr>
<?php
for ( $i=$start; $i <= $end; $i++ )
{
?>
      <tr<?php if ( $i % 2 != 0 ) echo ' class="alt"' ?>>
        <td><?php echo $i?></td>
        <td><?php echo pow( $i, 2 )?></td>
      </tr>
<?php
}
?>
    </table>
    
    <!-- A continuacion hacemos uso del query string-->
    <p>
<?php if ( $start > 0 ) { ?>
      <a href="number_squaring.php?start=<?php echo $start - PAGE_SIZE ?>">&lt;Previous Page</a> | 
<?php } ?>
      <a href="number_squaring.php?start=<?php echo $start + PAGE_SIZE ?>">Next Page &gt;</a>
    </p>

  </body>
</html>