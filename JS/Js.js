let size, productoTotal = 0, arrObj = JSON.parse(localStorage.getItem("arrObj")) || [], suma = 0, conSlider = document.getElementById("containerSlider"), imgSlider = [],
    btnEliminar, contImg = 0,arrProductos = JSON.parse(localStorage.getItem("productosHTML")) || [];
const
    divProductos = document.getElementById('divListAgregado'),
    preciosViajes = JSON.parse(localStorage.getItem("preciosViajes")) || {},
    btnSlider = document.querySelectorAll('.buttonSlider')


//Buttons
for (const button of btnSlider) {
    button.addEventListener("click", () => slider(button))
}
let addProduBtn = document.getElementById("btnAddProd")
addProduBtn.addEventListener("click", () => {
    const productoAAgregado = document.querySelectorAll('.divAgregarProducto')
    for (const value of productoAAgregado) {
        arrProductos.push(value.children[1].value)
    }
    localStorage.setItem("productosHTML",JSON.stringify(arrProductos))
    createHTML()
} )
let openProd = document.getElementById("liAddProduct")
openProd.addEventListener("click", openModal => {
    let modal = document.getElementsByClassName("containerModal")
    const style = getComputedStyle(modal[0])
    if (style.display == "flex" && modal[0].style.display == "flex" ){
        modal[0].style.display = "none"
        modal[0].style.opacity = "0"

    }else{
        modal[0].style.display = "flex"
        modal[0].style.opacity = "1"
    }
})

//createHTML
function createHTML(){
for(i=0;arrProductos.length>i;i+=3){
    divContainer = document.querySelectorAll(".containerProductos")
    let div = document.createElement("div"),
    img = document.createElement("img"),
    p = document.createElement("p"),
    a = document.createElement("a"),
    button = document.createElement("button"),
    input = document.createElement("input")
    date = document.createElement("input")
        div.className = "ProductoDiv"
        img.src = arrProductos[i+2]
        imgPath = img.src.split('file:///C:/fakepath/')
        img.src = '../img/'+ imgPath[1]
        div.appendChild(img)
        p.innerText = "Viaje a "
        a.text = arrProductos[i]
        p.appendChild(a)
        a = document.createElement("a")
        a.text = arrProductos[i+1]
        p.innerHTML += " $"
        p.appendChild(a)
        div.appendChild(p)
        input.type = "text"
        input.placeholder = "Pasajeros"
        div.appendChild(input)
        button.innerText="Ir de viaje"
        div.appendChild(button)
        date.type = "date"
        div.appendChild(date)
        divContainer[0].appendChild(div)
}}
const btn = document.querySelectorAll('.ProductoDiv button')
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
    let producto = document.getElementById(lugar), total = document.getElementById("TotalDiv")
    for (i = 0; i <= arrObj.length; i++) {
        if (lugar == arrObj[i]) {
            arrObj.splice(i, 3);
            delete preciosViajes[lugar]
        }
    } if (arrObj.length == 0) {
        total.style.animation = "opacitOut 1s"
        total.style.animationFillMode = "running"
        producto.style.animation = "opacitOut 1s"
        producto.style.animationFillMode = "running"
        localStorage.removeItem("arrObj")
        localStorage.removeItem("productoTotal")
        localStorage.removeItem("preciosViajes")
        setTimeout(() => {
            producto.remove()
            total.remove()
        }, 500)
        delete preciosViajes
    } else {
        let suma = 0
        for (i = 0; i <= arrObj.length; i++) {
            if (!isNaN(arrObj[i])) {
                suma += arrObj[i]
            }
        }
        localStorage.setItem("arrObj", JSON.stringify(arrObj))
        localStorage.setItem("productoTotal", JSON.stringify(suma))
        localStorage.setItem("preciosViajes", JSON.stringify(preciosViajes))
        producto.remove()
        divProductos.parentNode.children[1].textContent = "Total de viajes: " + localStorage.getItem("productoTotal")
    }
}
function verificarCarrito(travel) {
    let lugar = travel.text, precio = travel.parentNode.children[1].text, cantProducto = parseInt(travel.parentNode.parentNode.children[2].value),
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
        let div = document.createElement('div'), p = document.createElement('p'), a = document.createElement('a')
        div.id = "TotalDiv"
        div.className = "divTotal"
        a.id = "TotalNumber"
        divProductos.parentNode.appendChild(div).appendChild(p).appendChild(a).innerHTML = "Total de viajes: $" + localStorage.getItem("productoTotal")
    } else {
        divProductos.parentNode.children[1].innerHTML = "Total de viajes: " + localStorage.getItem("productoTotal")
    }

}
//SliderInterval
/*setInterval(() => {
    const sliderObj = document.querySelectorAll('.sliderImg')
        sliderObj[contImg].animate([
            {transform:'translateX(0px)'},
            {transform:'translateX(-1500px)'},
            {transition: 'all 1s'}
            
        ],{
            duration: 1000
        })
        setTimeout(() => {
            if(contImg == sliderObj.length-1){
                contImg = 0
                sliderObj[contImg].className = "sliderImg active"
                sliderObj[contImg].animate([
                    {transform:'translateX(1500px)'},
                    {transform:'translateX(0px)'},
                    {transition: 'all 1s'}
                    
                ],{
                    duration: 1000
                })
                sliderObj[sliderObj.length-1].className = "sliderImg inactive"
            }else{
            sliderObj[contImg].className = "sliderImg inactive"
            sliderObj[contImg+1].className = "sliderImg active"
            sliderObj[contImg+1].animate([
                {transform:'translateX(1500px)'},
                {transform:'translateX(0px)'},
                {transition: 'all 1s'}
                
            ],{
                duration: 1000
            })
            contImg++
        }
        }, 500);
        
    }
, 5000);
*/