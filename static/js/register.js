// Registro
const registerForm = () => {

    const RegisterName = document.getElementById('RegisterInputName').value,
        RegisterEmail = document.getElementById('RegisterInputEmail').value,
        RegisterPassword = document.getElementById('RegisterInputPassword').value;

    auth.createUserWithEmailAndPassword(RegisterEmail, RegisterPassword)
        .then(() => {
            let user = auth.currentUser;
            //let database_ref =  database.ref();
            const date = new Date();
            var user_data = {
                email: RegisterEmail,
                nombre: RegisterName,
                last_login: date.toLocaleString(),
            }
            database.ref('users/' + user.uid).set(user_data);
            registerSucessful();
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error
            });
        });
}

// Register FireBase
const database = firebase.database();
const userRegister = document.getElementById("btnUserRegister");

userRegister.addEventListener('click', (e) => {
    e.preventDefault();

    // Declaraciones
    const RegisterName = document.getElementById('RegisterInputName').value,
        RegisterEmail = document.getElementById('RegisterInputEmail').value,
        RegisterPassword = document.getElementById('RegisterInputPassword').value,
        RegisterPasswordRepit = document.getElementById('RegisterInputPasswordRepit').value;


    //Validacion
    let errors = [];

    //Validacion Espacios
    if (RegisterName.length < 8) {
        errors.push({
            input: "Nombre",
            message: "El campo nombre no puede ser menor a 8 caracteres"
        });
    }

    if (RegisterEmail.length === 0) {
        errors.push({
            input: "Correo",
            message: "El campo correo no puede estar vacío"
        });
    }

    if (RegisterPassword.length < 8) {
        errors.push({
            input: "Contraseña",
            message: "El campo contraseña no puede ser menor a 8 caracteres"
        });
    }

    if (!RegisterPassword.match(/[a-z]/) && !RegisterPassword.match(/[A-Z]/)) {
        errors.push({
            input: "Contraseña",
            message: "La contraseña debe tener al menos una letra mayuscula y minuscula"
        });
    }

    if (!RegisterPassword.match(/\d/)) {
        errors.push({
            input: "Contraseña",
            message: "La contraseña debe tener al menos un numero"
        });
    }

    if (!RegisterPassword.match(/[^a-zA-Z\d]/)) {
        errors.push({
            input: "Contraseña",
            message: "La contraseña debe tener al menos un caracter especial"
        });
    }

    if (RegisterPasswordRepit != RegisterPassword) {
        errors.push({
            input: "Contraseña",
            message: "Las contraseñas ingresadas no sin iguales"
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
        registerForm();
    }
});

// Mensaje de registro exitoso
const registerSucessful = () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El usuario se ha registrado correctamente',
        showConfirmButton: true
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            iniciarSesion;
        }
    });
}