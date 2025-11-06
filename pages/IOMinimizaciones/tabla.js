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
  isRows ? updateRowsData(costos,isPlus) & updateRowsData(unidades,isPlus) // Actualizar Filas o Columnas con ternarios anidados
        : updateColumnsData(costos,isPlus) & updateColumnsData(unidades,isPlus);
  isRows ? isPlus ? ofertas.push(0) : ofertas.pop() // Actualizar celdas de Ofertas o Demandas con ternarios anidados
  : isPlus ? demandas.push(0) : ofertas.pop();
  isRows ? isPlus ? origenes.push('Origen ' + (origenes.length + 1)) : origenes.pop() // Actualizar celdas de Origenes o Destinos
  : isPlus ? destinos.push('Destino ' + (destinos.length + 1)) : destinos.pop();
  renderTable();
}

const updateColumnsData = (data, plus) => {
  console.log(data)
  if(plus) { for(let i = 0; i<data.length; i++) {data[i].push(0)} ; return }
  for(let i = 0; i<data.length; i++) { data[i].pop }
  console.log(data)
}

const updateRowsData = (data, plus) => {
  console.log(data)
  plus ? data.push(data[0].map(()=>0)) : data.pop()
  console.log(data)
}

document.getElementById('rest-column').addEventListener('click', ()=>{handleLength(nColumns,false,false)});
document.getElementById('plus-column').addEventListener('click', ()=>{handleLength(nColumns,false,true)});
document.getElementById('rest-row').addEventListener('click', ()=>{handleLength(nRows,true,false)});
document.getElementById('plus-row').addEventListener('click', ()=>{handleLength(nRows,true,true)});
document.getElementById('btnMEN').addEventListener('click', ()=>{captura(costos,'c'),captura(unidades,'u'),
  capturaArray(ofertas,'of'),capturaArray(demandas,'d')+esquinaNoroeste()})

const captura = (datax,id) => {
  for(let i = 0; i<datax.length; i++){
    for(let j = 0; j<datax[0].length; j++){
      datax[i][j] = parseInt(document.getElementById(id+'-'+(i+1)+'-'+(j+1)).value)
    }
  }
}

const capturaArray = (datax,id) => {
  for(let i = 0; i<datax.length; i++){
    datax[i] = parseInt(document.getElementById(id+(i+1)).value)
  }
}

const esquinaNoroeste = () => {
  logProcess.push('Iniciando Método de Esquina Noroeste');
  const copyOfertas = [...ofertas];
  const copyDemandas = demandas.slice(); //structuredClone(demandas)
  for(let c = 0; c<costos[0].length; c++){
    logProcess.push('Iniciando Demanda de Columna ' + (c+1) + ':');
    for(let f = 0; f<costos.length; f++){
      if(copyDemandas[c]===0) { unidades[f][c] = 0; break }
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