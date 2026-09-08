<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>

<head>
  <h1>Gráfica Coronavirus</h1>
  <meta charset="UTF-8">
  <title>Mapas</title>


  <?php


  include("./Conexion.php");
  $link = Conectarse();

  $var_consulta = "select * from Record";

  $var_query = $link -> query($var_consulta);
  $arreglo1 = [];
  $arreglo2 = [];
  $idd = "Marisol";
  $i = 0;
  while ($var_fila = $var_query->fetch_array()) {


    $id = $var_fila[0];
    $NE = $var_fila[1];
    $c = $var_fila[2];
    $arreglo1[$i] = $NE;
    $arreglo2[$i] = $c;
    $i = $i + 1;
    echo $id;
    echo $arreglo1[0];
    echo $arreglo2[0];

  }

  $link->close();
  ?>

  <script type="text/javascript">

    function retornarLienzo(x) {
      var canvas = document.getElementById(x);
      if (canvas.getContext) {
        var lienzo = canvas.getContext("2d");
        return lienzo;
      }
      else
        return false;
    }

    //var n1;
    //var n2;
    //var T1;
    //var T2;

    function dibujar() {
      var lienzo = retornarLienzo("lienzo1");
      if (lienzo) {
        //ejes
        lienzo.strokeStyle = "rgb(0,0,0)";
        lienzo.beginPath();
        lienzo.lineWidth = 5;
        //eje
        lienzo.moveTo(0, 0);
        lienzo.lineTo(0, 400);
        lienzo.lineTo(400, 400);
        lienzo.stroke();


        var m = '<?php echo $idd; ?>';
        alert(m);

        //numero1 = prompt("Datos de Estado de México");
        n1 = '<?php echo $arreglo2[0]; ?>';
        n2 = '<?php echo $arreglo2[1]; ?>';
        n3 = '<?php echo $arreglo2[2]; ?>';
        T1 = '<?php echo $arreglo1[0]; ?>';
        T2 = '<?php echo $arreglo1[1]; ?>';
        T3 = '<?php echo $arreglo1[2]; ?>';

        //barra 1
        lienzo.fillStyle = "rgb(255,51,51)";
        lienzo.beginPath();
        lienzo.fillRect(50, 400 - n1, 50, n1);
        //lienzo.stroke();
        lienzo.fill();
        lienzo.font = '12pt arial'
        lienzo.fillStyle = 'red'
        lienzo.fillText(T1, 50, 415);
        //barra 2
        lienzo.fillStyle = "rgb(100,100,100)";
        lienzo.beginPath();
        lienzo.fillRect(150, 400 - n2, 50, n2);
        //lienzo.stroke();
        lienzo.fill();
        lienzo.font = '12pt arial'
        lienzo.fillStyle = 'green'
        lienzo.fillText(T2, 150, 415);

        //barra 3
        lienzo.fillStyle = "rgb(123,211,244)";
        lienzo.beginPath();
        lienzo.fillRect(250, 400 - n3, 50, n3);
        //lienzo.stroke();
        lienzo.fill();
        lienzo.font = '12pt arial'
        lienzo.fillStyle = 'green'
        lienzo.fillText(T3, 250, 415);
      }

    }

  </script>

  <style type="text/css">
    body {
      padding-left: 11em;
      font-family: Georgia, "Times New Roman",
        Times, serif;
      font-size: 20px;
      color: purple;
      background-color: #BFEF7E
    }

    ul.navbar {
      list-style-type: none;
      padding: 0;
      margin: 0;
      position: absolute;
      top: 2em;
      left: 1em;
      width: 9em
    }

    h1 {
      font-family: Helvetica, Geneva, Arial,
        SunSans-Regular, sans-serif
    }

    ul.navbar li {
      background: white;
      margin: 0.5em 0;
      padding: 0.3em;
      border-right: 1em solid black
    }

    ul.navbar a {
      text-decoration: none
    }

    a:link {
      color: blue
    }

    a:visited {
      color: purple
    }

    address {
      margin-top: 1em;
      padding-top: 1em;
      border-top: thin dotted
    }

    .boton_1 {
      text-decoration: none;
      padding: 3px;
      padding-left: 10px;
      padding-right: 10px;
      font-family: helvetica;
      font-weight: 300;
      font-size: 25px;
      font-style: italic;
      color: #006505;
      background-color: #82b085;
      border-radius: 15px;
      border: 3px double #006505;
    }

    .boton_1:hover {
      opacity: 0.6;
      text-decoration: none;
    }
  </style>
</head>

<!-- Menú de navegación del sitio -->


<!-- Contenido principal -->
<h1>mapas</h1>

<body onLoad="dibujar()">
  <canvas id="lienzo1" width="1200" height="1000">
    Su navegador no permite utilizar canvas.
  </canvas>
</body>

</html>