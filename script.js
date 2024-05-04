// Defino mis camisetas de fútbol
let listaProductos = [
    {id: 1, equipo: "Real Madrid", precio: 50, stock: 3, rutaImagen: "real-madrid.webp" },
    {id: 2, equipo: "Barcelona", precio: 45, stock: 8, rutaImagen: "barcelona-fc.webp" },
    {id: 3, equipo: "Manchester United", precio: 40, stock: 12, rutaImagen: "man-united.jpeg" },
    {id: 4, equipo: "Juventus", precio: 55, stock: 6, rutaImagen: "juventus.png" },
    {id: 5, equipo: "Bayern Munich", precio: 60, stock: 7, rutaImagen: "bayern.webp" },
    {id: 6, equipo: "Liverpool", precio: 50, stock: 1, rutaImagen: "liverpool.webp" },
    {id: 7, equipo: "Paris Saint-Germain", precio: 55, stock: 5, rutaImagen: "psg.jpeg" },
    {id: 8, equipo: "Manchester City", precio: 45, stock: 10, rutaImagen: "man-city.webp" }
];

// Variables
const contenedorProductos = document.getElementById("contenedorProductos");
const listaCarrito = document.getElementById("listaCarrito");
let carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
    const producto = listaProductos.find(item => item.id === id);
    const nuevoCarrito = [...carrito, producto]; // Creamos una nueva copia del carrito añadiendo el nuevo producto
    carrito = nuevoCarrito; // Actualizamos la referencia del carrito
    mostrarCarrito();
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    listaCarrito.innerHTML = "";
    carrito.forEach(({ equipo }) => { // Desestructuración aquí
        const li = document.createElement("li");
        li.textContent = equipo; // Usamos la propiedad desestructurada directamente
        listaCarrito.appendChild(li);
    });
}

// Creando las tarjetas del producto
function crearTarjetasDeProductos(productos) {
    contenedorProductos.innerHTML = ""; // Limpiamos el contenedor antes de agregar las tarjetas
    productos.forEach(producto => {
        const tarjetaProducto = document.createElement("div");
        tarjetaProducto.innerHTML = `
            <img src="./camisetas/${producto.rutaImagen}" />
            <h3>${producto.equipo}</h3>
            <h4>Precio: ${producto.precio}</h4>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        contenedorProductos.appendChild(tarjetaProducto);
    });
}

// Función para filtrar productos por nombre
function filtrarProductos() {
    const textoBusqueda = document.getElementById("buscador").value.toLowerCase();
    const productosFiltrados = listaProductos.filter(producto => producto.equipo.toLowerCase().includes(textoBusqueda));
    crearTarjetasDeProductos(productosFiltrados);
}

// Escucha el evento 'input' en el campo de búsqueda
document.getElementById("buscador").addEventListener("input", filtrarProductos);


// Llamamos a la función para crear las tarjetas de productos al cargar la página
window.onload = function() {
    crearTarjetasDeProductos(listaProductos);
};



/*
// Objeto carrito de compras
const carrito = {
    camisetas: [],
    total: 0
};

// Función para filtrar camisetas por precio igual o inferior a cierto valor
function filtrarPorPrecioMaximo(precioMaximo) {
    return camisetas.filter(camiseta => camiseta.precio <= precioMaximo);
}

// Función para mostrar la información de los objetos
function mostrarInfoCamisetas() {
    let mensaje = "Ingrese el equipo que desea:\n\n";
    camisetas.forEach((camiseta) => {
        mensaje += `${camiseta.equipo} - $${camiseta.precio} - Stock: ${camiseta.stock}\n`;
    });
    return mensaje;
}

// Función para agregar camiseta al carrito
function agregarAlCarrito(equipo, cantidad) {
    const equipoLowerCase = equipo.toLowerCase(); // Convertir entrada del usuario a minúsculas

    const camisetaEnStock = camisetas.find(item => item.equipo.toLowerCase() === equipoLowerCase);

    if (camisetaEnStock && camisetaEnStock.stock >= cantidad) {
        carrito.camisetas.push({ equipo: camisetaEnStock.equipo, precio: camisetaEnStock.precio, cantidad });
        camisetaEnStock.stock -= cantidad;
        alert(`¡Camiseta del ${camisetaEnStock.equipo} agregada al carrito!`);
    } else if (camisetaEnStock) {
        alert(`Lo sentimos, la camiseta del ${camisetaEnStock.equipo} no está disponible en la cantidad solicitada.`);
    } else {
        alert(`Lo sentimos, la opción "${equipo}" no está disponible en este momento.`);
    }
}

// Función para calcular el total de la compra
function calcularTotal() {
    carrito.total = carrito.camisetas.reduce((total, camiseta) => total + (camiseta.precio * camiseta.cantidad), 0);
}

// Función para procesar el pago
function procesarPago() {
    calcularTotal();
    const confirmacion = confirm(`El total de la compra es $${carrito.total}. ¿Desea proceder con el pago?`);

    if (confirmacion) {
        const nombre = prompt("Ingrese su nombre:");
        const tarjeta = prompt("Ingrese el número de su tarjeta de crédito:");

        if (nombre && tarjeta) {
            alert(`¡Gracias por su compra, ${nombre}! El pago de $${carrito.total} ha sido procesado con éxito.`);
        } else {
            alert("Por favor, complete todos los campos para procesar el pago.");
        }
    } else {
        alert("¡Gracias por visitarnos! Esperamos verte de nuevo pronto.");
    }
}

// Interfaz de usuario
function iniciarSimulador() {
    let continuar = true;

    while (continuar) {
        const opcion = prompt(`Seleccione una opción:
        1. Agregar una camiseta al carrito
        2. Proceder al pago
        3. Salir`);

        switch (opcion) {
            case "1":
                const equipo = prompt(mostrarInfoCamisetas());
                const camisetaEnStock = camisetas.find(item => item.equipo.toLowerCase() === equipo.toLowerCase());

                if (camisetaEnStock && camisetaEnStock.stock >= 1) {
                    const cantidad = parseInt(prompt("Ingrese la cantidad:"));

                    if (!cantidad || cantidad <= 0) {
                        alert("Por favor, ingrese una cantidad válida.");
                        continue;
                    }

                    agregarAlCarrito(equipo, cantidad);
                } else if (camisetaEnStock) {
                    alert(`Lo sentimos, la camiseta del ${camisetaEnStock.equipo} no está disponible en la cantidad solicitada.`);
                } else {
                    alert(`Lo sentimos, la opción "${equipo}" no está disponible en este momento.`);
                }
                break;
            case "2":
                procesarPago();
                continuar = false;
                break;
            case "3":
                alert("¡Gracias por visitarnos! Hasta luego.");
                continuar = false;
                break;
            default:
                alert("Por favor, seleccione una opción válida.");
        }
    }
}

// Iniciar el simulador
iniciarSimulador();
*/