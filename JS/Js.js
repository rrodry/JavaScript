let size, productoTotal = 0, arrObj = JSON.parse(localStorage.getItem("arrObj")) || [], suma = 0, conSlider = document.getElementById("containerSlider"), imgSlider = [], sliderArrLocal = JSON.parse(localStorage.getItem("sliderArrLocal")) || [],
    btnEliminar, contImg = 0, arrProductos = JSON.parse(localStorage.getItem("productosHTML")) || [], btnProd = document.querySelectorAll('.ProductoDiv button'),
    interval = setInterval(() => {
        sliderFunction()
    }, 3000);
const
    divProductos = document.getElementById('divListAgregado'),
    preciosViajes = JSON.parse(localStorage.getItem("preciosViajes")) || {},
    btnSlider = document.querySelectorAll('.buttonSlider')
//Buttons Slider
for (const button of btnSlider) {
    button.addEventListener("click", () => sliderFunction(button))
}
//Btn AddProd
let addProduBtn = document.getElementById("btnAddProd")
addProduBtn.addEventListener("click", () => {
    const productoAAgregado = document.querySelectorAll('.divAgregarProducto')
    arrProductos = JSON.parse(localStorage.getItem("productosHTML")) || []
    indexP = 0
    number = parseInt(productoAAgregado[0].children[1].value)
    for (const value of productoAAgregado) {
        if (value.children[1].value != "") {
            if (indexP != productoAAgregado.length - 1) {
                arrProductos.push(value.children[1].value)
                value.children[1].value = ""
                indexP++
            } else {
                let fileImage = document.querySelector("#inpImagen")
                const readerP = new FileReader()
                readerP.addEventListener("load", () => {
                    if (formatP == "image/png" || formatP == "image/jpg" || formatP == "image/jpeg") {
                        arrProductos.push(readerP.result)
                        value.children[1].value = ""
                        localStorage.setItem("productosHTML", JSON.stringify(arrProductos))
                        document.getElementById("test2").innerHTML = ""
                        createHTML()
                        clima()
                        addRemoveProductHtml();
                        indexP++
                    } else {
                        swal({
                            title: "Formato de imagen invalido",
                            dangerMode: true
                        })
                        fileImage.value = ""
                    }
                })

                readerP.readAsDataURL(fileImage.files[0])
                formatP = fileImage.files[0].type
            }
        } else {
            swal({
                title: "Falta un dato a completar",
                dangerMode: true
            })
        }
    }
})

//Button Modal
let openProd = document.getElementById("liAddProduct")
openProd.addEventListener("click", openModal => {
    let modal = document.getElementsByClassName("containerModal")
    sliderArrLocal = JSON.parse(localStorage.getItem("sliderArrLocal"))
    const style = getComputedStyle(modal[0])
    if (style.display == "block" && modal[0].style.display == "block") {
        modal[0].style.display = "none"
        modal[0].style.opacity = "0"
        openProd.innerHTML = "Agregar/Eliminar Productos"
        document.getElementById("divImagenDelSlider").innerHTML = ""
        document.getElementById("eliminarProducto").innerHTML = ""
        window.location.reload()
    } else {
        modal[0].style.display = "block"
        modal[0].style.opacity = "1"
        openProd.innerHTML = "Cerrar"
        addRemoveProductHtml();
        addRemoveSlider();
        if (sliderArrLocal != 0) {
            let btnckeck = document.getElementById("btnDelSlider")
            btnckeck.addEventListener("click", () => removeSlider())
        }
    }
})

