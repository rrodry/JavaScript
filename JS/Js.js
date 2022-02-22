let totalProducto = 0;
function addCart(producto){
    precio = parseInt(producto.text);
    totalProducto += precio;
    alert('Agregado, Total ' + totalProducto)
}
function deleteCart(){
    totalProducto = 0;
    alert('Carrito eliminado $'+totalProducto);
}