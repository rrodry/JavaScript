let ingreso = prompt('Continuar al programa?');
while (ingreso != 0) {
    let acumTotal=0;
    let ciclos = prompt('ingrese la cantidad de ciclos')
    for(i=0; ciclos>i; i++){
        let numero1 = parseInt(prompt('Ingrese la cantidad a acumular'));
        acumTotal += numero1
    }
    alert(acumTotal);
    ingreso = prompt('Volver a realizar el programa?');
}