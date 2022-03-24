let size, productoTotal = 0, arrObj = JSON.parse(localStorage.getItem("arrObj")) || [], suma = 0,conSlider = document.getElementById("containerSlider"),imgSlider = [],
    btnEliminar;
const divProductos = document.getElementById('divListAgregado'),
    preciosViajes = JSON.parse(localStorage.getItem("preciosViajes")) || {},
    btn = document.querySelectorAll('.ProductoDiv button')
    for (const button of btn) {
        button.addEventListener("click", () => verificarCarrito(button.parentNode.children[1].children[0]))
    }

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
        total.style.animation = "opacitOut 1s"
        total.style.animationFillMode = "running"
        producto.style.animation = "opacitOut 1s"
        producto.style.animationFillMode = "running"
        localStorage.clear("arrObj","preciosViajes","productoTotal")
        setTimeout(() => {
            producto.remove()
            total.remove()
        }, 500)
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
        producto.remove()
        divProductos.parentNode.children[1].textContent = "Total de viajes: " + localStorage.getItem("productoTotal")
    }
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
    ul.style.animation = "opacit 1s"
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
            button.addEventListener("click", () => eliminarCarrito(lugar))    
        }
    }
    if (index == 0) {
        let div = document.createElement('div'), p = document.createElement('p'),a = document.createElement('a')
        div.id = "TotalDiv"
        div.className = "divTotal"
        a.id = "TotalNumber"
        divProductos.parentNode.appendChild(div).appendChild(p).appendChild(a).innerHTML = "Total de viajes: $" + localStorage.getItem("productoTotal")
    } else {
        divProductos.parentNode.children[1].innerHTML = "Total de viajes: " + localStorage.getItem("productoTotal")
    }

}