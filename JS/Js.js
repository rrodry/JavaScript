let totalProducto = 0;
function addCart(traido){
    cantidad = prompt('Cantidad a agregar');
    for (i=0; i<cantidad;i++){
        precio = parseInt(traido.text);
        totalProducto += precio;    
    }
    alert('Agregado, Total ' + totalProducto)
}
function deleteCart(){
    if(totalProducto == 0){
        alert("No agregaste nada al carrito")
    }else{
        totalProducto = 0;
        alert('Carrito eliminado $'+totalProducto);    
    }

}
function addAll(producto1,producto2){
    let productos = [producto1,producto2];
    for(i=0;i<productos.length;i++){
        totalProducto += parseInt(productos[i].text);
    }
    alert('Agregado $'+ totalProducto)


}