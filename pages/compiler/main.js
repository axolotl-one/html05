const editor = document.getElementById("codigo-fuente");
const consola = document.getElementById("consola");
//editor.value = "public void main() {\n   Console.WriteLine(\"Hola Mundo...!\");\n   Console.ReadKey(true);\n}"
editor.value = "string c = \"hola\";\nstring v = c;"

window.compilar = function() {
  if(!editor.value) return;
  consola.value = "Generando Lista de Tokens:\n"
  const tokens = generarTokens(editor.value);
  if(!tokens) return;
  consola.value += "Generando AST\n";
  //console.log(armarASTX(new NodoToken({tipo: "raiz", valor: "origen"}), tokens, 0 ));
  const AST = armarAST(new NodoToken("origen"), [...tokens])
  console.log(AST);
  console.log(JSON.stringify(AST, null, 2))
  consola.value += JSON.stringify(AST, null, 2)
}

const tiposToken = {
  Id: "Identificador",
  Numero: "Numero",
  Reservado: "Palabra Reservada",
  Delimitador: "Delimitador",
  String: "Cadena de Caracteres",
  Operador: "Operador",
  Ignorable: "Espacios/Saltos/Comentarios",
};

function generarTokens(input) {
  const tokens = [];
  let pin = 0;
  
  // Definir las reglas de los tokens
  const reglas = [
    { tipo: tiposToken.Delimitador, regex: /^[(){};,\[\]]/ },
    { tipo: tiposToken.Numero, regex: /^[0-9]+/ },
    { tipo: tiposToken.Ignorable, regex: /^(\/\*)([^\/\*]*)(\*\/)/}, //Comentario en bloque
    { tipo: tiposToken.Ignorable, regex: /^(\/\/)([^\/\*]*)\n/}, //Comentario en linea
    { tipo: tiposToken.Operador, regex: /^(==|>=|<=|!=|\|\||&&|\+\+|--|\+=|-=|\*=|\/=)/ },
    { tipo: tiposToken.Operador, regex: /^[+\-*/=%!><]/ },
    { tipo: tiposToken.String, regex: /^"([^"]*)"|^'([^']*)'/ },
    { tipo: tiposToken.Reservado, regex: /^(int|string|void|public|private|true|false)/ },
    { tipo: tiposToken.Id, regex: /^[a-zA-Z_$][a-zA-Z0-9_$]*/ },
    { tipo: tiposToken.Ignorable, regex: /^\s+/ }, // Espacios en blanco
    { tipo: tiposToken.Ignorable, regex: /^\n+/ }, // Saltos de Linea
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
        if (regla.tipo !== tiposToken.Ignorable) {
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

function armarAST(nodo, tokens) {
  if(nodo.raiz === ";") return nodo;
  if(tokens.length < 1) return;
  console.log("nodo: ", nodo.raiz)
  console.log("token1: ", tokens[0].valor)
  if(tokens[1]) console.log("token2: ", tokens[1].valor)
  console.log("tokens: ", tokens)
  console.log("length: ", tokens.length)
  if(nodo.raiz === "origen"){
    nodo.izquierda = armarAST(new NodoToken(tokens.shift().valor), tokens)
    nodo.derecha = armarAST(new NodoToken("NB"), tokens)
    return nodo;
  }

  if(nodo.raiz === "NB"){
    nodo.izquierda = armarAST(new NodoToken(tokens.shift().valor), tokens)
    if(!nodo.raiz)
      nodo.derecha = armarAST(new NodoToken("NB"), tokens)
  }

  if(nodo.raiz === "string"){
    tokens[0].tipo === tiposToken.Id
      ? nodo.izquierda = armarAST(new NodoToken(tokens.shift().valor), tokens)
      : nodo = new ErrorSintactico("Declarador string no recibe un ID");
    tokens[0].valor === "="
      ? nodo.derecha = armarAST(new NodoToken(tokens.shift().valor), tokens)
      : nodo = new ErrorSintactico("Declarador string no utiliza el operado de asignación: \"=\".")
    return nodo;
  }
  if(nodo.raiz === "="){
    tokens[0].valor !== ";"
      ? nodo.izquierda = armarAST(new NodoToken(tokens.shift().valor), tokens)
      : nodo = new ErrorSintactico("La asignación esta vacía");
    tokens[0].tipo === tiposToken.Operador || tokens[0].valor === ";"
      ? nodo.derecha = armarAST(new NodoToken(tokens.shift().valor), tokens)
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
    tokens[++i].tipo === tiposToken.Id
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
    tokens[++i].tipo === tiposToken.Operador || tokens[i].valor === ";"
      ? nodo.derecha = armarAST(new NodoToken(tokens[i].valor), tokens, i)
      : nodo = new ErrorSintactico("Falta punto y coma después de: " + nodo.raiz + ".")
    return nodo;
  }
  if(tokens[i].tipo === tiposToken.Id){
    return nodo
  }
  if(tokens[i].tipo === tiposToken.String){
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


//compilar();