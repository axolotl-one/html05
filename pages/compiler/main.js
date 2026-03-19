const editor = document.getElementById("codigo-fuente");
const consola = document.getElementById("consola");
const mapaAst = document.getElementById("ast");
//editor.value = "public void main() {\n   Console.WriteLine(\"Hola Mundo...!\");\n   Console.ReadKey(true);\n}"
editor.value = "string c = \"hola\";\nstring v = c;";
const Gtokens = [];

window.verSection = function(selector, id){
  document.querySelectorAll(selector).forEach(sec=>sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

window.compilar = function() {
  if(!editor.value) return;
  consola.value = "Generando Lista de Tokens:\n";
  const tokens = generarTokens(editor.value);
  if(!tokens) return;
  Gtokens.forEach(() => { Gtokens.pop()});
  tokens.forEach((e) => { Gtokens.push(e)});
  Gtokens.unshift({tipo:"MAIN", valor:"origen"});
  consola.value += "Generando AST\n";
  //console.log(armarASTX(new NodoToken({tipo: "raiz", valor: "origen"}), tokens, 0 ));
  const AST = armarAST(new NodoToken("origen"));
  console.log(AST);
  console.log(JSON.stringify(AST, null, 2));
  consola.value += JSON.stringify(AST, null, 2);
  mapaAst.innerHTML += "<p>Armando Árbol AST</p>";
  mapaAst.append(crearDivNodo(AST));
}

const CLASETOKEN = {
  ID: "Identificador",
  NUMERO: "Número",
  RESERVADO: "Palabra Reservada",
  DECLARADOR: "Declarador de Tipo",
  DELIMITADOR: "Delimitador",
  BOOLEANDO: "Booleano",
  STRING: "Cadena de Caracteres",
  OPERADOR: "Operador",
  IGNORADO: "Espacios/Saltos/Comentarios",
};

function generarTokens(input) {
  const tokens = [];
  let pin = 0;
  
  // Definir las reglas de los tokens
  const reglas = [
    { tipo: CLASETOKEN.DELIMITADOR, regex: /^[(){};,\[\]]/ },
    { tipo: CLASETOKEN.NUMERO, regex: /^[0-9]+/ },
    { tipo: CLASETOKEN.IGNORADO, regex: /^(\/\*)([^\/\*]*)(\*\/)/}, //Comentario en bloque
    { tipo: CLASETOKEN.IGNORADO, regex: /^(\/\/)([^\/\*]*)\n/}, //Comentario en linea
    { tipo: CLASETOKEN.OPERADOR, regex: /^(==|>=|<=|!=|\|\||&&|\+\+|--|\+=|-=|\*=|\/=)/ },
    { tipo: CLASETOKEN.OPERADOR, regex: /^[+\-*/=%!><]/ },
    { tipo: CLASETOKEN.STRING, regex: /^"([^"]*)"|^'([^']*)'/ },
    { tipo: CLASETOKEN.DECLARADOR, regex: /^(int|float|string|void|bool|object)/ },
    { tipo: CLASETOKEN.RESERVADO, regex: /^(if|else|while|for|return|public|private)/ },
    { tipo: CLASETOKEN.BOOLEANDO, regex: /^(true|false)/ },
    { tipo: CLASETOKEN.ID, regex: /^[a-zA-Z_$][a-zA-Z0-9_$]*/ },
    { tipo: CLASETOKEN.IGNORADO, regex: /^\s+/ }, // Espacios en blanco
    { tipo: CLASETOKEN.IGNORADO, regex: /^\n+/ }, // Saltos de Linea
    // ^(inicia con)([^cualquiera que no sea]*)(termina con)
  ];
  
  while (pin < input.length) {
    let char = input[pin];
    let matched = false;
    
    for (let regla of reglas) {
      let match = regla.regex.exec(input.slice(pin));
      
      if (match) {
        let token = match[0];
        // No añadir espacios en blanco a la lista final de tokens
        if (regla.tipo !== CLASETOKEN.IGNORADO) {
          tokens.push({ tipo: regla.tipo, valor: token });
          consola.value +=  regla.tipo + ": " + token + "\n";
        }
        pin += token.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      consola.value += "Error: Caracter Desconocido: \"" + char + "\".\n";
      consola.value += "Ejecución Abortada.";
      return;
      //pin++; continue;
    }
  }

  return tokens;
}

class NodoToken {
  constructor(raiz) { this.raiz = raiz; this.izquierda = null; this.derecha = null }
}

class ErrorSintactico {
  constructor(error) { this.error = error }
}

function armarAST() {
  if(Gtokens.length <= 0) return;
  const token = Gtokens.shift();
  console.log(token);
  const nodo = new NodoToken(token.valor);

  if(token.valor === ";") return nodo;
  console.log("nodo: ", nodo.raiz);
  console.log("token0: ", token.valor);
  if(Gtokens[0]) console.log("token1: ", Gtokens[0].valor); else console.log("Sin token 1");
  if(Gtokens[1]) console.log("token2: ", Gtokens[1].valor); else console.log("Sin token 2");
  console.log("Gtokens: ", Gtokens);
  console.log("length: ", Gtokens.length);
  if(token.valor === "origen"){
    nodo.izquierda = armarAST();
    Gtokens.unshift({tipo: "NB", valor: "NB"});
    console.log(Gtokens);
    nodo.derecha = armarAST();
    return nodo;
  }

  if(token.tipo === "NB"){
    nodo.izquierda = armarAST();
    if(Gtokens[0]){
      Gtokens.unshift({tipo:"NB", valor: "NB"});
      nodo.derecha = armarAST();
    } else return nodo;
  }

  if(token.tipo === CLASETOKEN.DECLARADOR){
    if(Gtokens[0].tipo !== CLASETOKEN.ID) return new ErrorSintactico("Declarador " + token.valor + " no recibe un ID");
    nodo.izquierda = armarAST();
    if(Gtokens[0].valor !== '=') return new ErrorSintactico("Declarador " + token.valor + " del ID " + nodo.izquierda.raiz + " debe de estar inicializada.");
    nodo.derecha = armarAST();
    return nodo;
  }

  if(nodo.raiz === "="){
    Gtokens[0].valor !== ";"
      ? nodo.izquierda = armarAST()
      : nodo = new ErrorSintactico("La asignación esta vacía");
    Gtokens[0].tipo === CLASETOKEN.OPERADOR || Gtokens[0].valor === ";"
      ? nodo.derecha = armarAST()
      : nodo = new ErrorSintactico("Falta punto y coma después de: " + nodo.raiz + ".")
    return nodo;
  }
  if(nodo.izquierda instanceof ErrorSintactico) return nodo.izquierda;
  if(nodo.derecha instanceof ErrorSintactico) return nodo.derecha;
  return nodo;
}

function armarASTX(nodo, tokens, i) {
  if(nodo.raiz === ";") return nodo;
  if(i >= tokens.length) return;
  if(nodo.raiz === "origen"){
    nodo.izquierda = armarAST(new NodoToken(tokens[i].valor), tokens, i)
    nodo.derecha = armarAST(new NodoToken("nuevo bloque"), tokens, i)
    return nodo;
  }

  if(nodo.raiz === "nuevo bloque"){
    i = contarNodos(i)
    nodo.izquierda = ""
  }

  if(nodo.raiz === "string"){
    tokens[++i].tipo === CLASETOKEN.ID
      ? nodo.izquierda = armarAST(new NodoToken(tokens[i].valor), tokens, i)
      : nodo = new ErrorSintactico("Declarador string no recibe un ID");
    tokens[++i].valor === "="
      ? nodo.derecha = armarAST(new NodoToken(tokens[i].valor), tokens, i)
      : nodo = new ErrorSintactico("Declarador string no utiliza el operado de asignación: \"=\".")
    return nodo;
  }
  if(nodo.raiz === "="){
    tokens[++i].valor !== ";"
      ? nodo.izquierda = armarAST(new NodoToken(tokens[i].valor), tokens, i)
      : nodo = new ErrorSintactico("La asignación esta vacía");
    tokens[++i].tipo === CLASETOKEN.OPERADOR || tokens[i].valor === ";"
      ? nodo.derecha = armarAST(new NodoToken(tokens[i].valor), tokens, i)
      : nodo = new ErrorSintactico("Falta punto y coma después de: " + nodo.raiz + ".")
    return nodo;
  }
  if(tokens[i].tipo === CLASETOKEN.ID){
    return nodo
  }
  if(tokens[i].tipo === CLASETOKEN.STRING){
    return nodo
  }
  if(nodo.izquierda instanceof ErrorSintactico) return nodo.izquierda;
  if(nodo.derecha instanceof ErrorSintactico) return nodo.derecha;
  return nodo;
}

function contarNodos(arbol) {
  if(arbol.raiz === null) return 0;
  return 1 + contarNodos(arbol.izquierda) + contarNodos(arbol.derecha);
}

function crearDivNodo(nodo) {
  const div = document.createElement("div");
  div.classList.add("nodo-ast");
  const raiz = document.createElement("div");
  raiz.classList.add("nodo-raiz");
  raiz.textContent = nodo.raiz;
  div.append(raiz)
  console.log(div);
  if(nodo.izquierda === null && nodo.derecha === null) return div;
  if(nodo.izquierda !== null) {
    const izq = crearDivNodo(nodo.izquierda);
    izq.classList.add("nodo-izq")
    div.append(izq);
  }
  if(nodo.derecha !== null){
    const der = crearDivNodo(nodo.derecha);
    der.classList.add("nodo-der")
    div.append(der);
  }
  return div;
}


//compilar();