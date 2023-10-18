const btnLogIng = document.getElementById('btnUserLog');

btnLogIng.addEventListener('click', (e) => {
    e.preventDefault();

    let errors = [];

    let inputEmail = document.getElementById('inputEmail'),
        inputPassword = document.getElementById('inputPassword');


    if (inputEmail.value.length === 0) {
        errors.push({
            input: "Correo",
            message: "El campo correo no puede estar vacío"
        });
    }

    if (inputPassword.value.length === 0) {
        errors.push({
            input: "Contraseña",
            message: "El campo contraseña no puede estar vacío"
        });
    }

    if (errors.length > 0) {
        // Construir un mensaje de error que enumere todos los problemas
        let errorMessage = errors.map(error => `${error.input}: ${error.message}`).join('\n');

        Swal.fire({
            icon: 'error',
            title: 'Errores en el formulario',
            text: errorMessage
        });
    }
});
