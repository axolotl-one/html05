function cargarCanvas(id, trazo) {
  const canvas = document.getElementById(id);
  canvas.style.display = "block";
  if(!canvas.getContext) { canvas.innerHTML = "Error en la Carga de Imagen"; return }
  const lienzo = canvas.getContext("2d");
  if(!lienzo) return;
  trazo(lienzo);
}

function cuadrado(lienzo){
  lienzo.fillStyle = "rgb(200,0,0)";
  lienzo.fillRect(10, 10, 100, 100);
}

function letraV(lienzo){
  lienzo.strokeStyle = "rgb(200,0,0)";
  lienzo.beginPath(); // Inicia trazo
  lienzo.moveTo(0,0);
  lienzo.lineTo(150,300);
  lienzo.lineTo(300,0); 
  lienzo.stroke(); //trazo de linea
}

function cuadricula(lienzo){
  lienzo.strokeStyle = "rgb(0,150,150)";
  lienzo.beginPath();
  for(let c = 0; c <= 300; c += 30)
  {
    lienzo.moveTo(c, 0);
    lienzo.lineTo(c, 300);
  }
  for(var f = 0; f <=300; f += 30)
  {
    lienzo.moveTo(0, f);
    lienzo.lineTo(300, f);
  }		  
  lienzo.stroke();
}

function rectangulo(lienzo){
  lienzo.strokeStyle = "rgb(0,150,150)";
  lienzo.strokeRect(25,50,200,100); //(x,y,b,h)
}

function tresCuadrados(lienzo){
  lienzo.strokeStyle = "rgb(150,25,25)";
  lienzo.strokeRect(10,10,50,50);
  lienzo.strokeStyle = "rgb(25,150,25)";
  lienzo.strokeRect(80,10,50,50);
  lienzo.strokeStyle = "rgb(25,25,150)";
  lienzo.strokeRect(150,10,50,50);
}

function lineas(lienzo){
  lienzo.beginPath();
    lienzo.strokeStyle = "rgb(255,0,0)";
    lienzo.lineWidth = 7;
    lienzo.moveTo(10,5);
    lienzo.lineTo(10,295);
    lienzo.stroke();

    lienzo.beginPath();
    lienzo.strokeStyle = "rgb(0,255,0)";
    lienzo.lineCap="butt";
    lienzo.moveTo(30,5);
    lienzo.lineTo(30,295);
    lienzo.stroke();
    lienzo.lineCap="round";

    lienzo.beginPath();
    lienzo.moveTo(50,5);
    lienzo.lineTo(50,295);
    lienzo.stroke();
    lienzo.lineCap="square";

    lienzo.beginPath();
    lienzo.moveTo(70,5);
    lienzo.lineTo(70,295);
    lienzo.stroke();

    lienzo.beginPath();
    lienzo.strokeStyle="rgb(0,0,255)";
    lienzo.lineJoin="bevel";
    lienzo.moveTo(100,90);
    lienzo.lineTo(130,10);
    lienzo.lineTo(160,90);
    lienzo.stroke();

    lienzo.beginPath();
    lienzo.lineJoin="round";
    lienzo.moveTo(100,180);
    lienzo.lineTo(130,100);
    lienzo.lineTo(160,180);
    lienzo.stroke();

    lienzo.beginPath();
    lienzo.lineJoin="miter";
    lienzo.moveTo(100,270);
    lienzo.lineTo(130,190);
    lienzo.lineTo(160,270);
    lienzo.stroke();
}

function triangulo(lienzo){
  lienzo.beginPath();
  lienzo.lineWidth = 20;
  lienzo.lineJoin = "round";
  lienzo.moveTo(150,20);
  lienzo.lineTo(20,280);
  lienzo.lineTo(280,280);
  lienzo.lineTo(150,20);
  lienzo.lineCap = "round";
  lienzo.stroke();
}

function relleno(lienzo){
  lienzo.fillStyle = "rgb(255,0,0)";
  lienzo.fillRect(10,10,200,100); //strokeRect linea; fillrect relleno
}

function degradado(lienzo){
  for(let f = 0; f <= 300; f += 6){
    for(let c = 0; c <= 30; c += 6){
      lienzo.fillStyle = "rgb(" + ((f / 6) * (c / 6)) + ",0,0)";
      lienzo.fillRect(f,c,6,6);
    }
  }
}

