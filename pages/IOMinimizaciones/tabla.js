const table = document.getElementById('table')
const nColumns = document.getElementById('n-columns')
const nRows = document.getElementById('n-rows')
let costos = [[0,0],[0,0]]
let unidades = [[0,0],[0,0]]
const ofertas = [0,0]
const demandas = [0,0]

const renderTable = () => {
  table.textContent = '';
  const c = parseInt(nColumns.textContent);
  const r = parseInt(nRows.textContent);
  for(let i = 0; i<c+2; i++) {
    const dest = document.createElement('span');
    i===0 ? dest.appendChild(generarCelda('o-d','Origen\\Destino','text'))
    : i===c+1 ? dest.appendChild(generarCelda('oferta','Oferta (Recursos)','text'))
    : dest.appendChild(generarCelda('dest'+i, 'Destino ' + i, 'text'))
    table.appendChild(dest);
  }
  for(let i = 0; i<r; i++){
    const row = document.createElement('div');
    const orig = document.createElement('span');
    orig.appendChild(generarCelda('org'+(i+1),'Origen ' + (i+1),'text'))
    row.appendChild(orig);
    for(let j = 0; j<c; j++) {
      const cell = document.createElement('span');
      cell.appendChild(generarCelda('c-' + i + '-' + j,costos[i][j]));
      cell.appendChild(generarCelda('u-' + i + '-' + j,unidades[i][j]));
      row.appendChild(cell);
    }
    const oferta = document.createElement('span')
    oferta.appendChild(generarCelda('of'+i,ofertas[i]))
    row.appendChild(oferta)
    table.appendChild(row)
  }
  for(let i = 0; i<c+2; i++){
    const demanda = document.createElement('span')
    i===0 ? demanda.appendChild(generarCelda('demanda','Demanda','text'))
    : i===c+1 ? demanda.appendChild(generarCelda('total',0))
    : demanda.appendChild(generarCelda('d'+i,demandas[i-1]))
    table.appendChild(demanda)
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
  element.textContent = isPlus ? parseInt(element.textContent)+1 : parseInt(element.textContent)-1;
  isRows ? updateRowsData(costos,isPlus) & updateRowsData(unidades,isPlus) // Si son filas, las actualiza
        : updateColumnsData(costos,isPlus) & updateColumnsData(unidades,isPlus); // sino actualiza las columnas
  isRows ? isPlus ? ofertas.push(0) : ofertas.pop() //
  : isPlus ? demandas.push(0) : ofertas.pop();
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

/*
const updateDatax = (data) => {
  const newData = []
  for(let i = 0; i<parseInt(nRows.textContent);i++){
    newData[i] = []
    for(let j = 0; j<parseInt(nColumns.textContent);j++){
      const cell = data[i] && data[i][j] !== undefined ? data[i][j] : '';
      newData[i][j] = cell;
    }
  }
  data = newData;
  console.log(data);
  table.textContent=data;
}
  */

document.getElementById('rest-column').addEventListener('click', ()=>{handleLength(nColumns,false,false)});
document.getElementById('plus-column').addEventListener('click', ()=>{handleLength(nColumns,false,true)});
document.getElementById('rest-row').addEventListener('click', ()=>{handleLength(nRows,true,false)});
document.getElementById('plus-row').addEventListener('click', ()=>{handleLength(nRows,true,true)});

renderTable();