function cod01(){ //Entrada de Datos
    const nombre = prompt('Ingresa tu nombre:');
    const edad = prompt('Ingresa tu edad:');
    const sexo = prompt('Ingresa tu sexo:');
    document.getElementById('respuesta').innerHTML =
        '<p>Hola, ' + nombre + '</p>' + '<p>Entonces, tienes ' + edad +
        ' y tu sexo es ' + sexo + '... ¡Interesante...!</p>';
}

function cod02(){ //Estructuras Secuenciales
    const v1 = parseFloat(prompt('Ingresa un valor'));
    const v2 = parseFloat(prompt('Ingresa otro valor'));
    if(isNaN(v1) || isNaN(v2)) { document.getElementById('respuesta').innerHTML = '<p>Alguno de los valores no es un número. Vuelve a intentarlo.</p>'; return }
    const suma = v1 + v2;
    const producto = v1 * v2;
    const diferencia = v1 - v2;
    const division = v1 / v2;
    document.getElementById('respuesta').innerHTML =
        '<p>Los valores son: ' + v1 + ' y ' + v2 + '</p>' +
        '<p>La suma es de: ' + suma + '.</p>' +
        '<p>El producto es de: ' + producto + '.</p>' +
        '<p>La diferencia es de: ' + diferencia + '.</p>' +
        '<p>El cociente es de: ' + division + '.</p>'
}

function cod03(){ //Estructuras Condicionales
    const nombre = prompt('Ingresa tu nombre:');
    const materia = prompt('Ingresa tu materia:');
    const nota = prompt('Ingresa tu nota:');
    isNaN(parseFloat(nota)) ? alert(nombre + ', la nota no es un número. Vuelve a Intentarlo')
        : nota >= 6 ? document.getElementById('respuesta').innerHTML = 'Has acreditado la materia de ' + materia + ', ' + nombre
            : document.getElementById('respuesta').innerHTML = 'Has reprobado la materia de ' + materia + ', ' + nombre
}

function cod04(){ // Estructuras Condicionales Compuestas
    const v1 = parseInt(prompt('Ingrese el primer número:'));
    const v2 = parseInt(prompt('Ingrese el segundo número:'));
    if (v1 > v2) {
        document.getElementById('respuesta').innerHTML = 'El número mayor es ' + v1;
    } else if (v2 < v1){
        document.getElementById('respuesta').innerHTML = 'El número mayor es ' + v2;
    } else {
        document.getElementById('respuesta').innerHTML = 'Los dos números son iguales'
    }
}

function cod05(){ // Estructuras Condicionales Anidadas
    const califs = [];
    const salida = document.getElementById('respuesta');
    for(let i=0; i<3; i++){
        const cal = parseFloat(prompt('Ingresa calificación ' + (i+1) + ': '));
        if(isNaN(cal)) { alert('La calificación ' + (i+1) + ' no es un número. Vuelve a intentaro.'); i--; continue }
        if(cal > 10 || cal < 0) { alert('La calificación excede el rango entre cero y diez. Vuele a intentarlo.'); i--; continue }
        califs.push(cal)
    }
    const prom = (califs[0] + califs[1] + califs[2]) / 3;
    salida.innerHTML = '<p>Calificaciones: ' + califs[0] + ', ' + califs[1] + ', ' + califs[2] + ' capturadas</p>';
    salida.innerHTML += '<p>Tu promedio es de: ' + prom + '</p>';
    if(prom >= 9) { salida.innerHTML += '<p>Aprobado con mención honorifica :D</p>'; return }
    if(prom >= 7) { salida.innerHTML += '<p>Pasaste n_n</p>'; return }
    if(prom >= 6) { salida.innerHTML += '<p>Hechale ganas bro</p>'; return }
    salida.innerHTML += '<p>Reprobaste, hechale más ganas</p>';

}

function cod06(){ // Operadores Lógicos
    const nums = [];
    const salida = document.getElementById('respuesta')
    for(let i=0; i<3; i++){
        const num = parseFloat(prompt('Ingresa un número: '));
        if(isNaN(num)) { alert('El valor ingresado no es un número. Vuelve a intentarlo.'); i--; continue }
        nums.push(num)
    }
    if(nums[0] > nums[1] && nums[0] > nums[2]) { salida.innerHTML = 'El número mayor es: ' + nums[0]; return }
    if(nums[1] > nums[0] && nums[1] > nums[2]) { salida.innerHTML = 'El número mayor es: ' + nums[1]; return }
    if(nums[2] > nums[0] && nums[2] > nums[1]) { salida.innerHTML = 'El número mayor es: ' + nums[2]; return }
    salida.innerHTML = 'Ingresa números distintos entre si para ejecutar.'
}

