import { alerta } from "./tools/sweetalert2.js";
import { postUsers, getUsers, updateUsers, deleteUser } from "./services/llamados.js";

const producto = document.getElementById("producto");
const marca = document.getElementById("marca");
const price = document.getElementById("price");
const stock = document.getElementById("stock");

const agregar = document.getElementById("content");
const mostrar = document.getElementById("mostrar");

//  Función para agregar usuarios y reflejarlos en la tabla inmediatamente
agregar.addEventListener("click", async function (event) {
    event.preventDefault(); // Previene recarga automática

    // Obtener valores y eliminar espacios extra
    const productoValor = producto.value.trim();
    const marcaValor = marca.value.trim();
    const priceValor = price.value.trim();
    const stockValor = stock.value.trim();

    // Validar que los campos no estén vacíos
    if (!productoValor || !marcaValor || !priceValor || !stockValor) {
        alerta("Error!", "Todos los campos son obligatorios", "error", "Ok");
        return;
    }

    // Agregar usuario a la base de datos
    const nuevoUsuario = await postUsers(productoValor, marcaValor, priceValor, stockValor);

    // Verificar si se creó correctamente
    if (nuevoUsuario) {
        // Agregar el usuario a la tabla sin recargar la página
        agregarUsuarioDOM(nuevoUsuario);
        alerta("Éxito!", "Usuario registrado correctamente", "success", "Genial");

        // Limpiar los campos después de agregar el usuario
        producto.value = "";
        marca.value = "";
        price.value = "";
        stock.value = "";
    } else {
        alerta("Error!", "No se pudo registrar el usuario", "error", "Ok");
    }
});

//  Función para mostrar los productos almacenados en el servidor
async function MostrarUsuarios() {
    const datos = await getUsers();
    mostrar.innerHTML = ""; // Limpiar contenido antes de mostrar los datos

    datos.forEach(usuario => {
        agregarUsuarioDOM(usuario);
    });

    console.log(datos);
}

//  Función para agregar un usuario a la tabla del DOM
function agregarUsuarioDOM(usuario) {
    let tr = document.createElement("tr");

    let tdDatos = document.createElement("td");
    tdDatos.innerText = `${usuario.id} - ${usuario.producto} - ${usuario.marca} - ${usuario.price} - ${usuario.stock}`;

    let tdBotones = document.createElement("td");

    // Botón de editar
    let btnEditar = document.createElement("button");
    btnEditar.innerText = "Editar";
    btnEditar.addEventListener("click", () => {
        //  Aquí va toda la pinche logística del boton de editar.
        //    - Puedes abrir un modal o formulario dentro de la misma página.
        //    - Puedes usar `input.value = usuario.producto` para prellenar los campos.
        //    - Luego, puedes llamar a `updateUsers(id, nuevosValores)` para actualizarlo en la base de datos.
        //    - Finalmente, actualiza la fila en la tabla sin recargar la página.
    });

    // Botón de eliminar


    tr.appendChild(tdDatos);
    tr.appendChild(tdBotones);
    mostrar.appendChild(tr);
}

// Llamar a la función para cargar usuarios al inicio
MostrarUsuarios();

export { MostrarUsuarios };
