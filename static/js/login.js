//Login Firebase
const btnLogIng = document.getElementById('btnUserLog');
const auth = firebase.auth();

const login = () => {

    const LoginCorreo = document.getElementById('LoginInputEmail').value,
        LoginPassword = document.getElementById('LoginInputPassword').value;

    auth.signInWithEmailAndPassword(LoginCorreo, LoginPassword)
        .then(() => {
            // Inicio de sesión exitoso, puedes redirigir o realizar otras acciones aquí
            let user = auth.currentUser;
            window.location.href = '../index.html'; // Redirige a la página de inicio, por ejemplo
        })
        .catch((error) => {
            // Hubo un error en el inicio de sesión, maneja los errores aquí
            const errorCode = error.code;
            let loginError = [];

            if (errorCode === 'auth/user-not-found') {
                // El usuario no existe
                loginError.push({
                    input: "Correo",
                    message: "El correo ingresado no tiene una cuenta."
                });
            } else if (errorCode === 'auth/wrong-password') {
                // La contraseña es incorrecta
                loginError.push({
                    input: "Contraseña",
                    message: "La contraseña ingresada es incorrecta."
                });
            } else if (errorCode === 'auth/internal-error') {
                // Credenciales de inicio de sesión inválidas
                loginError.push({
                    input: "Correo y Contraseña",
                    message: "Las credenciales de inicio de sesión son inválidas."
                });
            } else if (errorCode === 'auth/too-many-requests') {
                // Intentos
                loginError.push({
                    input: "Demasiados Intentos",
                    message: "Se ha intentado ingresar muchas veces. La cuenta se bloqueo temporalmente, intentar mas tarde"
                });
            } else {
                console.error(errorCode);
            }

            if (loginError.length > 0) {
                // Construir un mensaje de error que enumere todos los problemas
                let errorMessage = loginError.map(error => `${error.input}: ${error.message}`).join('\n');

                Swal.fire({
                    icon: 'error',
                    title: 'Errores en el Login',
                    text: errorMessage
                });
                errorMessage = [];
            }
        });
}

btnLogIng.addEventListener('click', (e) => {
    e.preventDefault();

    const LoginCorreo = document.getElementById('LoginInputEmail').value,
        LoginPassword = document.getElementById('LoginInputPassword').value;

    //Validacion
    let errors = [];

    if (LoginCorreo.length === 0) {
        errors.push({
            input: "Correo",
            message: "El campo correo no puede estar vacío"
        });
    }

    if (LoginPassword.length === 0) {
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

        errors = [];
    } else {
        login();
    }
});