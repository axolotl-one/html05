document.getElementById("graficaConfig").addEventListener("submit", function(e){
    e.preventDefault();
    const grafica = document.getElementById("grafica").getContext("2d");

    function funcionDistancia(recorrido)
    {
        const lado = document.getElementById("inputLado").value;
        const perim = lado * 4;
        const vueltas = Math.floor(recorrido / perim);
        const recorridoEnVuelta = recorrido % perim;
        if (recorridoEnVuelta >= 0 && recorridoEnVuelta < lado) {
            return recorridoEnVuelta;
        } else if (recorridoEnVuelta >= lado && recorridoEnVuelta < 2 * lado) {
            return Math.sqrt(lado**2 + (recorridoEnVuelta - lado)**2);
        } else if (recorridoEnVuelta >= 2 * lado && recorridoEnVuelta < 3 * lado) {
            return Math.sqrt((3 * lado - recorridoEnVuelta)**2 + lado**2);
        } else { // recorridoEnVuelta >= 3 * lado && recorridoEnVuelta < 4 * lado
            return 4 * lado - recorridoEnVuelta;
        }
    }


    //Datos para graficar
    const numPuntos = 500; // Numero de partituras
    const datosX = [];
    const datosY = [];
    const recorridoMaximo = 160;

    for (let i = 0; i <= numPuntos; i++) {
        const x = (recorridoMaximo * i) / numPuntos;
        const y = funcionDistancia(x);
        datosX.push(x);
        datosY.push(y);
    }


    // Crear la gráfica con Chart.js
    const miGrafica = new Chart(grafica, {
        type: 'line',
        data: {
            labels: datosX,
            datasets: [{
                label: 'Distancia al Origen',
                data: datosY,
                borderColor: 'blue',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Recorrido (x)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Distancia al Origen (y)'
                    },
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Distancia al Origen en Función del Recorrido en un Cuadrado',
                    fontSize: 16
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });


});