function addRemoveProductHtml() {
    let btn = document.createElement("button")
    dv = document.getElementsByClassName("eliminarProducto")
    dvEliminar = document.createElement("div")
    productos = document.querySelectorAll(".ProductoDiv")
    btn.id = "btnDelProd"
    btn.innerHTML = "Eliminar Producto"
    dvEliminar.className = "divEliminarProducto"
    dv[0].appendChild(dvEliminar)
    for (i = 0; i < productos.length; i++) {
        let input = document.createElement("input"),
            img = document.createElement("img"),
            imgHtml = document.querySelectorAll("#test")
        input.className = "inptAgregar"
        input.id = "chckDelProd"
        input.type = "checkbox"
        img.src = imgHtml[i].children[0].src
        dv[0].children[0].appendChild(input)
        dv[0].children[0].appendChild(img)
    }
    if (productos.length != 0) {
        dv[0].children[0].appendChild(btn)
        document.getElementById("btnDelProd").addEventListener("click", () => {
            let checkProd = document.querySelectorAll("#chckDelProd"), x = 0, ind = 0
            while (x < checkProd.length) {
                if (checkProd[x].checked) {
                    swal({
                        title: "Se elimino " + arrProductos[ind]
                    })
                    document.getElementById("test2").innerHTML = ""
                    document.getElementById("clima").innerHTML = ""
                    //Elimnar HTML
                    eliminarCarrito(arrProductos[ind])
                    arrProductos.splice(ind, 3)
                    localStorage.setItem("productosHTML", JSON.stringify(arrProductos))
                    //Eliminar del array
                    createHTML()
                    clima()
                    x++
                    ind + 3
                } else {
                    x++
                    ind += 3
                }
            }
            document.querySelector(".divEliminarProducto").innerHTML = ""
            addRemoveProductHtml()
        })
    }
}

function removeSlider() {
    arrDvDel = document.querySelectorAll(".check")
    for (i = 0; i < arrDvDel.length; i++) {
        if (arrDvDel[i].checked) {
            sliderArrLocal.splice(i, 1)
            localStorage.setItem("sliderArrLocal", JSON.stringify(sliderArrLocal))
            document.getElementById("slider").innerHTML = ""
            createSlider()
        }
    }
    document.getElementById("divImagenDelSlider").innerHTML = ""
    addRemoveSlider()
    if (sliderArrLocal != 0) {
        let btnckeck = document.getElementById("btnDelSlider")
        btnckeck.addEventListener("click", () => removeSlider())
    } else {
        clearInterval(interval)
    }
}

//btn Ir viaje
for (const key of btnProd) {
    key.addEventListener("click", () => verificarCarrito(key.parentNode.children[1].children[0]))
}

//btn Slider ADD
let btnAddSliderImg = document.getElementById("btnImagenSlider")
btnAddSliderImg.addEventListener("click", () => {
    saveImgaURL()
    sliderArrLocal = JSON.parse(localStorage.getItem("sliderArrLocal")) || []
    document.getElementById("inpImgSlider").value = ""
    if (sliderArrLocal != 0) {
        let btnckeck = document.getElementById("btnDelSlider")
        btnckeck.addEventListener("click", () => removeSlider())
    }
})

function saveImgaURL() {
    let input = document.querySelector("#inpImgSlider")
    const reader = new FileReader()

    reader.addEventListener("load", () => {
        if (format == "image/png" || format == "image/jpg" || format == "image/jpeg") {
            let vara = reader.result,
                sliderArrLocal = JSON.parse(localStorage.getItem("sliderArrLocal")) || []
            sliderArrLocal.push(vara)
            localStorage.setItem("sliderArrLocal", JSON.stringify(sliderArrLocal))
            sliderDv = document.getElementById("slider")
            dvSlider = document.createElement("div")
            dvSlider.className = "sliderImg inactive"
            sliderDv.appendChild(dvSlider)
            imgSliderCreate = document.createElement("img")
            imgSliderCreate.className = "img"
            imgSliderCreate.src = sliderArrLocal[sliderArrLocal.length - 1]
            sliderArrLocal = JSON.parse(localStorage.getItem("sliderArrLocal")) || []
            document.getElementById("slider").lastChild.appendChild(imgSliderCreate)
            document.getElementById("divImagenDelSlider").innerHTML = ""
            addRemoveSlider()
            let btnckeck = document.getElementById("btnDelSlider")
            btnckeck.addEventListener("click", () => removeSlider())
            interval = setInterval(() => {
                sliderFunction()
            }, 3000);
        } else {
            swal({
                title: "Formato Invalido",
                dangerMode: true
            })
        }
    })

    if (input.files[0]) {
        reader.readAsDataURL(input.files[0])
        format = input.files[0].type
    } else {
        swal({
            title: "Imagen no puede estar vacia",
            dangerMode: true
        })
        document.getElementById("divImagenDelSlider").innerHTML = ""
        addRemoveSlider()
    }
}

//Create HTML Slider
function createSlider() {
    slider = document.getElementById("slider")
    for (x = 0; x < sliderArrLocal.length; x++) {
        dv = document.createElement("div")
        if (x == 0) {
            dv.className = "sliderImg active"
        } else {
            dv.className = "sliderImg inactive"
        }
        img = document.createElement("img")
        img.className = "img"
        img.src = sliderArrLocal[x]
        dv.appendChild(img)
        slider.appendChild(dv)
    }
}

