const table = document.getElementById('table');
const nColumns = document.getElementById('n-columns');
const nRows = document.getElementById('n-rows');
const logProcess = [];
const costos = [[0,0],[0,0]];
const unidades = [[0,0],[0,0]];
const ofertas = [0,0];
const demandas = [0,0];
const destinos = ['Destino 1', 'Destino 2'];
const origenes = ['Origen 1', 'Origen 2'];

const renderTable = () => {
  table.textContent = '';
  const c = parseInt(nColumns.textContent);
  const r = parseInt(nRows.textContent);
  for(let i = 0; i<c+2; i++) { // >>> Header
    const dest = document.createElement('span');
    i===0 ? dest.appendChild(generarCelda('o-d','Origen\\Destino','text'))
    : i===c+1 ? dest.appendChild(generarCelda('oferta','Oferta (Recursos)','text'))
    : dest.appendChild(generarCelda('dest' + i, destinos[i-1], 'text'));
    table.appendChild(dest);
  }
  for(let i = 0; i<r; i++){ // >>> Body
    const row = document.createElement('div');
    const orig = document.createElement('span');
    orig.appendChild(generarCelda('org'+(i+1),origenes[i],'text'));
    row.appendChild(orig);
    for(let j = 0; j<c; j++) {
      const cell = document.createElement('span');
      cell.id = 'celda-' + (i+1) + '-' + (j+1);
      cell.classList.add('celda-span');
      cell.appendChild(generarCelda('u-' + (i+1) + '-' + (j+1), unidades[i][j]));
      cell.appendChild(generarCelda('c-' + (i+1) + '-' + (j+1), costos[i][j]));
      row.appendChild(cell);
    }
    const oferta = document.createElement('span');
    oferta.appendChild(generarCelda('of'+(i+1),ofertas[i]));
    row.appendChild(oferta);
    table.appendChild(row);
  }
  for(let i = 0; i<c+2; i++){ // >>> Footer
    const demanda = document.createElement('span');
    i===0 ? demanda.appendChild(generarCelda('demanda','Demanda','text'))
    : i===c+1 ? demanda.appendChild(generarCelda('total',0))
    : demanda.appendChild(generarCelda('d'+i,demandas[i-1]));
    table.appendChild(demanda);
  }
}

const generarCelda = (id,value,type='number') => {
  const cell = document.createElement('input');
  cell.inputMode = type==='number'?'numeric':'';
  cell.type = type==='number'?'number':'text';
  cell.id = id;
  cell.value = value;
  return cell;
}

const handleLength = (element, isRows, isPlus) => {
  if(parseInt(element.textContent)<=2 && !isPlus) { return; }
  element.textContent = isPlus ? parseInt(element.textContent)+1 : parseInt(element.textContent)-1; //Actualizar Contador
  isRows ? updateRowsData(costos,isPlus) & updateRowsData(unidades,isPlus) // Actualiza una fila en la matriz de costos y unidades
  : updateColumnsData(costos,isPlus) & updateColumnsData(unidades,isPlus); // Sino, Actualiza una columna en la matriz de costos y unidades
  isRows ? isPlus ? ofertas.push(0) : ofertas.pop() // Agrega un nuevo elemento '0' a ofertas, o lo elimina
  : isPlus ? demandas.push(0) : demandas.pop();  // Sino, Agrega un nuevo elemento '0' a demanda,  o lo elimina
  isRows ? isPlus ? origenes.push('Origen ' + (origenes.length + 1)) : origenes.pop() // Agrega un nuevo elemento '0' a origenes, o lo elimina
  : isPlus ? destinos.push('Destino ' + (destinos.length + 1)) : destinos.pop(); //Sino, Agrega un nuevo elemento '0' a destinos, o lo elimina
  renderTable();
}

const updateColumnsData = (data, plus) => {
  if(plus) { for(let i = 0; i<data.length; i++) { data[i].push(0) } ; return } // Agrega nuevo elemento '0' a cada fila
  for(let i = 0; i<data.length; i++) { data[i].pop() } // Sino, Elimina el último elemento de cada fila
}

const updateRowsData = (data, plus) => { plus ? data.push(data[0].map(()=>0)) : data.pop() }
// Mapea y agrega un nuevo array de elementos '0' tomando como base el primer array 'fila' de la data 

