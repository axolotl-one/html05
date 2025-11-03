const table = document.getElementById('table')
const nColumns = document.getElementById('n-columns')
const nRows = document.getElementById('n-rows')
let data = [
  ['ORIGEN/DESTINO','DESTINO 1', 'DESTINO 2', 'OFERTA'],
  ['ORIGEN 1', 0, 0, 0],
  ['ORIGEN 2', 0, 0, 0],
  ['DEMANDA', 0, 0, 0],
]

const updateData = () => {
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

document.getElementById('rest-column').addEventListener('click', ()=>{nColumns.textContent = parseInt(nColumns.textContent)-1;updateData()});
document.getElementById('plus-column').addEventListener('click', ()=>{nColumns.textContent = parseInt(nColumns.textContent)+1;updateData()});
document.getElementById('rest-row').addEventListener('click', ()=>{nRows.textContent = parseInt(nRows.textContent)-1;updateData()});
document.getElementById('plus-row').addEventListener('click', ()=>{nRows.textContent = parseInt(nRows.textContent)+1;updateData()});


const tabla = document.createElement('section')
const valor = document.getElementById('inputValor')