//AddModalRemove
function addRemoveSlider() {
    let dvModalSlider = document.getElementById("divImagenDelSlider")
    sliderArrLocal = JSON.parse(localStorage.getItem("sliderArrLocal")) || []
    for (i = 0; i < sliderArrLocal.length; i++) {
        if (sliderArrLocal != 0) {
            let inpModalSlider = document.createElement("input"),
                imgSliderModal = document.createElement("img")

            inpModalSlider.className = "check"
            inpModalSlider.type = "checkbox"

            imgSliderModal.src = sliderArrLocal[i]
            dvModalSlider.appendChild(inpModalSlider)
            dvModalSlider.appendChild(imgSliderModal)
        }
    }
    if (sliderArrLocal != 0) {
        btnDelSlider = document.createElement("button")
        btnDelSlider.id = "btnDelSlider"
        btnDelSlider.innerHTML = "Elimnar Imagen del Slider"
        document.getElementById("divImagenDelSlider").appendChild(btnDelSlider)
    }
}

createSlider()
//createHTML
createHTML()
//crear Clima
clima()
function createHTML() {
    for (i = 0; arrProductos.length > i; i += 3) {
        divContainer = document.querySelectorAll(".containerProductos")
        let div = document.createElement("div"),
            img = document.createElement("img"),
            p = document.createElement("p"),
            a = document.createElement("a"),
            button = document.createElement("button"),
            input = document.createElement("input")
        date = document.createElement("input")
        div.className = "ProductoDiv"
        img.src = arrProductos[i + 2]
        div.appendChild(img)
        p.innerText = "Viaje a "
        a.text = arrProductos[i]
        p.appendChild(a)
        a = document.createElement("a")
        a.text = arrProductos[i + 1]
        p.innerHTML += " $"
        p.appendChild(a)
        div.appendChild(p)
        input.type = "text"
        input.placeholder = "Pasajeros"
        div.appendChild(input)
        button.innerText = "Ir de viaje"
        div.appendChild(button)
        date.type = "date"
        div.appendChild(date)
        div.id = "test"
        divContainer[0].appendChild(div)
    }
    btnProd = document.querySelectorAll('.ProductoDiv button')
    for (const key of btnProd) {
        key.addEventListener("click", () => verificarCarrito(key.parentNode.children[1].children[0]))
    }
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
    let producto = document.getElementById(lugar), total = document.getElementById("TotalDiv");
    for (i = 0; i < arrObj.length; i++) {
        if (lugar == arrObj[i]) {
            arrObj.splice(i, 3);
            delete preciosViajes[lugar]
        }
    } if (total != undefined) {
        if (arrObj.length == 0) {
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
            let suma = 0;
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
}
function verificarCarrito(travel) {
    let lugar = travel.text, precio = travel.parentNode.children[1].text, cantProducto = parseInt(travel.parentNode.parentNode.children[2].value),
        size = Object.keys(preciosViajes)
    parentimg = travel.parentNode.parentNode.children[0].src
    productoTotal = 0, datelocal = moment().format("YYYY/MM/DD")
    if (!isNaN(cantProducto) && travel.parentNode.parentNode.children[4].value != "" && moment(travel.parentNode.parentNode.children[4].value).format("YYYY/MM/DD") > datelocal) {
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
        date = moment(travel.parentNode.parentNode.children[4].value);
        swal({
            title: "Producto Agregado",
            text: arrObj[0] + " x " + cantProducto + "  para el dia " + date.format("DD/MM/YYYY"),
            button: "Aceptar"
        })
    } else {
        swal({
            title: "Falta un dato"
        })
    }
    travel.parentNode.parentNode.children[4].value = ""
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
            button.addEventListener("click", () => {
                swal({
                    title: "Estas seguro que deseas eliminar " + lugar + "?",
                    icon: "warning",
                    button: true,
                    dangerMode: true
                }).then((willdelete) => {
                    if (willdelete) {
                        eliminarCarrito(lugar)
                    }
                })
            }
            )
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

function clima() {
    let key = "f86a30d9617d47f594b182025223003",
        city = document.getElementById("inpViaje").value,
        viajesHtml = document.querySelectorAll(".ProductoDiv")
    if (city == "") {
        document.getElementById("clima").innerHTML = ""
        for (i = 0; i < viajesHtml.length; i++) {
            city = viajesHtml[i].children[1].children[0].innerHTML
            climaCreate(city)
        }
    } else {
        city = document.getElementById("inpViaje").value
        climaCreate(city)
    }
    function climaCreate(city) {
        indexUl = 0
        fetch("https://api.weatherapi.com/v1/forecast.json?key=" + key + "&q=" + city + "&days=3&aqi=no&alerts=no&lang=es")
            .then(
                (res) => res.json())
            .then(
                (data) => {
                    let dvclima = document.getElementById("clima"),
                        ul = document.createElement("ul")
                    ul.id = city
                    dvclima.appendChild(ul)
                    for (const key of data.forecast.forecastday) {
                        let maxTemp = key.day.maxtemp_c,
                            sensTerm = key.day.avgtemp_c,
                            estado = key.day.condition.text,
                            icon = key.day.condition.icon

                        for (i = 0; i < 4; i++) {
                            let li = document.createElement("li"), p = document.createElement("p")
                            if (i == 0) {
                                let date = moment(key.date).format(' DD/MM/YY ')
                                p.innerHTML = city.toUpperCase() + " -  " + data.location.region.toUpperCase() + date
                                li.appendChild(p)
                            }
                            if (i == 1) {
                                img = document.createElement("img")
                                li.appendChild(img)
                                li.children[0].src = icon
                            }
                            if (i == 2) {
                                p.innerHTML = "Sens.T Maxima: " + sensTerm + "??C"
                                li.appendChild(p)
                            }
                            if (i == 3) {
                                p.innerHTML = "Temp. Max: " + maxTemp + "??C"
                                li.appendChild(p)
                            }
                            if (i == 4) {
                                p.innerHTML = estado
                                li.appendChild(p)
                            }
                            dvclima.children[indexUl].appendChild(li)
                        }
                    }
                    indexUl++
                }
            )
    }
}

function sliderFunction(button) {
    const sliderObj = document.querySelectorAll('.sliderImg')
    if (button == undefined || button.className == "buttonSlider") {
        sliderObj[contImg].animate([
            { transform: 'translateX(0px)' },
            { transform: 'translateX(-1500px)' },
            { transition: 'all 1s' }
        ], {
            duration: 1000
        })
        setTimeout(() => {
            if (contImg == sliderObj.length - 1) {
                contImg = 0
                sliderObj[contImg].className = "sliderImg active"
                sliderObj[contImg].animate([
                    { transform: 'translateX(1500px)' },
                    { transform: 'translateX(0px)' },
                    { transition: 'all 1s' }

                ], {
                    duration: 1000
                })
                if (sliderObj.length > 1) {
                    sliderObj[sliderObj.length - 1].className = "sliderImg inactive"
                }
            } else {
                sliderObj[contImg].className = "sliderImg inactive"
                sliderObj[contImg + 1].className = "sliderImg active"
                sliderObj[contImg + 1].animate([
                    { transform: 'translateX(1500px)' },
                    { transform: 'translateX(0px)' },
                    { transition: 'all 1s' }

                ], {
                    duration: 1000
                })
                contImg++
            }
        }, 500);
    } else {
        sliderObj[contImg].animate([
            { transform: 'translateX(0px)' },
            { transform: 'translateX(1500px)' },
            { transition: 'all 1s' }
        ], {
            duration: 1000
        })
        setTimeout(() => {
            if (contImg == 0) {
                sliderObj[contImg].className = "sliderImg inactive"
                contImg = sliderObj.length - 1
                sliderObj[contImg].className = "sliderImg active"
                sliderObj[contImg].animate([
                    { transform: 'translateX(-1500px)' },
                    { transform: 'translateX(0px)' },
                    { transition: 'all 1s' }

                ], {
                    duration: 1000
                })
            } else {
                sliderObj[contImg].className = "sliderImg inactive"
                sliderObj[contImg - 1].className = "sliderImg active"
                sliderObj[contImg - 1].animate([
                    { transform: 'translateX(-1500px)' },
                    { transform: 'translateX(0px)' },
                    { transition: 'all 1s' }

                ], {
                    duration: 1000
                })
                contImg--
            }
        }, 500);
    }
    if (button != undefined) {
        if (button.className == "buttonSlider" || button.className == "buttonSlider left") {
            clearInterval(interval)
            interval = setInterval(() => {
                sliderFunction()
            }, 3000);
        }
    }
}

