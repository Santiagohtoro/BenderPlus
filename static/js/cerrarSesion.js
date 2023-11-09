const btnCerrar = document.getElementById('userIcon');

btnCerrar.addEventListener('click', () => {
    Swal.fire({
        icon: 'warning',
        title: 'Cerrar Sesion',
        text: '¿Desea cerrar sesión?',
        //Cancelacion
        showCancelButton: true,
        cancelButtonText: "No, cancelar!",
        cancelButtonColor: "#d33",
        //Confirmacion
        showConfirmButton: true,
        confirmButtonText: "Si, hazlo!",
        confirmButtonColor: "#3085d6",
    }).then((result) => {
        if (result.isConfirmed) {
            sessionStorage.removeItem('user_uid');
            location.reload();
        }
    });
});