function cod07(){ // Operadores Lógicos con Condicional
    const fecha = ['dia','mes','año'];
    const periodo = ['primer', 'segundo', 'tercer', 'cuarto']
    for(let i=0; i<3; i++){
        const x = parseInt(prompt('Ingresa el ' + fecha[i] + ':'))
        if(isNaN(x)) { alert('El ' + fecha[i] + ' debe ser un número. Vuelve a intentarlo.'); i--; continue }
        if(x<0 || (x>31 && i==0)) { alert('Ingresa un valor entre 1 y 31'); i--; continue }
        if(x<0 || (x>12 && i==1)) { alert('Ingresa un valor entre 1 y 12'); i--; continue }
        fecha.push(x)
    }
    document.getElementById('respuesta').innerHTML = '<p>La fecha es: ' + fecha[3] + '/' + fecha[4] + '/' + fecha[5] + '.</p>' +
        '<p>Te encuentras en el ' + periodo[(fecha[4]-1)%3] + ' mes del ' + periodo[Math.floor((fecha[4]-1)/3)] + ' trimestre de ' + fecha[5] + '.</p>';
}

function cod08(){ //SWITCH
    const salida = document.getElementById('respuesta')
    const valor = parseInt(prompt('Ingresa un valor comprendido entre 1 y 5:'));
    switch (valor) {
        case 1:
            salida.innerHTML = 'Haz seleccionado la opción uno (0001)';
            break;
        case 2:
            salida.innerHTML = 'Haz seleccionado la opción dos (0010)';
            break;
        case 3:
            salida.innerHTML = 'Haz seleccionado la opción tres (0011)';
            break;
        case 4:
            salida.innerHTML = 'Haz seleccionado la opción cuatro (0100)';
            break;
        case 5:
            salida.innerHTML = 'Haz seleccionado la opción cinco (0101)';
            break;
        default:
            salida.innerHTML = 'Debes ingresar un valor comprendido entre 1 y 5.';
    }
}

function cod09(){ //While
    let x = 1;
    while (x <= 100)
        document.getElementById('respuesta').innerHTML += '<p>Basta ' + x++ + '</p>';
}

function cod10(i = 0, suma = 0){ //Problema solucion ejercicio
    if(!(i<5)) { return document.getElementById('respuesta').innerHTML = '<p>La suma de los valores es ' + suma + '</p>'}
    const valor = parseInt(prompt('Ingresa el valor ' + (i+1) + ':'));
    if(isNaN(valor)){ alert('El valor ingresado debe de ser un número. Por favor, vuelve a intentarlo.'); cod10(i,suma)}
    else{cod10(i+1,suma+valor)}
}

function cod11(){ //Do while
    let valor = 0;
    do {
        valor = parseInt(prompt('Ingrese un número entre 0 y 999:', ''));
        if(valor < 0 || valor > 999 || isNaN(valor)) { alert('El dato esta mal en algo.'); continue }
        const msj = 'El valor ' + valor + ' tiene ';
        if (valor < 10) { alert(msj + '1 digito.'); continue }
        if (valor < 100) { alert(msj + '2 digitos'); continue }
        if (valor < 1000) { alert(msj + '3 digitos'); continue }
    } while (valor != 0);
    document.getElementById('respuesta').innerHTML = '<p>Haz conseguido salir del ciclo</p>'
}

function cod12(){ //For
    const cap = [''];
    for (let f = 0; f < 10; f++)
        for(let c = 0; c < 10; c++)
            cap[0] += (c===0 ? '<p>[' + f + ' , ' + c + '] ' : c===9 ? '[' + f + ' , ' + c + ']</p>' : '[' + f + ' , ' + c + '] ' );
    document.getElementById('respuesta').innerHTML = cap[0]
}

function cod13A(){
    document.getElementById('respuesta').innerHTML = 
        '<p>Código 13A sin Función:</p>' +
        '<p>Cuidado</p>' +
        '<p>Ingrese su documento correctamente</p>' +
        '<p>Cuidado</p>' +
        '<p>Ingrese su documento correctamente</p>' +
        '<p>Cuidado</p>' +
        '<p>Ingrese su documento correctamente</p>';
}

function cod13B(){
    document.getElementById('respuesta').innerHTML = '<p>Código 13B con Función:</p>'
    const mostrarMensaje = () => {
        document.getElementById('respuesta').innerHTML += '<p>Cuidado</p>';
        document.getElementById('respuesta').innerHTML += '<p>Ingrese su documento correctamente</p>';
    }
    mostrarMensaje();
    mostrarMensaje();
    mostrarMensaje();
}