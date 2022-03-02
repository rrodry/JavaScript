let totalProducto = 0;
function addCart(producto){
    cantidad = prompt('Cantidad a agregar');
    for (i=0; i<cantidad;i++){
        precio = parseInt(producto.text);
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