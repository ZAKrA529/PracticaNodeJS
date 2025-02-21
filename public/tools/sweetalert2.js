export const alerta =(title, text, icon, confirmButtonText) => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText
    })
}
