function cod01(){ //Entrada de Datos
    const nombre = prompt('Ingresa tu nombre:');
    const edad = prompt('Ingresa tu edad:');
    const sexo = prompt('Ingresa tu sexo:');
    document.writeln('<p>Hola,' + nombre + '.');
    document.writeln('Así que tienes ' + edad + ' años');
    document.writeln(' y tu sexo es ' + sexo + '</p>');
}

function cod02(){ //Estructuras Secuenciales
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

function cod03(){ //Estructuras Condicionales
    const nombre = prompt('Ingresa tu nombre:');
    const materia = prompt('Ingresa tu materia:');
    const nota = prompt('Ingresa tu nota:');
    isNaN(parseFloat(nota)) ? document.writeln(nombre + ', la nota no es un número.')
        : nota >= 6 ? document.writeln('Has acreditado la materia de ' + materia + ', ' + nombre)
            : document.writeln('Has reprobado la materia de ' + materia + ', ' + nombre)
}

function cod04(){ // Estructuras Condicionales Compuestas
    const v1 = parseInt(prompt('Ingrese el primer número:'));
    const v2 = parseInt(prompt('Ingrese el segundo número:'));
    if (v1 > v2) {
        document.writeln('el mayor es ' + v1);
    } else if (v2 < v1){
        document.writeln('el mayor es ' + v2);
    } else {
        document.writeln('Los dos números son iguales')
    }
}

function cod05(){ // Estructuras Condicionales Anidadas
    const califs = [];
    for(let i=0; i<3; i++){
        const cal = parseFloat(prompt('Ingresa calificación ' + (i+1) + ': '));
        if(isNaN(cal)) { alert('La calificación ' + (i+1) + ' no es un número. Vuelve a intentaro.'); i--; continue }
        if(cal > 10 || cal < 0) { alert('La calificación excede el rango entre cero y diez. Vuele a intentarlo.'); i--; continue }
        califs.push(cal)
    }
    const prom = (califs[0] + califs[1] + califs[2]) / 3;
    document.writeln('<p>Calificaciones: ' + califs[0] + ', ' + califs[1] + ', ' + califs[2] + ' capturadas</p>');
    document.writeln('<p>Tu promedio es de: ' + prom + '</p>');
    if(prom >= 9) { document.writeln('Aprobado con mención honorifica :D'); return }
    if(prom >= 7) { document.writeln('Pasaste n_n'); return }
    if(prom >= 6) { document.writeln('Hechale ganas bro'); return }
    document.writeln('Reprobaste, hechale más ganas')
}

function cod06(){ // Operadores Lógicos
    const nums = [];
    for(let i=0; i<3; i++){
        const num = parseFloat(prompt('Ingresa un número: '));
        if(isNaN(num)) { alert('El valor ingresado no es un número. Vuelve a intentarlo.'); i--; continue }
        nums.push(num)
    }
    if(nums[0] > nums[1] && nums[0] > nums[2]) { document.writeln('El número mayor es: ' + nums[0]); return }
    if(nums[1] > nums[0] && nums[1] > nums[2]) { document.writeln('El número mayor es: ' + nums[1]); return }
    if(nums[2] > nums[0] && nums[2] > nums[1]) { document.writeln('El número mayor es: ' + nums[2]); return }
    document.writeln('Ingresa números distintos entre si para ejecutar.')
}

function cod07(){ // Operadores Lógicos con Condicional
    const fecha = ['dia','mes','año'];
    const periodo = ['primer', 'segundo', 'tercer', 'cuarto']
    for(let i=0; i<3; i++){
        const x = parseInt(prompt('Ingresa el ' + fecha[i] + ':'))
        if(isNaN(x)) { alert('El ' + fecha[i] + ' debe ser un número. Vuelve a intentarlo.'); i--; continue }
        if(x<0 || (x>31 && i==0)) { alert('Ingresa un valor entre 1 y 31'); i--; continue }
        if(x<0 || (x>12 && i==1)) { alert('Ingresa un valor entre 1 y 13'); i--; continue }
        fecha.push(x)
    }
    document.writeln('<p>La fecha es: ' + fecha[3] + '/' + fecha[4] + '/' + fecha[5] + '.</p>');
    document.writeln('<p>Te encuentras en el ' + periodo[(fecha[4]-1)%3] + ' mes del ' + periodo[Math.floor((fecha[4]-1)/3)] + ' trimestre.</p>')
}

function cod08(){ //SWITCH
    const valor = parseInt(prompt('Ingrese un valor comprendido entre 1 y 5:'));
    switch (valor) {
        case 1:
            document.writeln('uno');
            break;
        case 2:
            document.writeln('dos');
            break;
        case 3:
            document.writeln('tres');
            break;
        case 4:
            document.writeln('cuatro');
            break;
        case 5:
            document.writeln('cinco');
            break;
        default:
            document.writeln('debe ingresar un valor comprendido entre 1 y 5.');
    }
}

function cod09(){ //While
    let x = 1;
    while (x <= 100)
        document.writeln('<p>' + x++ + '</p>');
}

function cod10(i = 0, suma = 0){
    if(!(i<5)) { return document.writeln('<p>La suma de los valores es ' + suma + '</p>')}
    const valor = parseInt(prompt('Ingresa el valor ' + (i+1) + ':'));
    if(isNaN(valor)){ alert('El valor ingresado debe de ser un número. Por favor, vuelve a intentarlo.'); cod10(i,suma)}
    else{cod10(i+1,suma+valor)}
}