document.getElementById('rest-column').addEventListener('click', ()=>{handleLength(nColumns,false,false)});
document.getElementById('plus-column').addEventListener('click', ()=>{handleLength(nColumns,false,true)});
document.getElementById('rest-row').addEventListener('click', ()=>{handleLength(nRows,true,false)});
document.getElementById('plus-row').addEventListener('click', ()=>{handleLength(nRows,true,true)});
document.getElementById('btnMEN').addEventListener('click', ()=>{captureData(); esquinaNoroeste()});
document.getElementById('btnMCM').addEventListener('click', ()=>{captureData(); costoMinimo()});
document.getElementById('btnMAV').addEventListener('click', ()=>{captureData(); aproxVogel()});
document.getElementById('btnMCA').addEventListener('click', ()=>{captureData(); costoMinimoPorBusqueda()})

const captureData = () =>{
  captureMatrix(costos, 'c');
  captureMatrix(unidades, 'u');
  captureArray(ofertas,'of');
  captureArray(demandas, 'd');
  captureArrayText(origenes, 'org');
  captureArrayText(destinos, 'dest');
}

const captureMatrix = (datax, id) => {
  for(let i = 0; i<datax.length; i++){
    for(let j = 0; j<datax[0].length; j++){
      datax[i][j] = parseInt(document.getElementById(id+'-'+(i+1)+'-'+(j+1)).value)
    }
  }
}

const captureArray = (datax, id) => {
  for(let i = 0; i<datax.length; i++)
    datax[i] = parseInt(document.getElementById(id+(i+1)).value)
}

const captureArrayText = (datax, id) =>{
  for(let i = 0; i<datax.length; i++)
    datax[i] = document.getElementById(id+(i+1)).value
}

const esquinaNoroeste = () => {
  logProcess.push('Iniciando Método por Esquina Noroeste');
  const copyOfertas = [...ofertas];
  const copyDemandas = demandas.slice(); //structuredClone(demandas)
  for(let c = 0; c<costos[0].length; c++){
    logProcess.push('Iniciando Demanda de ' + destinos[c] + ':');
    for(let f = 0; f<costos.length; f++){
      if(copyDemandas[c]===0 || copyOfertas[f]===0) {
        unidades[f][c] = 0;
        logProcess.push('Ruta ' + origenes[f] + ' - ' + destinos[c] + ' descartada a falta de oferta o demanda');
        continue
      }
      if(copyDemandas[c]<=copyOfertas[f]) {
        unidades[f][c] = copyDemandas[c];
        copyOfertas[f]-=copyDemandas[c];
        copyDemandas[c] = 0;
        logProcess.push('\t' + unidades[f][c] + ' unidades de ' + origenes[f] + ' asignadas para ' + destinos[c]);
        logProcess.push('\tDemanda de ' + destinos[c] + ' cubierta');
        logProcess.push('\tQuedan ' + copyOfertas[f] + ' unidades en ' + origenes[f]);
      }else{
        unidades[f][c] = copyOfertas[f];
        copyDemandas[c]-=copyOfertas[f];
        copyOfertas[f] = 0;
        logProcess.push('\t' + unidades[f][c] + ' unidades de ' + origenes[f] + ' asignadas para ' + destinos[c]);
        logProcess.push('\t' + origenes[f] + ' se ha quedado sin unidades para distribuir');
        logProcess.push('\tFalta por cubrir ' + copyDemandas[c] + ' unidades hacia ' + destinos[c]);
      }
    }
  }
  getTotal();
  renderTable();
  printLogProcess();
}

