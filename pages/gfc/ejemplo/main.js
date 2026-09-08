function cargarCanvas(id, trazo) {
  const canvas = document.getElementById(id);
  canvas.style.display = "block";
  if(!canvas.getContext) { canvas.innerHTML = "Error en la Carga de Imagen"; return }
  const lienzo = canvas.getContext("2d");
  if(!lienzo) return;
  trazo(lienzo);
}

function cuadricular(lienzo){
  lienzo.strokeStyle = "rgb(200,200,220)";
  lienzo.beginPath();
  for(let c = 0; c <= 400; c += 50)
  {
    lienzo.moveTo(c, 0);
    lienzo.lineTo(c, 400);
  }
  for(var f = 0; f <=400; f += 50)
  {
    lienzo.moveTo(0, f);
    lienzo.lineTo(400, f);
  }
  lienzo.stroke();
}

function trazarBarra(lienzo, valor, index){
  lienzo.beginPath();
  lienzo.moveTo(100*index, 350);
  lienzo.lineTo(100*index + 50, 350);
  lienzo.lineTo(100*index + 50, 350 - valor);
  lienzo.lineTo(100*index, 350 - valor);
  lienzo.fillText(valor, 100 * index + 25, 345 - valor);
  lienzo.stroke();
  lienzo.fill();
}

function graficar(lienzo){
  cuadricular(lienzo);
  const valores = [85,68,75,25];
  lienzo.fillStyle = "rgb(250,0,0)";
  lienzo.fillStyle = "rgb(180,0,0)";
  lienzo.lineWidth = 5;
  lienzo.textAlign = 'center';
  lienzo.font = 'bold 20px monoespace';
  valores.forEach((v, i)=>{
    trazarBarra(lienzo, v, i);
  })
}



cargarCanvas('grafica', graficar);