<?php
function Conectarse()
{
	$usuario = "root";
	$password = "";
	$database = "ejemplo";
	$servidor = "localhost";

	$link = mysqli_connect($servidor, $usuario, $password, $database);
	if (!$link) {
		echo "<h3>No se ha podido conectar PHP - MySQL, verifique sus datos.</h3><hr><br>";
	} else {
		return $link;
	}
	if (!$link)
		die("<h3>Fallo la conexión: </h3><p>" . mysqli_connect_error() . "<\p>");
}

?>