const costoMinimo = () => {
  logProcess.push('Iniciando Método por Costo Mínimo');
  const copyOfertas = [...ofertas];
  const copyDemandas = demandas.slice();
  // structuredClone(costos);
  const minimos = costos.map((fila, f) => { // Obtener una Matriz de objetos de costo e index
    return fila.map((costo, c) => { return { costo:costo, f:f, c:c }})
  }).flat().sort((a,b) => { // Unidimensionar con flat y ordenar con sort
    for(let f = 0; f<costos.length; f++) // ordenar por costo minimo
      for(let c = 0; c<costos[0].length; c++)
        return a.costo<b.costo ? -1 : a.costo>b.costo ? 1 : 0;
  })
  
  for(let i = 0; i<minimos.length; i++){
    logProcess.push('Costo Mínimo Actual: ' + minimos[i].costo + ' de la ruta ' + origenes[minimos[i].f] + ' - ' + destinos[minimos[i].c])
    if(copyDemandas[minimos[i].c] === 0 || copyOfertas[minimos[i].f] === 0) {
      unidades[minimos[i].f][minimos[i].c] = 0;
      logProcess.push('\tRuta descartada por falta demanda o recursos')
      continue; }
    if(copyDemandas[minimos[i].c] <= copyOfertas[minimos[i].f]){
      unidades[minimos[i].f][minimos[i].c] = copyDemandas[minimos[i].c];
      copyOfertas[minimos[i].f] -= copyDemandas[minimos[i].c];
      copyDemandas[minimos[i].c] = 0;
      logProcess.push('\t' + unidades[minimos[i].f][minimos[i].c] + ' unidades de ' + origenes[minimos[i].f] + ' asignadas para ' + destinos[minimos[i].c]);
      logProcess.push('\tDemanda de ' + destinos[minimos[i].c] + ' cubierta');
      logProcess.push('\tQuedan ' + copyOfertas[minimos[i].f] + ' unidades en ' + origenes[minimos[i].f]);
    }else{
      unidades[minimos[i].f][minimos[i].c] = copyOfertas[minimos[i].f];
      copyDemandas[minimos[i].c] -= copyOfertas[minimos[i].f];
      copyOfertas[minimos[i].f] = 0;
      logProcess.push('\t' + unidades[minimos[i].f][minimos[i].c] + ' unidades de ' + origenes[minimos[i].f] + ' asignadas para ' + destinos[minimos[i].c]);
      logProcess.push('\t' + origenes[minimos[i].f] + ' se ha quedado sin unidades para distribuir');
      logProcess.push('\tFalta por cubrir ' + copyDemandas[minimos[i].c] + ' unidades hacia ' + destinos[minimos[i].c]);
    }
  }
  getTotal();
  renderTable();
  printLogProcess();
}

