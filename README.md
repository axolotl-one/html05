# Programas UAEMEX

## Programa 1. Distancia desde el punto de Origen en función del recorrdo sobre el perimetro de un cuadrado

### Commit 1. Graficador Base

**En HTML**
Se creo un encabezado header donde se incluyó un formulario donde el usuario ingresa los datos requeridos para crear la gráfica, siendo la longitud del cuadrado y la máxima distancia a recorrer sobre el perimetro del cuadrado. Se evalúa que el usuario no ingrese numeros negativos. Además, se incluyó una etiqueta ```canvas``` donde se trabajará la gráfica utilizando la librería ```Chart.js```. En CSS se configuro el box-sizing a border-box.

**En JavaScript**
Se utilizó un listener para el elemento del formulario que creará la gráfica al activar el evento de ```"submit"``` que al validarse se capturarán los valores del lado, perimetro, nuemro de vueltas y recorrido de la vuelta actual. Con ello, se utilizará la función ```funcionDistancia(recorrido)``` que calculará el valor de la distancia recibiendo el valor del recorrido actual como parametro.

Para obtener los datos de coordenadas, primero se inicializan el numero total de puntos a crear, la distancia maxima de reorrido, y dos arreglos vacíos para los datos en ```x``` y ```y```; despues se ejecuta un ciclo ```for``` para cada punto hasta juntar el máximo total de puntos previamente definido. Para los valores de x, se multiplica el maximo del recorrido por el caso y se divide entre el número de puntos, para calcular a ```y``` se utiliza la función ```funcionDistancia``` colocando a ```x``` como parametro. Por ultimo se inserta cada dato a su arreglo correspondiente.

Al obtener los datos de las coordenadas que estan contenidos en los arreglos para ```x``` y ```y```, se crea el objeto de Chart construido a partir del elemeto ```canvas``` del html y se asignan sus propiedades correspondientes donde se incluyen los datos almacendos en los arreglos.