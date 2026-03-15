const editor = document.getElementById("codigo-fuente");
const consola = document.getElementById("consola");
editor.value = "public void main() {\n   Console.WriteLine(\"Hola Mundo...!\");\n   Console.ReadKey(true);\n}"

window.compilar = function() {
  if(!editor.value) return;
  consola.value = "Generando Lista de Tokens:\n"
  const tokens = generarTokens(editor.value);
  if(!tokens) return;
  consola.value += "Generando AST";
  console.log(armarAST(new NodoToken("main"), tokens, 0, ));  
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

class NodoToken{
  constructor(raiz) { this.raiz = raiz; this.nodo1 = null; this.nodo2 = null }


}

function armarAST(nodo, tokens, pin) {
  
  if(pin >= tokens.length) return;

  if(tokens[pin].tipo === tiposToken.Id && tokens[pin + 1] !== tiposToken.Operador) return nodo;
  if(tokens[pin].tipo === tiposToken.Delimitador && tokens[pin + 1].valor === ";") return nodo;

  if(tokens[pin].tipo === tiposToken.Reservado && tokens[pin+1].tipo === tiposToken.Id)
    nodo.nodo1 = armarAST(new NodoToken(tokens[pin+1]), tokens, pin+1)

  return nodo;
}

//compilar();