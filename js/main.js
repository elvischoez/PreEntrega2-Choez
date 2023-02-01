const BBDD = [
    {
        "id": 1,
        "nombre": "Tomate",
        "img": "./assets/img/tomate.jpg",
        "precio": 500,
        "cantidad":1
    },
    {
        "id": 2,
        "nombre": "Morrones",
        "img": "./assets/img/morron.jpg",
        "precio": 625,
        "cantidad":1
    },
    {
        "id": 3,
        "nombre": "Naranjas",
        "img": "./assets/img/naranja.jpg",
        "precio": 380,
        "cantidad":1
    },
    {
        "id": 4,
        "nombre": "Lechuga",
        "img": "./assets/img/lechuga.jpg",
        "precio": 300,
        "cantidad":1
    },
    {
        "id": 5,
        "nombre": "Pepino",
        "img": "./assets/img/pepino.jpg",
        "precio": 250,
        "cantidad":1
    },
    {
        "id": 6,
        "nombre": "Mandarina",
        "img": "./assets/img/mandarina.jpg",
        "precio": 300,
        "cantidad":1
    },
    {
        "id": 7,
        "nombre": "Zanahoria",
        "img": "./assets/img/zanahoria.jpg",
        "precio": 450,
        "cantidad":1
    },
    {
        "id": 8,
        "nombre": "Remolacha",
        "img": "./assets/img/remolacha.jpg",
        "precio": 150,
        "cantidad":1
    },
    {
        "id": 9,
        "nombre": "limones",
        "img": "./assets/img/limon.jpg",
        "precio": 200,
        "cantidad":1
    },
    {
        "id": 10,
        "nombre": "Manzana",
        "img": "./assets/img/manzana.jpg",
        "precio": 600,
        "cantidad":1
    }
]


const carrito = [];

/* const icon = document.getElementById('openCar');
console.log(icon);

if(carrito.length > 0){

    // Mostrame el modal

    const modal = document.getElementById('exampleModal');

    modal.style.display = 'block';
}else {

    // No me muestres el modal
    modal.style.display = 'none';
}
 */
function renderizarProductos(){

    const tienda = document.getElementById('tienda');  

    // CREACION DE BOTONES DE FILTRO
    const btnFiltros = [
        'Mayor precio', 
        'Menor precio'];

    // Crear botones en el html desde el array btnFiltros

    const divContainer = document.createElement('div');
    divContainer.classList.add('container', 'text-center');

    btnFiltros.forEach((btn)=> {
        
        const boton = document.createElement('button');
        boton.textContent = btn;
        boton.classList.add('btn', 'btn-primary', 'm-2');

        tienda.appendChild(boton);
    })

    // Creacion
    const btnMayorPrecio = document.querySelector('button:nth-child(1)');
    btnMayorPrecio.addEventListener('click', ()=>{
        
        const product = BBDD.sort((a,b)=> b.precio - a.precio);

        console.log(product);

        tienda.innerHTML = '';

        product.forEach((e)=>{
            
            console.log(e);
            const div = document.createElement('div');

            div.classList.add('col-12');
            div.classList.add('col-md-4');
            div.classList.add('mb-5');
            div.classList.add('d-flex');
            div.classList.add('justify-content-center');

            div.innerHTML = `
            <div class="card text-dark" style="width: 18rem;">
            <img class="card-img-top" src="${e.img}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${e.nombre}</h5>
                <p class="card-text">El precio es por kilo.</p>
                <p>${e.precio}$</p>
                <button class="btn btn-primary" id="${e.id}">Añadir al carrito</button>
            </div>
            </div>
        `
            // addEventListener para cada boton
            div.querySelector('button').addEventListener('click', ()=>{
                agregarProductosAlCarrito(e.id);
            
            })

            tienda.appendChild(div);
        })

    })



    BBDD.forEach((p)=> {
        
        let producto = document.createElement('div');
        producto.classList.add('col-12');
        producto.classList.add('col-md-4');
        producto.classList.add('mb-5');
        producto.classList.add('d-flex');
        producto.classList.add('justify-content-center');

        producto.innerHTML = `
        <div class="card text-dark" style="width: 18rem;">
            <img class="card-img-top" src="${p.img}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${p.nombre}</h5>
                <p class="card-text">El precio es por kilo.</p>
                <p>${p.precio}$</p>
                <button class="btn btn-primary" id="${p.id}">Añadir al carrito</button>
            </div>
        </div>
        `

        tienda.appendChild(producto);

        producto.querySelector('button').addEventListener('click', ()=>{
            
            agregarProductosAlCarrito(p.id);
            
        })

    })

}

renderizarProductos();

function agregarProductosAlCarrito(id){
    
    let producto = BBDD.find(producto => producto.id === id);

    let productoEnCarrito = carrito.find(producto => producto.id === id);

    if(productoEnCarrito){
        
        productoEnCarrito.cantidad++;

        console.log(carrito);

        alert(`La cantidad del producto ${producto.nombre} fue modificada`);

    }else {
        
        producto.cantidad = 1;

        carrito.push(producto);

        console.log(carrito);

        alert('Producto agregado correctamente al carrito')
    }

    renderizarCarrito();
    calcularTotal();
}


function renderizarCarrito(){

    const d = document;
    let carritoHTML = d.querySelector('#carrito');

    carritoHTML.innerHTML = '';

    carrito.forEach((p, index)=> {
    
        let producto = document.createElement('div');
        producto.classList.add('col-12');
        producto.classList.add('col-md-4');
        producto.classList.add('mb-5');
        producto.classList.add('d-flex');
        producto.classList.add('justify-content-center');

        producto.innerHTML = `
        
        <div class="card text-dark" style="width: 18rem;">
            <img class="card-img-top" src="${p.img}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${p.nombre}</h5>
                <p>${p.precio}$</p>
                <p>Cantidad: ${p.cantidad}</p>
                <button class="btn btn-danger">Eliminar</button>
            </div>
        </div>
        `

        producto.querySelector('button').addEventListener('click', ()=>{
        
            eliminarProductoDelCarrito(index)
        })

        carritoHTML.appendChild(producto);
    })
}

function eliminarProductoDelCarrito(indice){

    carrito[indice].cantidad--;
    alert(`La cantidad del producto ${carrito[indice].nombre} disminuyo`);

    if(carrito[indice].cantidad === 0){

        carrito.splice(indice,1);
        alert('El producto fue eliminado del carrito');
    }

    renderizarCarrito();
    calcularTotal()
}

function calcularTotal(){

    // Concepto de acumulador
    let total = 0;

    carrito.forEach((p)=>{
    
        total += p.precio * p.cantidad;
    })

    console.log(total);

    const t = document.getElementById('total');

    t.innerHTML = `<h5>${total}$</h5>`

}