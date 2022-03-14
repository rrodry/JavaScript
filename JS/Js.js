let totalProducto = 0, cantProducto = 0, x = 0, flag, btn1, btn2, parentPrecio, parentImage, productosLista = [],cantidadLista = [];
const divProductos = document.getElementById('divListAgregado')

btn1 = document.getElementById("btnRemera1");
btn2 = document.getElementById("btnRemera2");

btn1.addEventListener("click", addCart)
btn2.addEventListener("click", addCart)

function addCart(traido) {
    let parentPrecio = traido.target.parentNode.children[1].children[0].text,
        parentImage = traido.target.parentNode.children[0].src;
        cantidad = parseInt(prompt('Cantidad a agregar'))
        cantProducto += cantidad;
        totalProducto += parseInt(parentPrecio) * cantidad;
    
    if (flag == true) {
        index = productosLista.indexOf(parentImage)
        cantidadPrecioSuma = parseInt(cantidadLista[parseInt(index)])+cantidad
        const liProducto = document.getElementById('productos'+ index)
       if(productosLista.includes(parentImage)){
           cantidadLista[index] = cantidadPrecioSuma
           liProducto.children[2].children[0].innerText = cantidadLista
       }else{
        const ul = document.createElement('ul')
        ul.id = 'productos' + productosLista.length
        divProductos.appendChild(ul)
        cantidadLista.push(cantidad)
        carritoAgregar(parentImage,parentPrecio,cantidadLista[productosLista.indexOf(parentImage)])
        productosLista.push(parentImage)
       }

    } else {
        const ul = document.createElement('ul')
        ul.id = 'productos' + productosLista.length
        divProductos.appendChild(ul)
        cantidadLista[0] = cantidad
        carritoAgregar(parentImage,parentPrecio,cantidadLista);
        flag = true;
        productosLista[0]= parentImage
    }
}
function deleteCart() {
    if (totalProducto == 0) {
        alert("No agregaste nada al carrito")
    } else {
        totalProducto = 0;
        alert('Carrito eliminado $' + totalProducto);
    }
    actuElement = document.getElementById("totalElement");
    actuElement.remove();
    flag = false

}

function carritoAgregar(parentImage,parentPrecio,cantProducto) {
    const ulProducto = document.getElementById('productos' + productosLista.length)
    for (i = 0; i < 3; i++) {
        const liProducto = document.createElement('li')
        liProducto.id = "li" + i
        ulProducto.appendChild(liProducto)
        if (i == 0) {
            const imagenProducto = document.createElement('img')
            imagenProducto.src = parentImage
            ulProducto.children[i].appendChild(imagenProducto)
        }if(i == 1){
            Precio = document.createElement("p")
            Precio.innerText = parentPrecio
            ulProducto.children[i].appendChild(Precio)
        }
        if(i == 2){
            cantidadPr = document.createElement("p")
            cantidadPr.innerText = cantProducto
            ulProducto.children[i].appendChild(cantidadPr)
        }
    }
}/*
function addAll(producto1,producto2){
    let productos = [producto1,producto2];
    for(i=0;i<productos.length;i++){
        totalProducto += parseInt(productos[i].text);
    }
    alert('Agregado $'+ totalProducto)


}*/
