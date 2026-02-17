function cod01(){
    const nombre = prompt('Ingresa tu nombre:');
    const edad = prompt('Ingresa tu edad:');
    const sexo = prompt('Ingresa tu sexo:');
    document.writeln('<p>Hola,' + nombre + '.');
    document.writeln('Así que tienes ' + edad + ' años');
    document.writeln(' y tu sexo es ' + sexo + '</p>');
}

function cod02(){
    const v1 = prompt('Ingresa un valor');
    const v2 = prompt('Ingresa otro valor');
    const suma = v1 + v2;
    const producto = v1 + v2;
    const diferencia = v1 - v2;
    const division = v1 / v2;
    document.writeln('La suma es de: ' + suma)
    document.writeln('<p>');
    document.writeln('El producto es de: ' + producto)
    document.writeln('</p><p>');
    document.writeln('La diferencia es de: ' + diferencia)
    document.writeln('<p></p>');
    document.writeln('El cociente es de: ' + division)
    document.writeln('</p>')
}

function cod03(){
    const nombre = prompt('Ingresa tu nombre:');
    const materia = prompt('Ingresa tu materia:');
    const nota = prompt('Ingresa tu nota:');
    isNaN(parseFloat(nota)) ? document.writeln(nombre + ', la nota no es un número.')
        : nota >= 6 ? document.writeln('Has acreditado la materia de ' + materia + ', ' + nombre)
            : document.writeln('Has reprobado la materia de ' + materia + ', ' + nombre)
}

document.getElementById('btn-cod01').addEventListener('click', () => { cod01(); });
document.getElementById('btn-cod02').addEventListener('click', () => { cod02(); });
document.getElementById('btn-cod03').addEventListener('click', () => { cod03(); });