const editor = document.getElementById("codigo-fuente");
const tokens = await cargarTokens();

async function cargarDatos(ruta) {
  const respuesta = await fetch(ruta);
  const data = await respuesta.json();
  return data;
}

async function cargarTokens() {
  const tokensJSON = await cargarDatos("./tokens.json");
  const tokens = [];

  console.log(tokensJSON);
  await tokensJSON.forEach((tipo) => {
    tipo.tokens.forEach((valor) => tokens.push({ "tipo" : tipo.tipo, "valor" : valor.valor}))
  })
  editor.disabled = false;
  editor.innerHTML = "Lista de tokens:\n";
  tokens.forEach(token => {
    editor.innerHTML += "(Tipo: \"" + token.tipo + "\", valor: \"" + token.valor + "\")\n";
  })
  return tokens
}