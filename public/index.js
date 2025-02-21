import { postUsers, getUsers, updateUsers, deleteUser } from "./services/llamados.js";


const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const edad = document.getElementById("edad");
const email = document.getElementById("email");
const agregar = document.getElementById("content");
const mostrar = document.getElementById("mostrar");
const password = document.getElementById("password")
const edit = document.getElementById("editar")






//Esta funcion crea usuarios y los almacena en el db.JSON
agregar.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
       
        // Recarga la página y realiza la acción de enviar los datos
        location.reload();
        postUsers(nombre.value, apellido.value, edad.value, email.value, password.value);
    }
});








//agregando un boton que edite los usuarios almacenados en el db.JSON
edit.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto
    //logistica de identificacion y edicion del usuario






    updateUsers(nombre.value,apellido.value,edad.value,)
})






//Funcion asincronica que crea un h1 con los datos almacenados en el db.JSON
async function MostrarUsuarios() {
    const datos = await getUsers()
   
    for (let index = 0; index < datos.length; index++) {


        let h1 = document.createElement("h1")
        h1.innerText= datos[index].nombre + "--"+ datos[index].apellido+"--"+datos[index].edad+"--"+datos[index].email  
        mostrar.appendChild(h1)
       
    }


    console.log(datos)
}
MostrarUsuarios();