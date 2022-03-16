// Importar módulos
const https = require('https')
const fs = require('fs')
/*1. Recibir por la línea de comando los siguientes argumentos:
a. Nombre del archivo que se creará.
b. Extensión del archivo.
c. Indicador económico que se desea convertir.
d. Cantidad de pesos que se quiere cambiar.*/
//Guarda nuevo array en la variable
console.log('Ingrese los datos');
const argumentos = process.argv.slice(2);
//Variables para los argumentos
let nombreArchivo = (argumentos[0]);
let extensionArchivo = (argumentos[1]);
let indicadorEco = (argumentos[2]);
let cantidadPesos = (argumentos[3]);
console.log(nombreArchivo);
//2. Consultar la API con el módulo https y almacenar la respuesta en una variable.
https
.get('https://mindicador.cl/api', (resp)=>{
resp.on('data', (data)=>{

    let indicadores = JSON.parse(data);
    let valorDolar = indicadores[indicadorEco].valor;
console.log(valorDolar);
    let valorConversion = (cantidadPesos/valorDolar).toFixed(2);
    /*3. Crear un archivo con el módulo fs cuyos datos están formados por los argumentos recibidos por línea de comando y su contenido basado en el template de la descripción.*/
    fs.writeFile(
        `${nombreArchivo}.${extensionArchivo}`,
        `A la fecha: ${Date()}\n
        Fue realizada cotización con los siguientes datos:\n
        Cantidad de pesos a convertir: ${cantidadPesos}\n
        Convertido a ${indicadorEco}: ${valorConversion}`,
        'utf8',()=>{
            console.log('Archivo creado exitosamente');
            //4. Enviar por consola el contenido del archivo luego de que haya sido creado.
            fs.readFile(`${nombreArchivo}.${extensionArchivo}`, 'utf8', (err, data)=>{
                console.log(data);
            } )
        }
    )
})
})