function degradados(lienzo){
  for(let f = 0; f <= 250; f++){
    for(let c = 0; c <= 250; c++){
      lienzo.fillStyle = "rgb(" + ((f + c)/2) + ",0,0)";
      lienzo.fillRect(f,c,1,1);
    }
  }
  for(let f = 0; f < 300; f += 5){
    for(let c = 300; c < 600; c += 5){
      lienzo.fillStyle = "rgb(" + ((f-300 + c) / 2) + ",0,0)";
      lienzo.fillRect(f,c,6,6);
    }
  }

  for(let f = 0; f <= 288; f += 18){
    for(let c = 650; c <= 938; c += 18){
      lienzo.fillStyle = "rgb(" + ((f / 18) * ((c-650) / 18)) + ",0,0)";
      lienzo.fillRect(f,c,18,18);
    }
  }
}

function garabatos(lienzo){
  lienzo.beginPath();
  lienzo.moveTo(10,150);
  lienzo.lineTo(60,10);
  lienzo.lineTo(110,150);
  lienzo.lineTo(160,10);
  lienzo.lineTo(210,150);
  lienzo.lineTo(260,10);
  lienzo.moveTo(10,460);
  lienzo.lineTo(180,250);
  lienzo.lineTo(110,495);
  lienzo.lineTo(260,300);
  lienzo.moveTo(300,155);
  lienzo.lineTo(350,155);
  lienzo.lineTo(350,40);
  lienzo.lineTo(450,40);
  lienzo.lineTo(450,155);
  lienzo.lineTo(500,155);
  lienzo.moveTo(300,250);
  lienzo.lineTo(500,250);
  lienzo.lineTo(500,450);
  lienzo.lineTo(300,450);
  lienzo.lineTo(300,250);
  lienzo.lineTo(400,450);
  lienzo.lineTo(500,250);
  lienzo.stroke();
}

function axel(lienzo){
  lienzo.beginPath();
  lienzo.moveTo(0,200);
  lienzo.lineTo(50,0);
  lienzo.lineTo(100,200);
  lienzo.moveTo(25,100)
  lienzo.lineTo(75,100);
  lienzo.moveTo(100,200)
  lienzo.lineTo(200,0);
  lienzo.moveTo(100,0)
  lienzo.lineTo(200,200);
  lienzo.lineTo(300,200);
  lienzo.moveTo(200,200)
  lienzo.lineTo(200,0);
  lienzo.lineTo(300,0);
  lienzo.moveTo(200,100)
  lienzo.lineTo(250,100);
  lienzo.moveTo(300,0);
  lienzo.lineTo(300,200);
  lienzo.lineTo(400,200);

  lienzo.stroke();
}

function borrado(lienzo){
    lienzo.fillStyle="rgb(190,25,25)";
    lienzo.fillRect(0,0,300,300); //(x,y,b,h)
    lienzo.clearRect(10,10,20,20); //(x,y,b,h)
    lienzo.clearRect(140,140,20,20);
    lienzo.clearRect(270,270,20,20);
}

function temporal(lienzo){
  lienzo.fillStyle = "rgb(25,150,150)";
  lienzo.fillRect(0,0,300,300);
  setTimeout(() => { lienzo.clearRect(0,0,300,300) }, 3000);
}

function contraste(lienzo){
  lienzo.fillStyle = "rgb(255,0,0)";
  lienzo.strokeStyle = "rgb(0,0,255)";
  lienzo.lineWidth = 5;
  lienzo.beginPath();
  lienzo.moveTo(150,10);
  lienzo.lineTo(10,290);
  lienzo.lineTo(290,290);
  lienzo.lineTo(150,10);
  lienzo.fill(); //Rellenar
  lienzo.stroke();
}

function paralelogramo(lienzo){
  lienzo.fillStyle = 'rgb(50,155,50)'
  lienzo.strokeStyle = 'rgb(20,100,20)'
  lienzo.lineWidth = 3;
  lienzo.beginPath();
  lienzo.moveTo(25,250);
  lienzo.lineTo(175,250);
  lienzo.lineTo(275,50);
  lienzo.lineTo(125,50);
  lienzo.lineTo(25,250);
  lienzo.fill();
  lienzo.stroke();
}

