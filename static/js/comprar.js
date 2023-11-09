window.addEventListener('load', () => {

    if(sessionStorage.getItem('user_uid') == null){
        Swal.fire({
            icon: 'error',
            title: 'Ingreso',
            text: 'Debes iniciar sesión para comprar',
            showConfirmButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                location.replace('./loginRegister.html');
            }
        })
    }

    const btnContinuar = document.getElementById('btnContinuar');

    let inputName = document.getElementById('inputName');
    let inputDeparment = document.getElementById('inputDeparment');
    let inputCity = document.getElementById('inputCity');
    let inputNeigh = document.getElementById('inputNeigh');
    let inputTypeStreet = document.getElementById('inputTypeStreet');
    let inputStreet = document.getElementById('inputStreet');
    let inputNumber1 = document.getElementById('inputNumber1');
    let inputNumber2 = document.getElementById('inputNumber2');
    let inputContactNum = document.getElementById('inputContactNum');
    let descriptionText = document.getElementById('descriptionText');

    const inputCheckNum = document.getElementById('inputCheckNum');
    const inputRadioHouse = document.getElementById('inputRadioHouse');
    const inputRadioWork = document.getElementById('inputRadioWork');
    let radioValue = "";

    const errors = [];

    // Función para validar los campos
    const validarCampos = () => {
        btnContinuar.addEventListener('click', (e) => {
            e.preventDefault();
            errors.length = 0; // Vaciar el array de errores

            if (!inputCheckNum.checked) {
                validarCampo(inputNumber1, "Número 1", "El campo número 1 no puede estar vacío");
                validarCampo(inputNumber2, "Número 2", "El campo número 2 no puede estar vacío");
            }

            if (inputRadioHouse.checked) {
                radioValue = "Casa";
            } else if (inputRadioWork.checked) {
                radioValue = "Trabajo";
            }

            validarCampo(inputName, "Nombre", "El campo nombre no puede estar vacío");
            validarCampo(inputDeparment, "Departamento", "El campo departamento no puede estar vacío");
            validarCampo(inputCity, "Municipio, capital o localidad", "El campo no puede estar vacío");
            validarCampo(inputNeigh, "Barrio", "El campo barrio no puede estar vacío");
            validarSelect(inputTypeStreet, "Tipo de calle", "Se debe seleccionar una opción en el campo tipo de calle");
            validarCampo(inputStreet, "Calle", "El campo calle no puede estar vacío");
            validarCampo(inputContactNum, "Teléfono de contacto", "El campo teléfono de contacto no puede estar vacío");
            validarTextArea(descriptionText.value);

            validarTypeAddress();

            if (errors.length > 0) {
                imprimirErrores();
            } else {
                firebaseData(inputName.value,
                    inputDeparment.value,
                    inputCity.value,
                    inputNeigh.value,
                    inputTypeStreet.value,
                    inputStreet.value,
                    inputNumber1.value,
                    inputNumber2.value,
                    radioValue,
                    inputContactNum.value,
                    descriptionText
                );
            }
        });
    };


    // Función para validar campos de texto
    const validarCampo = (input, fieldName, errorMessage) => {
        if (input.value.length === 0) {
            errors.push({
                input: fieldName,
                message: errorMessage
            });
        }
    };

    // Función para validar campos select
    const validarSelect = (select, fieldName, errorMessage) => {
        if (select.value === "null") {
            errors.push({
                input: fieldName,
                message: errorMessage
            });
        }
    };

    const validarTypeAddress = () => {
        if (inputRadioHouse.checked || inputRadioWork.checked) {
            //Good
        } else {
            errors.push({
                input: "Radio Casa o trabajo",
                message: "Se debe seleccionar una de las opciones"
            });
        }
    }

    // Función para verificar el checkbox
    const verificarCheck = () => {
        inputCheckNum.addEventListener('change', function () {
            const isCheck = this.checked;
            inputNumber1.disabled = isCheck;
            inputNumber2.disabled = isCheck;
            inputNumber1.style.opacity = isCheck ? 0.7 : 1;
            inputNumber2.style.opacity = isCheck ? 0.7 : 1;
            inputNumber1.value = 0;
            inputNumber2.value = 0;
        });
    };

    //Funcion validar text area
    const validarTextArea = (textArea) => {
        if (typeof textArea === 'string' && textArea.trim() === '') {
            descriptionText = "";
        }
    };    

    // Función para imprimir errores
    const imprimirErrores = () => {
        if (errors.length > 0) {
            const errorMessage = errors.map(error => `${error.input}: ${error.message}`).join('\n');

            Swal.fire({
                icon: 'error',
                title: 'Errores en el formulario',
                text: errorMessage
            });
        }
        errors.splice(0, errors.length);
    };

    function generarClaveUnica() {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    }

    const database = firebase.database();
    /**
     * 
     * @param {String} nombre 
     * @param {String} departamento 
     * @param {String} ciudad 
     * @param {String} barrio 
     * @param {String} tipoCalle 
     * @param {int} numeroCalle 
     * @param {int} numero1 
     * @param {int} numero2 
     * @param {String} radioValue
     * @param {int} telefonoContacto 
     * @param {String} descriptionText
     */
    const firebaseData = (nombre, departamento, ciudad, barrio, tipoCalle, numeroCalle, numero1, numero2, radioValue, telefonoContacto, descriptionText) => {
        const nuevoId = generarClaveUnica();
        const userId = sessionStorage.getItem('user_uid');
        //Data de pedido
        let deliveryData = {
            id_usuario: userId,
            nombre: nombre,
            departamento: departamento,
            ciudad: ciudad,
            barrio: barrio,
            direccion: {
                tipo_calle: tipoCalle,
                numero: numeroCalle,
                numeral_1: numero1,
                numeral_2: numero2,
                vivienda_trabajo: radioValue
            },
            telefonoContacto: telefonoContacto,
            descripcion: descriptionText
        }
        database.ref('pedidos/' + nuevoId).set(deliveryData);
        pedidoRealizado();
    }

    const pedidoRealizado = () => {
        Swal.fire({
            icon: 'success',
            title: 'El pedido se ha realizado exitosamente',
            showConfirmButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                location.replace('../index.html');
            }
        })
    }

    const mostrarUsuario = () => {
        const userData = firebase.database().ref("users/" + sessionStorage.getItem("user_uid"));
        const userName = firebase.database().ref("users/" + sessionStorage.getItem("user_uid") + "/nombre");
        userData.on("value", function (snapshot) {
            const dataInfo = snapshot.val();
            sessionStorage.setItem("user", JSON.stringify(dataInfo));
        });

        userName.on("value", function (snapshot) {
            document.getElementById("userName").innerText = snapshot.val();
        });
    }

    // Iniciar las funciones
    validarCampos();
    verificarCheck();
    validarTextArea();
    mostrarUsuario();
});