const aproxVogel = () => {
  logProcess.push('Iniciando Método por Aproximación de Vogel');
  const copyOfertas = [...ofertas];
  const copyDemandas = [...demandas];
  const copyCostos = structuredClone(costos);
  const lim = Math.max(...costos.flat()) + 1;

  //while(copyDemandas.some((n) => { return n !== 0 })){
  for(let z = 0; z < costos.length + costos[0].length - 2; z++){
    // 1. Buscar los dos costos mas bajos por columna y por fila y calcular su diferencia
    const penalties = [];
    logProcess.push('Iniciando Ciclo ' + (z+1));
    logProcess.push('Calculando Penalización por Fila Origen y por Columna Destino');
    for(let f = 0; f<costos.length; f++){ // Penalizaciones por Fila
      const minimos = [copyCostos[f][0],copyCostos[f][1]];
      sortMin(minimos);
      for(let c = 2; c<costos[0].length; c++){
        if(copyCostos[f][c]===lim) continue;
        if(minimos[1]>copyCostos[f][c]) minimos[1] = copyCostos[f][c];
        sortMin(minimos);
        console.log(minimos);
      }
      if(minimos[1]===lim) minimos[1] = minimos[0];
      penalties.push({value: minimos[1]-minimos[0], index: f, isRow: true});
      console.log(penalties[f]);
    }
    
    for(let c = 0; c<costos[0].length; c++){ // Penalizaciones por Columna
      const minimos = [copyCostos[0][c],copyCostos[1][c]];
      sortMin(minimos);
      for(let f = 2; f<costos.length; f++){
        if(copyCostos[f][c]===lim) continue;
        if(minimos[1]>copyCostos[f][c]) minimos[1] = copyCostos[f][c];
        sortMin(minimos);
        console.log(minimos);
      }
      if(minimos[1]===lim) minimos[1] = minimos[0];
      penalties.push({value: minimos[1]-minimos[0], index: c, isRow: false});
      console.log(penalties[c+costos.length]);
    }

    penalties.forEach((p)=>{
      logProcess.push('\tPenalización de ' + (p.isRow ? origenes[p.index]: destinos[p.index]) + ': '  + p.value);
    })

    // 2. Seleccionar la columna o fila con la penalización más alta, si hay empate, también incluirlo
    const pvalue = penalties.map((p)=>p.value);
    console.log(pvalue);
    const pmax = Math.max(...pvalue);
    console.log(pmax);
    const maximos = penalties.filter((p)=>{if(p.value === pmax) return p});
    console.log(maximos);

    maximos.forEach((p)=>{
      logProcess.push('Penalización Máxima de ' + p.value + ' en ' + (p.isRow ? 'fila de ' + origenes[p.index] : 'columna de ' + destinos[p.index]));
    })

    const min = [lim,0,0];

    // 3. Llenar en la casilla con el costo más bajo la cantidad maxima posible de oferta o demanda
    for(let i = 0; i<maximos.length; i++){
      if(maximos[i].isRow){
        for(let c = 0; c<costos[0].length; c++){
          if(min[0]>copyCostos[maximos[i].index][c]){ 
            min[0] = copyCostos[maximos[i].index][c];
            min[1] = maximos[i].index; min[2] = c;
          }
        }
      }
      else{
        for(let f = 0; f<costos.length; f++){
          if(min[0]>copyCostos[f][maximos[i].index]){ 
            min[0] = copyCostos[f][maximos[i].index];
            min[1] = f; min[2] = maximos[i].index;
          }
        }
      }
    }

    logProcess.push('Costo Mínimo Encontrado dentro la Máxima Penalización:');
    logProcess.push('[' + min[0] + '][Ruta ' + origenes[min[1]] + ' - ' + destinos[min[2]] +']');

    // 4. Descartar la casilla junto con toda la fila o columna agotada o cubierta ???? o cancelar por separado
    
    if(copyDemandas[min[2]] === 0 || copyOfertas[min[1]] === 0) {
      unidades[min[1]][min[2]] = 0;
      logProcess.push('\tRuta descartada por falta demanda o recursos');
    }
    if(copyOfertas[min[1]] === 0 && copyDemandas[min[2]] === 0){
      for(let f = 0; f<copyCostos.length; f++){
        copyCostos[f][min[2]] = lim;
      }
      for(let c = 0; c<copyCostos[0].length; c++){
        copyCostos[min[1]][c] = lim;
      }
      
    }
    if(copyOfertas[min[1]] >= copyDemandas[min[2]] ){
      for(let f = 0; f<copyCostos.length; f++){
        copyCostos[f][min[2]] = lim;
      }
      unidades[min[1]][min[2]] = copyDemandas[min[2]];
      copyOfertas[min[1]] -= copyDemandas[min[2]];
      copyDemandas[min[2]] = 0;
      logProcess.push('\t' + unidades[min[1]][min[2]] + ' unidades de ' + origenes[min[1]] + ' asignadas para ' + destinos[min[2]]);
      logProcess.push('\tDemanda de ' + destinos[min[2]] + ' cubierta');
      logProcess.push('\tQuedan ' + copyOfertas[min[1]] + ' unidades en ' + origenes[min[1]]);
    }else{
      for(let c = 0; c<copyCostos[0].length; c++){
        copyCostos[min[1]][c] = lim;
      }
      unidades[min[1]][min[2]] = copyOfertas[min[1]];
      copyDemandas[min[2]] -= copyOfertas[min[1]];
      copyOfertas[min[1]] = 0;
      logProcess.push('\t' + unidades[min[1]][min[2]] + ' unidades de ' + origenes[min[1]] + ' asignadas para ' + destinos[min[2]]);
      logProcess.push('\t' + origenes[min[1]] + ' se ha quedado sin unidades para distribuir');
      logProcess.push('\tFalta por cubrir ' + copyDemandas[min[2]] + ' unidades hacia ' + destinos[min[2]]);
    }

    // 5. Realizar el Bucle

    if(z === costos.length + costos[0].length - 3){
      logProcess.push('Última Asignación por descarte');
      for(let f = 0; f<costos.length; f++){
        for(let c = 0; c<costos[0].length; c++){
          if(copyCostos[f][c]!==lim) {
            unidades[f][c] = copyOfertas[f];
            copyDemandas[c] = 0;
            logProcess.push('\t' + copyOfertas[f] + ' asignadas para ' + destinos[c]);
          }
        }
      }
      break;
    }
  }
  
  getTotal();
  renderTable();
  printLogProcess();
}

