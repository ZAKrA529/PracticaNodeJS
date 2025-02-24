import { alerta } from "./tools/sweetalert2.js";
import { deleteProduct, getProducts, postProducts, updateProducts } from "./services/llamados.js";


const producto = document.getElementById("producto");
const marca = document.getElementById("marca");
const price = document.getElementById("price");
const stock = document.getElementById("stock");
const agregar = document.getElementById("content"); // Botón para registrar
const tablaBody = document.getElementById("tableBody"); // Cuerpo de la tabla
const edit = document.getElementsByClassName("edit");
const btnedit = document.getElementById("editar")




// Registrar producto al hacer clic
agregar.addEventListener("click", async function (event) {
    event.preventDefault(); // Evita recarga


    // Obtener valores y eliminar espacios extra
    const productoValor = producto.value.trim();
    const marcaValor = marca.value.trim();
    const priceValor = price.value.trim();
    const stockValor = stock.value.trim();


    // Validar campos vacíos
    if (!productoValor || !marcaValor || !priceValor || !stockValor) {
        alerta("Error!", "Todos los campos son obligatorios", "error", "Ok");
        return;
    }


    // Agregar producto a la base de datos
    const nuevoProducto = await postProducts(productoValor, marcaValor, priceValor, stockValor);


    if (nuevoProducto) {
        agregarProductoDOM(nuevoProducto); // Agregar al DOM
        alerta("Éxito!", "Producto registrado correctamente", "success", "Genial");


        // Limpiar los campos después de agregar
        producto.value = "";
        marca.value = "";
        price.value = "";
        stock.value = "";
    } else {
        alerta("Error!", "No se pudo registrar el producto", "error", "Ok");
    }
});


// Función para mostrar los productos almacenados
async function MostrarProductos() {
    const datos = await getProducts();
    limpiarTabla(); // Evita duplicados


    datos.forEach(producto => {
        agregarProductoDOM(producto);
    });


    //console.log(datos);
}


// Función para agregar un producto al DOM en la tabla
function agregarProductoDOM(producto) {
    console.log(producto);
    
    let tr = document.createElement("tr");
    tr.id=producto.id

    let tdProducto = document.createElement("td");
    tdProducto.innerText = producto.producto;

    let tdMarca = document.createElement("td");
    tdMarca.innerText = producto.marca;


    let tdPrecio = document.createElement("td");
    tdPrecio.innerText = ` ₡${producto.price}`;


    let tdStock = document.createElement("td");
    tdStock.innerText = producto.stock;


    let tdBotones = document.createElement("td");


    // Botón de eliminar
    let botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.style.backgroundColor = "red";
    botonEliminar.style.color = "white";
    botonEliminar.style.border = "none";
    botonEliminar.style.padding = "5px 10px";
    botonEliminar.style.cursor = "pointer";
    botonEliminar.style.borderRadius = "5px";


    botonEliminar.addEventListener("click", async () => {
        await deleteProduct(producto.id);
        tr.remove();
        alerta("Eliminar", "El producto fue eliminado de manera exitosa", "success", "Ok");
    });

    
    tdBotones.appendChild(botonEliminar);


    // Agregar celdas a la fila
    tr.appendChild(tdProducto);
    tr.appendChild(tdMarca);
    tr.appendChild(tdPrecio);
    tr.appendChild(tdStock);
    tr.appendChild(tdBotones);


    // Insertar el nuevo producto debajo de la barra de búsqueda
    tablaBody.insertBefore(tr, tablaBody.firstChild);
}

// Función para limpiar la tabla sin borrar los encabezados
function limpiarTabla() {
    tablaBody.innerHTML = ""; // Borra solo los datos, no los encabezados
}

//logica del botom que actualiza la informacion con el ID y los nuevos valores 
document.getElementById("editar").addEventListener("click", async function (event) {
    event.preventDefault(); // Evita recarga


    // Obtener valores y eliminar espacios extra
    const idProducto = document.getElementById("edit-id").value.trim();
    const productoValor = document.getElementById("edit-nombre").value.trim();
    const marcaValor = document.getElementById("edit-marca").value.trim();
    const priceValor = document.getElementById("edit-precio").value.trim();
    const stockValor = document.getElementById("edit-stock").value.trim();


    // Validar campos vacíos
    if (!idProducto || !productoValor || !marcaValor || !priceValor || !stockValor) {
        alerta("Error!", "Todos los campos son obligatorios", "error", "Ok");
        return;
    }


    // Actualizar producto en la base de datos
    const productoActualizado = await updateProducts(idProducto, productoValor, marcaValor, priceValor, stockValor);


    if (productoActualizado) {
        alerta("Éxito!", "Producto actualizado correctamente", "success", "Genial");


        // Limpiar los campos después de editar
        document.getElementById("edit-id").value = "";
        document.getElementById("edit-nombre").value = "";
        document.getElementById("edit-marca").value = "";
        document.getElementById("edit-precio").value = "";
        document.getElementById("edit-stock").value = "";
    } else {
        alerta("Error!", "No se pudo actualizar el producto", "error", "Ok");
    }
});


//funcion para filtrar los objetos




// Llamar a la función para cargar productos al inicio
MostrarProductos();
