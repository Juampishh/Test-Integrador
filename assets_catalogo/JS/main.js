const productos = [
    {
        id: "item 1",
        titulo: "item 1",
        imagen: "./assets_catalogo/IMG/item 1.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "item 2",
        titulo:"item 2",
        imagen:"./assets_catalogo/IMG/item 2.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "item 3",
        titulo: "item 3",
        imagen: "./assets_catalogo/IMG/item 3.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "item 4",
        titulo: "item 4",
        imagen: "./assets_catalogo/IMG/item 4.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "item 5",
        titulo: "item 5",
        imagen: "./assets_catalogo/IMG/item 5.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "item 6",
        titulo: "item 6",
        imagen: "./assets_catalogo/IMG/item 6.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "item 7",
        titulo: "item 7",
        imagen: "./assets_catalogo/IMG/item 7.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "item 8",
        titulo: "item 8",
        imagen: "./assets_catalogo/IMG/item 8.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "item 9",
        titulo: "item 9",
        imagen: "./assets_catalogo/IMG/item 9.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "item 10",
        titulo: "item 10",
        imagen: "./assets_catalogo/IMG/item 10.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    }
            
];

const contenedorProductos = document.querySelector('#contenedor-productos');
const botonesCategorias = document.querySelectorAll('.boton-categoria');
const tituloPrincipal = document.querySelector('#titulo-principal');
let botonesAgregar = document.querySelectorAll('.producto-agregar')
const numerito = document.querySelector('#numerito');

/*Funcion para cargar los productos en la seccion todos los productos*/

function cargarProductos(productosElegidos){


    contenedorProductos.innerHTML = "";

    productos.forEach(producto =>{

        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">${producto.precio}$</p>
                <button id="${producto.id}" class="producto-agregar">Agregar</button>
            </div>
        `
        contenedorProductos.append(div);
    })
    actualizasBotonesAgregar()
    
};

cargarProductos(productos);

/*Funcion para cambiar las categorias*/

botonesCategorias.forEach(boton =>{

    boton.addEventListener('click', (e) =>{

        botonesCategorias.forEach(boton => boton.classList.remove('active'))

        e.currentTarget.classList.add("active")

       if (e.currentTarget.id != "todos"){

        const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
        tituloPrincipal.innerText = productoCategoria.categoria.nombre;

        const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
        cargarProductos(productosBoton);

       }else{
        tituloPrincipal.innerText = "Todos los productos";
        cargarProductos(productos);
       }

    })
});


/*Funcion para obtener los botones agregar una vez halla sido cargada la pagina*/
function actualizasBotonesAgregar (){
    botonesAgregar = document.querySelectorAll('.producto-agregar');

    botonesAgregar.forEach(boton =>{
        boton.addEventListener('click', agregarAlCarrito);
    });

};




let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem('productos-en-carrito');




if(productosEnCarritoLS){

    productosEnCarrito = JSON.parse(productosEnCarritoLS)
    actualizarNumerito()

}else{
    productosEnCarrito = [];
}





/*Funcion para agregar elementos al carrito*/


function agregarAlCarrito (e){

    Toastify({
        text: "Se añadio el producto",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
          borderRadius: "2rem",
          letterSpacing: "2px",
          textTransform: "uppercase",
        },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)){
       const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
       productosEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito()
    
    /*Agregamos los elementos seleccionados al localstorage*/ 
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
};

function actualizarNumerito (){
    let nuevoNumerito = productosEnCarrito.reduce((acc,producto) => acc + producto.cantidad, 0)
    numerito.innerText = nuevoNumerito;
};