function arcos(lienzo){
  lienzo.strokeStyle = "rgb(255,0,0)";
  lienzo.beginPath(); // centro en (100,100) radio 50, angulo inicial, angulo final, en sentido ? horario : anti
  lienzo.arc(50,50,50,0,Math.PI,true); // (x,y,radio,ang.inc,radianes,antih-horario)
  lienzo.stroke(); 

  lienzo.strokeStyle = "rgb(230,100,20)";
  lienzo.beginPath();
  lienzo.arc(150,50,50,0,Math.PI,false);
  lienzo.stroke();

  lienzo.strokeStyle = "rgb(0,255,0)";
  lienzo.beginPath();
  lienzo.arc(250,50,50,0,Math.PI*2,true);
  lienzo.stroke();

  lienzo.fillStyle = "rgb(0,100,230)";
  lienzo.beginPath();    
  lienzo.arc(50,150,50,0,Math.PI,true);
  lienzo.fill();

  lienzo.fillStyle = "rgb(0,150,150)";
  lienzo.beginPath();    
  lienzo.arc(150,150,50,0,Math.PI,false);
  lienzo.fill();

  lienzo.fillStyle = "rgb(255,255,0)";
  lienzo.beginPath();
  lienzo.arc(250,150,50,0,Math.PI*2,true);
  lienzo.fill();

  lienzo.fillStyle = "rgb(0,150,150)";
  lienzo.beginPath(); // inicia en 90° y termina en 270° en horario
  lienzo.arc(50,250,50,Math.PI/2,Math.PI*(3/2),true);
  lienzo.fill();

  lienzo.strokeStyle = "rgb(0,255,0)";
  lienzo.beginPath(); // inicia en 90° y termina en 270° en antihorario
  lienzo.arc(150,250,50,Math.PI/2,Math.PI*(3/2),false);
  lienzo.stroke();

  lienzo.fillStyle = "rgb(255,250,0)";
  lienzo.beginPath(); // inicia en 45° y termina en 315° en antihorario
  lienzo.arc(250,250,50,Math.PI/4,Math.PI*(7/4),false);
  lienzo.lineTo(250,250);
  lienzo.fill();
}

function dibujar() {
  setInterval(graficarCirculo,20);
}

const pacman = { x: 0, caso: 0, boca: [[0,Math.PI*2],[Math.PI/6,Math.PI*(11/6)],[Math.PI/4,Math.PI*(7/4)],[Math.PI/6,Math.PI*(11/6)]] };
function animacion(lienzo) {
  setInterval(() => {
    lienzo.clearRect(0,0,300,300);
    lienzo.fillStyle="rgb(255,255,0)";
    lienzo.beginPath();
    lienzo.arc(pacman.x,150,30,pacman.boca[pacman.caso][0], pacman.boca[pacman.caso][1],false);
    if(pacman.caso !== 0) lienzo.lineTo(pacman.x,150);
    lienzo.fill();
    pacman.x += 10;
    pacman.caso = pacman.x/10%4
    if (pacman.x > 300) pacman.x = 0;
  }, 70);
}

function bezier(lienzo){
  lienzo.strokeStyle="rgb(255,0,0)";
  lienzo.beginPath();
  lienzo.moveTo(0,150);
  lienzo.bezierCurveTo(100,50,200,250,290,150);
  lienzo.stroke();
}

function ondas(lienzo){
  const onda = { f1: 50, f2: 250, dir: true }
  setInterval(() => {
    lienzo.clearRect(0,0,300,300);
    lienzo.strokeStyle="rgb(250,50,0)";
    lienzo.lineWidth = 10;
    lienzo.lineCap = "round";
    lienzo.beginPath();
    lienzo.moveTo(10,150);
    lienzo.bezierCurveTo(100,onda.f1,200,onda.f2,290,150);
    lienzo.stroke();
    if (onda.dir) {
      onda.f1++;
      onda.f2--;
      if (onda.f1 === 250)
        onda.dir = false;
    } else {
      onda.f1--;
      onda.f2++;
      if(onda.f1 === 50) 
        onda.dir = true;
    }
  }, 20);
}

function curvaCuadratica(lienzo){
  const fila = { y: 0, dir: true };
  setInterval(() => {
    lienzo.clearRect(0,0,300,300);
    lienzo.strokeStyle = "rgb(250,50,0)";
    lienzo.beginPath();
    lienzo.moveTo(50,150);
    lienzo.quadraticCurveTo(150,fila.y,250,150);
    lienzo.stroke(); // vertice(x,y), right(x,y)
    fila.dir ? fila.y+=2 : fila.y-=2;
    if (fila.y>=400 || fila.y<=-100) { fila.dir = !fila.dir ; console.log(fila.y)} ;
  }, 25)
}

function pruebaTexto(lienzo){
  lienzo.fillStyle="rgb(255,0,0)";
    lienzo.font="bold 25px Arial";
    lienzo.fillText("Hola Mundo",150,50);
    lienzo.textAlign="center";
    lienzo.fillText("Hola Mundo",150,100);    
    lienzo.textAlign="right";
    lienzo.fillText("Hola Mundo",150,150);
    let anchopx=lienzo.measureText("Hola Mundo");
    lienzo.textAlign="start";
    lienzo.fillText(anchopx.width,150,200);    
    lienzo.strokeStyle="rgb(0,0,255)";
    lienzo.strokeText("Fin",150,250);
}

