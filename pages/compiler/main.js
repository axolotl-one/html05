const editor = document.getElementById("codigo-fuente");
const consola = document.getElementById("consola");
editor.value = "public void main() {\n   Console.WriteLine(\"Hola Mundo...!\");\n   Console.ReadKey(true);\n}"

window.compilar = function() {
  if(!editor.value) return;
  consola.value = "Generando Lista de Tokens:\n"
  for(let token of generarTokens(editor.value))
    consola.value +=  token.tipo + ": " + token.valor + "\n";
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
  let pin = 0;
  let tokens = [];

  // Definir las reglas de los tokens
  const reglas = [
    { tipo: tiposToken.Delimitador, regex: /^\(/ },
    { tipo: tiposToken.Delimitador, regex: /^\)/ },
    { tipo: tiposToken.Delimitador, regex: /^\{/ },
    { tipo: tiposToken.Delimitador, regex: /^\}/ },
    { tipo: tiposToken.Delimitador, regex: /^\;/ },
    { tipo: tiposToken.Delimitador, regex: /^\./ },
    { tipo: tiposToken.Delimitador, regex: /^\,/ },
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
        let value = match[0];
        // No añadir espacios en blanco a la lista final de tokens
        if (regla.tipo !== tiposToken.Ignorable) {
          tokens.push({ tipo: regla.tipo, valor: value });
        }
        pin += value.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      tokens.push({tipo: "Error: Caracter Desconocido", valor: char + "\nEjecución Abortada."});
      return tokens;
      //pin++; continue;
    }
  }

  return tokens;
}

//compilar();