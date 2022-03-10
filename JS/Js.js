let totalProducto = 0, flag;

btn1 = document.getElementById("btnRemera1");
btn2 = document.getElementById("btnRemera2");

btn1.addEventListener("click", addCart)

function addCart(traido){
    divProductos = document.getElementById('productos');
    parent = traido.target.parentNode.children[1].children[0].text;
    cantidad = prompt('Cantidad a agregar');
    for (i=0; i<cantidad;i++){
        precio = parseInt(parent);
        totalProducto += precio;
    }
    alert('Agregado, Total ' + totalProducto);
    if (flag == true){
        actuElement = document.getElementById("totalElement");
        actuElement.innerHTML = "Total Productos: $" + totalProducto;

    }else{
        totalElement = document.createElement("p")
        totalElement.id = "totalElement"
        totalElement.innerHTML = "Total Productos: $" + totalProducto;
        divProductos.appendChild(totalElement)
        flag=true
    }
}
function deleteCart(){
    if(totalProducto == 0){
        alert("No agregaste nada al carrito")
    }else{
        totalProducto = 0;
        alert('Carrito eliminado $'+totalProducto); 
    }
    actuElement = document.getElementById("totalElement");
    actuElement.remove();
    flag=false

}
/*
function addAll(producto1,producto2){
    let productos = [producto1,producto2];
    for(i=0;i<productos.length;i++){
        totalProducto += parseInt(productos[i].text);
    }
    alert('Agregado $'+ totalProducto)


}*/
