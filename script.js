// ========== LISTA DE PRODUCTOS (los 6 que me diste) ==========
const productos = [
    { nombre: "Olla normal", precio: 100, tipo: "olla" },
    { nombre: "Olla gruesa", precio: 200, tipo: "olla" },
    { nombre: "Olla grande", precio: 300, tipo: "olla" },
    { nombre: "Olla mediana", precio: 250, tipo: "olla" },
    { nombre: "Bañador grande", precio: 350, tipo: "bañador" },
    { nombre: "Bañador pequeño", precio: 150, tipo: "bañador" }
];

// Variables globales
let productosActuales = [...productos]; // Copia de los productos (se modifica al buscar/ordenar)

// ========== FUNCIÓN PARA MOSTRAR PRODUCTOS ==========
function mostrarProductos() {
    const contenedor = document.getElementById("listaProductos");
    contenedor.innerHTML = ""; // Limpiar

    if (productosActuales.length === 0) {
        contenedor.innerHTML = '<div class="sin-resultados">?? No se encontraron productos. Prueba otra búsqueda.</div>';
        return;
    }

    productosActuales.forEach(producto => {
        const card = document.createElement("div");
        card.className = "producto-card";
        card.innerHTML = `
            <h3>?? ${producto.nombre}</h3>
            <p>Material: Aluminio de alta calidad</p>
            <p>Tipo: ${producto.tipo === "olla" ? "Olla" : "Bañador"}</p>
            <div class="precio">$${producto.precio}</div>
            <button class="btn-comprar" data-nombre="${producto.nombre}" data-precio="${producto.precio}">?? Agregar al carrito</button>
        `;
        contenedor.appendChild(card);
    });

    // Agregar eventos a los botones de compra
    document.querySelectorAll(".btn-comprar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const nombre = btn.getAttribute("data-nombre");
            const precio = btn.getAttribute("data-precio");
            alert(`? Agregaste ${nombre} por $${precio} al carrito. (Demo - tu pedido fue registrado)`);
        });
    });
}

// ========== FUNCIÓN PARA BUSCAR PRODUCTOS ==========
function buscarProductos() {
    const texto = document.getElementById("buscador").value.toLowerCase();
    
    if (texto === "") {
        // Si no hay texto, mostrar todos
        productosActuales = [...productos];
    } else {
        // Filtrar productos que incluyan el texto en el nombre
        productosActuales = productos.filter(p => p.nombre.toLowerCase().includes(texto));
    }
    
    mostrarProductos();
}

// ========== FUNCIÓN PARA ORDENAR POR PRECIO (menor a mayor) ==========
function ordenarPorPrecio() {
    productosActuales.sort((a, b) => a.precio - b.precio);
    mostrarProductos();
}

// ========== CONFIGURAR EVENTOS Y MOSTRAR TODO ==========
document.addEventListener("DOMContentLoaded", () => {
    // Mostrar productos al inicio (cuando se abre el catálogo)
    // Pero primero el catálogo está oculto, así que mostramos vacío
    
    // Evento del botón "VER CATÁLOGO"
    const btnCatalogo = document.getElementById("btnCatalogo");
    const seccionCatalogo = document.getElementById("catalogo");
    
    btnCatalogo.addEventListener("click", () => {
        // Mostrar el catálogo
        seccionCatalogo.classList.remove("oculto");
        // Desplazar suavemente hacia el catálogo
        seccionCatalogo.scrollIntoView({ behavior: "smooth" });
        
        // Cargar los productos la primera vez que se abre
        if (productosActuales.length > 0 && document.getElementById("listaProductos").innerHTML === "") {
            productosActuales = [...productos];
            mostrarProductos();
        } else {
            // Si ya hay productos mostrados, solo refrescar
            productosActuales = [...productos];
            mostrarProductos();
        }
    });
    
    // Evento del buscador (mientras escribe)
    const buscador = document.getElementById("buscador");
    buscador.addEventListener("keyup", buscarProductos);
    
    // Evento del botón de ordenar
    const btnOrdenar = document.getElementById("btnOrdenarPrecio");
    btnOrdenar.addEventListener("click", ordenarPorPrecio);
});