/*
const penalty = (penalties, copyCostos, isRow) => {
  for(let i = 0; i<isRow ? costos.length : costos[0].length; i++){
    const minimos = isRow ? [copyCostos[i][0],copyCostos[i][1]] : [copyCostos[0][i],copyCostos[1][i]];
    sortMin(minimos);
    for(let j = 2; j<isRow ? costos[0].length : costos.length; j++){
      if(copyCostos[i][j]===lim) continue;
      if(minimos[1]>copyCostos[i][j]) minimos[1] = copyCostos[i][j];
      sortMin(minimos);
      console.log(minimos);
    }
    if(minimos[1]===lim) minimos[1] = minimos[0];
    penalties.push({value: minimos[1]-minimos[0], index: isRow , isRow: isRow})
    console.log(penalties[f])
  }
}
*/

const sortMin = (arr) => {
  if(arr[0]>arr[1]) { arr.unshift(arr[1]); arr.pop() };
}

const getMax = () => {
  let max = 0
  for(let f = 0; f<costos.length; f++)
    for(let c = 0; c<costos[0].length; c++)
      if(max<costos[f][c]) max = costos[f][c]
  return max
}

const costoMinimoPorBusqueda = () => {
  logProcess.push('Iniciando Método de Costo Mínimo');
  const copyOfertas = [...ofertas];
  const copyDemandas = demandas.slice();
  const copyCostos = structuredClone(costos);
  const max = getMax();
  logProcess.push('Costo Máximo Encontrado: ' + max)
  let z = 0;

  while(!copyDemandas.every((n) => { return n === 0 })){ // Buscar mientras no se agoten las demanda
    const min = [max + 1,0,0]; // Iniciar el costo mínimo con el costo mas alto
    for(let f = 0; f<costos.length; f++){ // Buscar el costo minimo
      for(let c = 0; c<costos[0].length; c++){
        if(min[0]>copyCostos[f][c] && copyCostos[f][c])
          { min[0] = costos[f][c]; min[1] = f; min[2] = c }
      }
    }
    logProcess.push('\tCosto Mínimo Encontrado: ' + min[0] + ' [' + min[1] + '][' + min[2] + ']')
    copyCostos[min[1]][min[2]] = max + 1;
    if(z++ === 50) break;
    // console.log(copyCostos[min[1]][min[2]])
    if(copyDemandas[min[2]] === 0 || copyOfertas[min[1]] === 0) {
      unidades[min[1]][min[2]] = 0;
      logProcess.push('\tCasilla cancelada por falta demanda o recursos')
      continue; }
    if(copyDemandas[min[2]] <= copyOfertas[min[1]]){
      unidades[min[1]][min[2]] = copyDemandas[min[2]];
      copyOfertas[min[1]] -= copyDemandas[min[2]];
      copyDemandas[min[2]] = 0;
      logProcess.push('\t' + unidades[min[1]][min[2]] + ' unidades de ' + origenes[min[1]] + ' asignadas para ' + destinos[min[2]]);
      logProcess.push('\tDemanda de ' + destinos[min[2]] + ' cubierta');
      logProcess.push('\tQuedan ' + copyOfertas[min[1]] + ' unidades en ' + origenes[min[1]]);
    }else{
      unidades[min[1]][min[2]] = copyOfertas[min[1]];
      copyDemandas[min[2]] -= copyOfertas[min[1]];
      copyOfertas[min[1]] = 0;
      logProcess.push('\t' + unidades[min[1]][min[2]] + ' unidades de ' + origenes[min[1]] + ' asignadas para ' + destinos[min[2]]);
      logProcess.push('\t' + origenes[min[1]] + ' se ha quedado sin unidades para distribuir');
      logProcess.push('\tFalta por cubrir ' + copyDemandas[min[2]] + ' unidades hacia ' + destinos[min[2]]);
    }
    console.log(unidades)
  }
  getTotal();
  renderTable();
  printLogProcess();
}

const getTotal = () => {
  let costoTotal = 0;
  logProcess.push('Calculando Costo Total:');
  for(let f = 0; f<costos.length; f++){
    for(let c = 0; c<costos.length; c++){
      costoTotal+=unidades[f][c]*costos[f][c];
      logProcess.push('\t+ (' + unidades[f][c] + ' x ' + costos[f][c] + ')');
    }
  }
  logProcess.push('Costo Total: ' + costoTotal);
}

const printLogProcess = () => {
  const reg = document.createElement('div');
  logProcess.forEach((log,index) => {
    const line = document.createElement('pre');
    line.textContent = index + '. ' + log;
    reg.appendChild(line);
  })
  table.appendChild(reg)
}

renderTable();