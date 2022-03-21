let size, productoTotal = 0, arrObj = JSON.parse(localStorage.getItem("arrObj")) || [], suma = 0,
    btnEliminar;
const divProductos = document.getElementById('divListAgregado'),
    preciosViajes = JSON.parse(localStorage.getItem("preciosViajes")) || {}
    btn1 = document.getElementById("btnRemera1"),
    btn2 = document.getElementById("btnRemera2"),
    btn3 = document.getElementById("btnRemera3")

btn1.addEventListener("click", () => verificarCarrito(btn1.parentNode.children[1].children[0]))
btn2.addEventListener("click", () => verificarCarrito(btn2.parentNode.children[1].children[0]))
btn3.addEventListener("click", () => verificarCarrito(btn3.parentNode.children[1].children[0]))

if (Object.keys(preciosViajes).length > 0) {
    for (const lugar in preciosViajes) {
        size = Object.keys(preciosViajes).indexOf(lugar)
        for (i = 0; i <= arrObj.length; i++) {
            if (lugar == arrObj[i]) {
                travel = arrObj[i + 2]
            }
        }
        createNewProducto(size, travel, lugar)
    }
}

function eliminarCarrito(lugar) {
    let producto = document.getElementById(lugar),total = document.getElementById("TotalDiv")
    for (i = 0; i <= arrObj.length; i++) {
        if (lugar == arrObj[i]) {
            arrObj.splice(i, 3);
            delete preciosViajes[lugar]
        }
    }if(arrObj.length == 0){
        localStorage.clear("arrObj","preciosViajes","productoTotal")
        total.remove()
        delete preciosViajes
    }else{
        let suma=0
        for (i = 0; i <= arrObj.length; i++) {
            if(!isNaN(arrObj[i])){
                suma += arrObj[i]
            }
        }
        localStorage.setItem("arrObj",JSON.stringify(arrObj))
        localStorage.setItem("productoTotal",JSON.stringify(suma))
        localStorage.setItem("preciosViajes",JSON.stringify(preciosViajes))
        divProductos.parentNode.children[1].innerHTML = "Total de viajes: " + localStorage.getItem("productoTotal")
    }
    producto.remove()
}
function verificarCarrito(travel) {
    let lugar = travel.text, precio = travel.parentNode.children[1].text, cantProducto = parseInt(travel.parentNode.parentNode.children[2].value)
    size = Object.keys(preciosViajes)
    parentimg = travel.parentNode.parentNode.children[0].src
    productoTotal = 0
    if (!preciosViajes.hasOwnProperty(lugar)) {
        preciosViajes[lugar] = parseInt(precio)
        if (size.length == 0) {
            productoTotal = preciosViajes[lugar] * cantProducto
            if (arrObj.length == 0) {
                arrObj.unshift(parentimg)
                arrObj.unshift(preciosViajes[lugar] * cantProducto)
                arrObj.unshift(lugar)
                localStorage.setItem("productoTotal", productoTotal)
                localStorage.setItem("arrObj", JSON.stringify(arrObj))
                localStorage.setItem("preciosViajes", JSON.stringify(preciosViajes))
            }
            travel.parentNode.parentNode.children[2].value = ""
        } else {
            suma = preciosViajes[lugar] * cantProducto
            arrObj.unshift(parentimg)
            arrObj.unshift(suma)
            arrObj.unshift(lugar)
            arrObj.forEach(element => {
                if (!isNaN(element)) {
                    productoTotal += element
                }
            });
            localStorage.setItem("productoTotal", productoTotal)
            localStorage.setItem("arrObj", JSON.stringify(arrObj))

            localStorage.setItem("preciosViajes", JSON.stringify(preciosViajes))
            travel.parentNode.parentNode.children[2].value = ""
        }
        createNewProducto(size.length, parentimg, lugar)
    } else {
        productoTotal = 0
        suma = preciosViajes[lugar] * cantProducto
        for (i = 0; i <= arrObj.length; i++) {
            if (lugar == arrObj[i]) {
                arrObj[i + 1] += suma
            } if (!isNaN(arrObj[i])) {
                productoTotal += arrObj[i]
            }
        }
        localStorage.setItem("productoTotal", productoTotal)
        localStorage.setItem("arrObj", JSON.stringify(arrObj))
        localStorage.setItem("preciosViajes", JSON.stringify(preciosViajes))
        divProductos.parentNode.children[1].innerHTML = "Total de viajes: " + localStorage.getItem("productoTotal")
        travel.parentNode.parentNode.children[2].value = ""
    }
}
function createNewProducto(index, travel, lugar) {
    let ul = document.createElement('ul'), ulProducto = document.getElementById('divListAgregado'),
        parentImage = travel
    ul.id = lugar
    ulProducto.appendChild(ul)
    for (i = 0; i <= 3; i++) {
        let li = document.createElement('li'), p = document.createElement('p')
        ulProducto.children[index].appendChild(li)
        if (i == 0) {
            ulProducto.children[index].children[0].appendChild(document.createElement("img"))
            ulProducto.children[index].children[0].children[0].src = parentImage
        } if (i == 1) {
            ulProducto.children[index].children[1].appendChild(p)
            ulProducto.children[index].children[1].children[0].innerHTML = preciosViajes[lugar]
        } if (i == 2) {
            ulProducto.children[index].children[2].appendChild(p)
            ulProducto.children[index].children[2].children[0].innerHTML = lugar
        } if (i == 3) {
            let button = document.createElement("button")
            button.id = "btnEliminar" + index
            button.className = "buttonEliminar"
            ulProducto.children[index].children[3].appendChild(button)
        }
    }
    if (index == 0) {
        let div = document.createElement('div'), p = document.createElement('p')
        div.id = "TotalDiv"
        div.className = "divTotal"
        divProductos.parentNode.appendChild(div).appendChild(p).innerHTML = "Total de viajes: " + localStorage.getItem("productoTotal")
    } else {
        divProductos.parentNode.children[1].innerHTML = "Total de viajes: " + localStorage.getItem("productoTotal")
    }

    btnEliminar = document.getElementById("btnEliminar" + index)
    btnEliminar.addEventListener("click", () => eliminarCarrito(lugar, btn1.parentNode.children[1].children[0]))
}