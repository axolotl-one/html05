let graficaHecha;
document.getElementById("graficaConfig").addEventListener("submit", function(e){
    e.preventDefault();
    const grafica = document.getElementById("grafica").getContext("2d");
    const lado = document.getElementById("outputLado").value;

    function funcionDistancia(recorrido)
    {
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

    if(graficaHecha)
        graficaHecha.destroy();

    //Datos para graficar
    const numPuntos = document.getElementById("outputTotalPartes").value; // Numero de partituras
    const recorridoMaximo = document.getElementById("outputMaxRecord").value;
    const datosX = [];
    const datosY = [];

    for (let i = 0; i <= numPuntos; i++) {
        const x = (recorridoMaximo * i) / numPuntos;
        const y = funcionDistancia(x);
        datosX.push(x);
        datosY.push(y);
    }


    // Crear la gráfica con Chart.js
    graficaHecha = new Chart(grafica, {
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
                    },
                    // Establecer un rango inicial similar al del eje Y
                    min: 0,
                    max: recorridoMaximo // Mantener el recorrido máximo
                },
                y: {
                    title: {
                        display: true,
                        text: 'Distancia al Origen (y)'
                    },
                    beginAtZero: true,
                    // Establecer un rango inicial basado en la distancia máxima esperada
                    max: Math.ceil(Math.sqrt(2*lado*lado)) // Diagonal Maxima
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
            },

            //Habilitar zoom y scroll
            interaction: {
                 mode: 'index',
                 intersect: false
            },
            pan: {
                enabled: true,
                mode: 'xy'
            },
            zoom: {
                enabled: true,
                mode: 'xy'
            }
        }
    });


});