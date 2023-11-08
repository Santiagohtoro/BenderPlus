window.addEventListener('load', () => {
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
    let inputStartDate = document.getElementById('inputStartDate');
    let inputFinalDate = document.getElementById('inputFinalDate');

    const inputCheckNum = document.getElementById('inputCheckNum');
    const inputCalendar = document.getElementById('inputCalendar');

    const errors = [];

    // Función para validar los campos
    const validarCampos = () => {
        btnContinuar.addEventListener('click', (e) => {
            e.preventDefault();
            errors.length = 0; // Vaciar el array de errores

            if (!inputCheckNum.checked) {
                validarCampo(inputNumber1, "Número1", "El campo número 1 no puede estar vacío");
                validarCampo(inputNumber2, "Número2", "El campo número 2 no puede estar vacío");
            }

            validarCampo(inputName, "Nombre", "El campo nombre no puede estar vacío");
            validarCampo(inputDeparment, "Departamento", "El campo departamento no puede estar vacío");
            validarCampo(inputCity, "Municipio, capital o localidad", "El campo no puede estar vacío");
            validarCampo(inputNeigh, "Barrio", "El campo barrio no puede estar vacío");
            validarSelect(inputTypeStreet, "Tipo de calle", "Se debe seleccionar una opción en el campo tipo de calle");
            validarCampo(inputStreet, "Calle", "El campo calle no puede estar vacío");
            validarCampo(inputStartDate, "Fecha Inicio", "El campo fecha inicial no puede estar sin selección");
            if (!inputCalendar.checked) {
                validarCampo(inputFinalDate, "Fecha Final", "El campo fecha final no puede estar sin selección");
            }
            validarCampo(inputContactNum, "Teléfono de contacto", "El campo teléfono de contacto no puede estar vacío");

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
                    inputStartDate.value,
                    inputFinalDate.value,
                    inputContactNum.value);
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

    // Función para verificar el checkbox
    const verificarCheck = () => {
        inputCheckNum.addEventListener('change', function () {
            const isCheck = this.checked;
            inputNumber1.disabled = isCheck;
            inputNumber2.disabled = isCheck;
            inputNumber1.style.opacity = isCheck ? 0.7 : 1;
            inputNumber2.style.opacity = isCheck ? 0.7 : 1;
        });

        inputCalendar.addEventListener('change', function () {
            const isCheck = this.checked;
            inputFinalDate.disabled = isCheck;
            inputFinalDate.style.opacity = isCheck ? 0.7 : 1;
        });
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
     * @param {String} fechaInicio 
     * @param {String} fechaFin 
     * @param {int} telefonoContacto 
     */
    const firebaseData = (nombre, departamento, ciudad, barrio, tipoCalle, numeroCalle, numero1, numero2, fechaInicio, fechaFin, telefonoContacto) => {
        const nuevoId = generarClaveUnica();
        //Data de pedido
        let rentData = {
            nombre: nombre,
            departamento: departamento,
            ciudad: ciudad,
            barrio: barrio,
            direccion: {
                tipo_calle: tipoCalle,
                numero: numeroCalle,
                numeral_1: numero1,
                numeral_2: numero2,
            },
            telefonoContacto: telefonoContacto,
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin
        }
        database.ref('alquiler/' + nuevoId).set(rentData);
        rentaRealizada();
    }

    const rentaRealizada = () => {
        Swal.fire({
            icon: 'success',
            title: 'El la renta se ha realizado exitosamente',
            showConfirmButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                location.replace('../index.html');
            }
        })
    }

    // Iniciar las funciones
    validarCampos();
    verificarCheck();
});