function getFecha(lienzo){
  lienzo.fillStyle="rgb(25,75,200)";
  lienzo.fillRect(0,0,400,300);
  const fecha = new Date();
  const dias = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sábado"];
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
  const hoy = "Hoy es: " + dias[fecha.getDay()] + ",";
  const cad = fecha.getDate() + " de " + meses[fecha.getMonth()] +" de " + fecha.getFullYear();
  lienzo.font="bold 30px Arial";
  lienzo.fillStyle="rgb(0,175,175)";
  //const anchoTexto = lienzo.measureText(cad).width;
  lienzo.textAlign = "center";
  lienzo.fillText(hoy,200,50);
  lienzo.fillText(cad,200,100);
  lienzo.fillText("@axolotl-one", 200, 150);
}

function productoCruz(){
  const r = document.getElementById('procesoCruz');
  const a = [
    document.getElementById('inpA1').value,
    document.getElementById('inpA2').value,
    document.getElementById('inpA3').value
  ]
  const b = [
    document.getElementById('inpB1').value,
    document.getElementById('inpB2').value,
    document.getElementById('inpB3').value
  ]

  const paxb = [a[1]*b[2], a[2]*b[0], a[0]*b[1]];
  const naxb = [a[2]*b[1], a[0]*b[2], a[1]*b[0]];
  const axb = [paxb[0]-naxb[0], paxb[1]-naxb[1], paxb[2]-naxb[2]];

  r.innerHTML = "<p>Desarrollo del Calculo:";
  r.innerHTML += "<p>(" + a[1] + ")(" + b[2] + ") - (" + a[2] + ")(" + b[1] + ") = (" + paxb[0] + ") - ( + " + naxb[0] + ") = " +  axb[0] + "</p>";
  r.innerHTML += "<p>(" + a[2] + ")(" + b[0] + ") - (" + a[0] + ")(" + b[2] + ") = (" + paxb[1] + ") - ( + " + naxb[1] + ") = " +  axb[1] + "</p>";
  r.innerHTML += "<p>(" + a[0] + ")(" + b[1] + ") - (" + a[1] + ")(" + b[0] + ") = (" + paxb[2] + ") - ( + " + naxb[2] + ") = " +  axb[2] + "</p>";
  r.innerHTML += "<p>Producto Cruz AXB: &lt; " + axb[0] + " , " + axb[1] + " , " + axb[2] + "></p>"; 
}

function pino(lienzo){
  lienzo.strokeStyle = "rgb(80,50,0)";
  lienzo.fillStyle = "rgb(110,70,20)";
  lienzo.lineWidth = 5;
  lienzo.beginPath();
  lienzo.moveTo(140,150);
  lienzo.lineTo(140,180);
  lienzo.lineTo(160,180);
  lienzo.lineTo(160,150);
  lienzo.fill();
  lienzo.stroke();

  lienzo.strokeStyle = "rgb(20,150,50)";
  lienzo.lineWidth = 5;
  lienzo.lineCap = 'round';
  lienzo.fillStyle = "rgb(20,180,50)";
  lienzo.beginPath();
  lienzo.moveTo(150,25);
  lienzo.lineTo(175,60);
  lienzo.lineTo(160,60);
  lienzo.lineTo(190,100);
  lienzo.lineTo(175,100);
  lienzo.lineTo(210,150);
  lienzo.lineTo(90,150);
  lienzo.lineTo(125,100);
  lienzo.lineTo(110,100);
  lienzo.lineTo(140,60);
  lienzo.lineTo(125,60);
  lienzo.lineTo(150,25);
  lienzo.fill();
  lienzo.stroke();

  lienzo.strokeStyle = "rgb(190,155,50)"
  lienzo.fillStyle = "rgb(220,200,0)";
  lienzo.beginPath();
  lienzo.arc(175,60,7,0,Math.PI*2,true);
  lienzo.moveTo(199,100);
  lienzo.arc(190,100,9,0,Math.PI*2,true);
  lienzo.moveTo(221,150);
  lienzo.arc(210,150,11,0,Math.PI*2,true);
  lienzo.moveTo(132,60);
  lienzo.arc(125,60,7,0,Math.PI*2,true);
  lienzo.moveTo(119,100);
  lienzo.arc(110,100,9,0,Math.PI*2,true);
  lienzo.moveTo(101,150);
  lienzo.arc(90,150,11,0,Math.PI*2,true);
  lienzo.fill();
  lienzo.stroke();
}